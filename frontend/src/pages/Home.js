import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import axios from '../apis/axios'

const Home = () => {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  // error OR success
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const isloggedIn = localStorage.getItem('loggedIn')
  const name = window.localStorage.getItem('name')
  const todos = window.localStorage.getItem('todos')
  const email = window.localStorage.getItem('email')
  const userDataURL = '/userdata'
  useEffect(() => {
    if (!isloggedIn) {
      return navigate('/login')
    }
    todos.split(',').map((task) => {
      console.log(task);
      setTasks((prevTasks) => [...prevTasks, task])
    })
  }, [])

  useEffect(() => {
    setErrorMessage('')
  }, [task])

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, task])
      setTask('')
    }
  }

  const deleteTask = (index) => {
    const updateTasks = [...tasks]
    updateTasks.splice(index, 1)
    setTasks(updateTasks)
  }

  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks]
    updatedTasks[index] = updatedTask
    setTasks(updatedTasks)
  }

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(tasks);
    try {
      const response = await axios.post(userDataURL,
        JSON.stringify({ name, email, tasks }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          Authorization: `Bearer `
        }
      );
      console.log(JSON.stringify(response?.data));
      setErrorMessage('Saved Successfully')
      console.log('saved successfully');
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

  const handleLogout = async () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.localStorage.clear()
    navigate('/login');
  }

  const handleKey = (e) =>{
    if (e.key === 'Enter'){
      addTask()
    }
  }

  return (
    <>
      <main className='home'>
        <section className="userInfo">
          <h2>{name}</h2>
        </section>
        <section className="add-to-do">
          <input type="text" placeholder='Add a new task ' onKeyDown={handleKey} value={task} onChange={e => setTask(e.target.value)} />
          <button className="btn" onClick={addTask}>Add Task</button>
        </section>
        <section className={errorMessage === '' ? 'offscreen' : 'notification'}>
          {errorMessage}
        </section>
        <section className="show-to-do">
          <ul>
            {
              tasks.reverse().map((singleTask, index) => {
                return (
                  <li key={index}>
                    <p className='todo-contnet'>
                      {singleTask}
                    </p>
                    <span className='actions'>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#08680f", fontSize: '2rem', cursor: 'pointer' }}
                        onClick={() => editTask(index, prompt('Enter updated task', task))}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#ff0000", fontSize: '2rem', cursor: 'pointer' }}
                        onClick={() => deleteTask(index)}
                      />
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </section>
        <section className='actions'>
          <button className="btn" onClick={handleSave}>Save All</button>
          <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
        </section>
      </main>
    </>
  )
}

export default Home