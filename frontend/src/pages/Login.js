import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from '../apis/axios'

const Login = () => {
  // user inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // error OR success
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)

  // remove error message
  useEffect(() => {
    setErrorMessage('')
  }, [email, password])
  

  const loginURL = '/auth'
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        loginURL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          Authorization: `Bearer `
        }
      )
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken;
      const todos = response?.data?.todos;
      const name = response?.data?.name;
      setEmail('');
      setPassword('');
      setSuccess(true)
      // console.log(success);
      console.log(accessToken, todos, name);
      window.localStorage.setItem('loggedIn', true)
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('todos', todos)
      window.localStorage.setItem('email', email)
    }
    catch (err) {
      if (!err?.response) {
        setErrorMessage('No Server Response');
      } else if (err.response?.status === 400) {
        setErrorMessage('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrorMessage('Unauthorized');
      } else {
        setErrorMessage('Login Failed');
      }
    }
  }

  return (
    <>
      {
        success ? (
          <Navigate to='/'/>
        ) : (
          <main className="authentication">
            <section className="heading">
              <h2>Login to account</h2>
              <p>Enter your email and password to login</p>
            </section>
            <section className={errorMessage === '' ? 'offscreen' : 'notification'}>
              <p>
                {errorMessage}
              </p>
            </section>
            <section className="input-form">
              <form>
                <div className="input-wrapper">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id='email'
                    required
                    placeholder='example@domain.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id='password'
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-action input-wrapper">
                  <button className="btn" type='submit' onClick={handleLogin}>Login</button>
                </div>
              </form>
            </section>
            <section className="form-alternate-action">
              <p>Need a new account? <Link to="/signup">Sign Up</Link></p>
            </section>
          </main>
        )}
    </>
  )
}

export default Login