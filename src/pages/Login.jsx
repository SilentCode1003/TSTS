function Login() {
  return (
    <div>
      <form>
        <div>
          <h1>User Login</h1>
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input type="username" id="username" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <div>
          <button type="button">Submit</button>
          <button type="button">Reset</button>
        </div>
      </form>
    </div>
  )
}

export default Login
