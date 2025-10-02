import clsx from 'clsx'
import * as Yup from 'yup'
import {Form, Formik} from 'formik'
import {useMutation} from '@apollo/client'
import {FaLock, FaUser} from 'react-icons/fa'
import {useAuth} from '@auth/hooks'
import Alert from '@/components/Alert'
import {Button} from '@components'
import FormField from '@/components/forms/FormField'
import TokenAuthMutation from "@auth/mutations/tokenAuthMutation";
import {useNavigate, useSearchParams} from "react-router-dom";

interface Values {
  email: string
  password: string
}

const LoginForm = () => {
  const {login} = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [tokenAuth, {loading, error}] = useMutation(TokenAuthMutation, {
      onCompleted: data => {
        const from = searchParams.get('from')
        const authToken = data?.tokenAuth?.token
        if (authToken) {
          login(authToken)
          navigate(from ? from : '/')
        }
      },
    }
  )

  const initialValues: Values = {
    email: import.meta.env.VITE_EMAIL ?? '',
    password: import.meta.env.VITE_PASSWORD ?? '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Campo requerido!').matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Correo electrónico inválido',
    ),
    password: Yup.string().required('Campo requerido!'),
  })

  const onSubmit = async (values: Values) => {
    await tokenAuth({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className="relative w-full bg-white rounded-xl p-8 pt-12 flex flex-col items-center gap-4 shadow-lg">
        <div
          className={clsx([
            'w-full grid transition-[grid-template-rows] duration-300 ease-in-out',
            error?.message ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          ])}>
          <div className="overflow-hidden">
            <Alert className="w-full">
              Valida tus credenciales
            </Alert>
          </div>
        </div>

        <FormField
          icon={FaUser}
          name="email"
          label="Usuario"
          className="w-full"
          placeholder="user@gmail.com"/>
        <FormField
          icon={FaLock}
          name="password"
          label="Contraseña"
          type="password"
          className="w-full"
          placeholder="------"/>

        <Button className="w-full" type="submit" isLoading={loading}>
          Ingresar
        </Button>

        <div className='absolute bottom-full translate-y-1/2'>
          <img src="/public/logos/logo.svg" alt="logo" className="w-48"/>
        </div>
      </Form>
    </Formik>
  )
}

export default LoginForm