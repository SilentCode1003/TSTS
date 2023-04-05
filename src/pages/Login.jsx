import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { isAdminStore, isLoggedInStore } from '../store/authStore'

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInStore)
  const [isAdmin, setIsAdmin] = useAtom(isAdminStore)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)

    if (data.username === 'admin' && data.password === 'admin') {
      setIsLoggedIn(true)
      setIsAdmin(true)
      navigate('/')
    } else if (data.username === 'client' && data.password === 'client') {
      setIsLoggedIn(true)
      setIsAdmin(false)
      navigate('/client')
    } else {
      setError('username', {
        type: 'custom',
        message: 'Invalid username or password',
      })
      setError('password', {
        type: 'custom',
        message: 'Invalid username or password',
      })
    }
  }

  return (
    <div className="min-h-screen p-1 md:p-8 flex items-center justify-center bg-red-400">
      <div className="max-w-4xl w-9/12 min-h-[400px] rounded-md shadow-md bg-white flex flex-col md:flex-row overflow-hidden">
        <div className="image min-h-[250px] flex-1 bg-[url('https://images.pexels.com/photos/4270292/pexels-photo-4270292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover"></div>
        <div className="form flex-1 md:flex items-center justify-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 flex flex-col justify-center gap-8"
          >
            <div>
              <h1 className="font-bold text-red-500 text-3xl text-center">
                User Login
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="username"
                  id="username"
                  placeholder="Username"
                  className={`py-2 px-4 w-full border bg-gray-100 rounded-sm text-gray-900 ${
                    errors.username && 'border-red-500'
                  }`}
                  {...register('username', { required: true })}
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className={`py-2 px-4 w-full border bg-gray-100 rounded-sm text-gray-900 ${
                    errors.password && 'border-red-500'
                  }`}
                  {...register('password', { required: true })}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 relative">
              <button
                type="submit"
                className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => reset({ username: '', password: '' })}
                className="py-2 px-4 border border-red-500 font-bold rounded"
              >
                Reset
              </button>
              {errors.username && (
                <p className="text-sm text-red-500 absolute bottom-12">
                  Invalid Credentials
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
