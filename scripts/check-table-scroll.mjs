// Run: node scripts/check-table-scroll.mjs
// Requires headless Chrome with --remote-debugging-port=9237.
// Runs the real table with local fixture data; no backend or credentials needed.
import assert from 'node:assert/strict'
import { createServer } from 'vite'

const fixture = `
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import MyTable from '/src/components/tables/MyTable'
import '/src/index.css'
const columns = Array.from({length: 8}, (_, i) => ({
  accessorKey: 'name', id: String(i), header: 'Nombre', enableSorting: false,
}))
function Fixture() {
  const [data, setData] = useState(Array.from({length: 20}, (_, id) => ({id, name: 'Modelo de prueba'})))
  const [loading, setLoading] = useState(false)
  window.loadedRows = data.length
  return <div style={{height: '100vh', padding: 40, paddingLeft: 280}}>
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div style={{height: 140 + Number(new URLSearchParams(location.search).get('fraction')), flexShrink: 0}}>Modelos y filtros</div>
      <div className="relative flex-grow">
        <div className="absolute w-full h-full bg-white">
          <MyTable columns={columns} data={data} loading={loading} infiniteScroll={data.length < 60}
            onInfiniteScroll={() => {
              setLoading(true)
              setTimeout(() => {
                setData(previous => [...previous, ...Array.from({length: 20}, (_, i) => ({id: previous.length + i, name: 'Modelo de prueba'}))])
                setLoading(false)
              }, 40)
            }}/>
        </div>
      </div>
    </div>
  </div>
}
createRoot(document.getElementById('root')).render(<Fixture/>);
`

const server = await createServer({ server: { host: '127.0.0.1', port: 5199 }, plugins: [{
  name: 'scroll-regression-fixture',
  resolveId(id) { if (id === '/__scroll.tsx') return id },
  load(id) { if (id === '/__scroll.tsx') return fixture },
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url.split('?')[0] === '/__scroll') {
        res.setHeader('Content-Type', 'text/html')
        res.end(await server.transformIndexHtml('/__scroll', '<div id="root"></div><script type="module" src="/__scroll.tsx"></script>'))
      } else next()
    })
  },
}] })
let socket
try {
  await server.listen()
  const target = await fetch('http://127.0.0.1:9237/json/new?about:blank', { method: 'PUT' }).then(r => r.json())
  socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise(resolve => socket.addEventListener('open', resolve, {once: true}))
  let id = 0
  const pending = new Map()
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data)
    if (message.id) {
      const {resolve, reject} = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) reject(new Error(message.error.message))
      else resolve(message.result)
    }
  })
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, {resolve, reject})
    socket.send(JSON.stringify({id, method, params}))
  })
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true})
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
    return result.result.value
  }
  const scenarios = [[1280, 600], [1366, 768], [1600, 960]]
    .flatMap(([width, height]) => [0.5, 0, 0.25, 0.75].map(fraction => ({width, height, fraction})))
  for (const {width, height, fraction} of scenarios) {
    await send('Emulation.setDeviceMetricsOverride', {width, height, deviceScaleFactor: 1, mobile: false})
    await send('Page.navigate', {url: `http://127.0.0.1:5199/__scroll?fraction=${fraction}`})
    for (let attempt = 0; attempt < 100; attempt++) {
      if (await evaluate('window.loadedRows >= 20')) break
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    assert.ok(await evaluate('window.loadedRows >= 20'), 'Fixture did not mount')
    for (const expected of [40, 60]) {
      await evaluate(`(async () => {
        const container = document.querySelector('table').parentElement;
        container.scrollLeft = container.scrollWidth;
        for (let i = 0; i < 20 && window.loadedRows < ${expected}; i++) {
          container.scrollTop = container.scrollHeight;
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      })()`)
      const geometry = await evaluate(`(() => {
        const container = document.querySelector('table').parentElement;
        return {rows: window.loadedRows, scrollLeft: container.scrollLeft, scrollWidth: container.scrollWidth, clientWidth: container.clientWidth, scrollTop: container.scrollTop, scrollHeight: container.scrollHeight, clientHeight: container.clientHeight};
      })()`)
      console.log(`${width}x${height}, fraction=${fraction}: ${JSON.stringify(geometry)}`)
      assert.ok(geometry.rows >= expected, `Infinite scroll stalled: expected ${expected} rows`)
    }
  }
} finally {
  socket?.close()
  await server.close()
}
