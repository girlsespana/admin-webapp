import {BsDatabaseFillX} from "react-icons/bs";

const NoTableData = () => {
  return (
    <div className="w-full  flex flex-col items-center p-8">
                  <span
                    className="mt-4 text-9xl p-6 rounded-full text-white bg-premium-green-300 dark:bg-premium-green-600"
                  >
                    <BsDatabaseFillX className="text-gray-300"/>
                  </span>
      <h3 className="mt-8 font-bold text-xl text-premium-green-700 dark:text-premium-green-100">
        Ups!, parace que aun no tienes datos
      </h3>
      <p className="mt-2 text-sm text-premium-green-700 dark:text-premium-green-100">
        Empieza a agregar datos y podras ver tu información
      </p>
    </div>
  )
}

export default NoTableData