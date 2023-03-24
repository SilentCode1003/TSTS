import { useState } from 'react'

function Login() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setInput((prev) => ({ ...prev, [name]: value.trim() }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.username) {
      console.log('please input username')
    }
    if (!input.password) {
      console.log('please input password')
    }

    if (!input.username || !input.password) {
      return
    }

    console.log('Logging in...')
  }

  const handleReset = (e) => {
    setInput({
      username: '',
      password: '',
    })
  }

  return (
    <div className="min-h-screen p-1 md:p-8 flex items-center justify-center bg-gray-300">
      <div className="max-w-4xl w-9/12 min-h-[400px] rounded-md shadow-md bg-white flex flex-col md:flex-row overflow-hidden">
        <div className="image min-h-[250px] flex-1 bg-[url('https://images.pexels.com/photos/4270292/pexels-photo-4270292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover"></div>
        <div className="form flex-1 md:flex items-center justify-center ">
          <form
            onSubmit={handleSubmit}
            className="p-8 flex flex-col justify-center gap-8"
          >
            <div>
              <h1 className="font-bold text-3xl text-center">User Login</h1>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="username"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="py-2 px-4 w-full border bg-gray-100 rounded-sm bg-gray-50 text-gray-900"
                  value={input.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="py-2 px-4 w-full border bg-gray-100 rounded-sm bg-gray-50"
                  value={input.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-2 px-4 bg-rose-500 hover:bg-rose-700 text-white font-bold rounded"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
