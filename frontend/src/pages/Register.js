import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from '../apis/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
    // regular expressions for validation
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    // NAME variable and validation
    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    // Email variable and validation
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    // Password variable and validation
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    // confirm Password variable and validation
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)
    // error handeling
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === confirmPassword)
    }, [password, confirmPassword])

    // remove error message
    useEffect(() => {
        setErrorMessage('')
    }, [email, password, name, confirmPassword])


    const signupURL = '/register'
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('sign up clicked');
        const isValidName = USER_REGEX.test(name)
        const isValidEmail = EMAIL_REGEX.test(email)
        const isValidPassword = PWD_REGEX.test(password)
        if (!isValidName || !isValidEmail || !isValidPassword) {
            console.log('invalid entry');
            setErrorMessage('Invalid Entry')
            return
        }
        try {
            const response = await axios.post(signupURL,
                JSON.stringify({ name, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setSuccess(true);
            console.log(success);
            //clear state and controlled inputs
            setName('')
            setPassword('')
            setEmail('')
            setConfirmPassword('')
            setErrorMessage('Account Created Successfully')
            console.log('sign up completed');
        }
        catch (err) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 409) {
                setErrorMessage('Username Taken');
            } else if (err.response?.status === 401) {
                setErrorMessage('User already exists')
            }
            else {
                setErrorMessage('Registration Failed')
            }
            // errRef.current.focus(); 
        }
    }

    return (
        <main className="authentication">
            <section className="heading">
                <h2>Create a new account</h2>
                <p>You can simply fill this form and sign up for free</p>
            </section>
            <section className={errorMessage === '' ? 'offscreen' : 'notification'}>
                <p>
                    {errorMessage}
                </p>
            </section>
            <section className="input-form">
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="name">User Name</label>
                        <FontAwesomeIcon icon={faCheck} className={validName ? 'fa-2x' : 'offscreen'} style={{color: "#00ff59", position: 'absolute', left:'80%'}} />
                        <input
                            type="text"
                            id='name'
                            required
                            autoCorrect='off'
                            placeholder='e.g. John'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby='usrNameNote'
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />
                        <div id='usernameNote' className={nameFocus && !validName ? 'instructions' : 'offscreen'}>
                            <b>Default Name Requirements</b> <br />
                            <ul>
                                <li>Must be atleast 4 characters long</li>
                                <li>Must contain atleast 1 capital case letter</li>
                                <li>Must contain atleast 1 lower case letter.</li>
                                <li>May include special characters.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? 'fa-2x' : 'offscreen'} style={{color: "#00ff59", position: 'absolute', left:'80%'}} />
                        <input
                            type="email"
                            id='email'
                            required
                            placeholder='example@domain.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            aria-invalid={validEmail ? 'false' : 'true'}
                            aria-describedby='emailNote'
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)} />
                        <p id='emailNote' className={emailFocus && !validEmail ? 'instructions' : 'offscreen'}>
                            <b>example@gmail.com</b> <br />
                        </p>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <FontAwesomeIcon icon={faCheck} className={validPassword ? 'fa-2x' : 'offscreen'} style={{color: "#00ff59", position: 'absolute', left:'80%'}} />
                        <input
                            type="password"
                            id='password'
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            aria-invalid={validPassword ? 'false' : 'true'}
                            aria-describedby='pwdNote'
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)} />
                        <div id='pwdNote' className={passwordFocus && !validPassword && password ? 'instructions' : 'offscreen'}>
                            <b>Default Password Requirements</b> <br />
                            <ul>
                                <li>Must be atleast 8 characters long.</li>
                                <li>Must include atleast 1 English uppercase letter (A-Z)</li>
                                <li>Must include atleast 1 English lowercase letter (a-z)</li>
                                <li>Must include atleast 1 numeric character (0-9)</li>
                            </ul>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <FontAwesomeIcon icon={faCheck} className={validMatch && password !== '' ? 'fa-2x' : 'offscreen'} style={{color: "#00ff59", position: 'absolute', left:'80%'}} />
                        <input
                            type="password"
                            id='confirm-password'
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby='matchNote'
                            onFocus={() => setConfirmPasswordFocus(true)}
                            onBlur={() => setConfirmPasswordFocus(false)} />
                    </div>
                    <div className="form-action input-wrapper">
                        <button className="btn" type='submit' onClick={handleSignup}>Sign Up</button>
                    </div>
                </form>
            </section>
            <section className="form-alternate-action">
                <p>Already have an account? <Link to="/login">LogIn</Link></p>
            </section>
        </main>
    )
}

export default Register