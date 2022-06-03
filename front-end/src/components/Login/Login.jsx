import React,{ useEffect, useState} from 'react'
import './login.css'
import { AiOutlineMail } from 'react-icons/ai'
import { BsKey } from 'react-icons/bs'
import { useNavigate  } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email);
    console.log(password);
    console.log(users);
    const currentUser = users.find(user => user.email === email && user.password === password);
      if(currentUser){
      window.localStorage.setItem('user', JSON.stringify(currentUser));
      window.localStorage.setItem('role', JSON.stringify(currentUser.isManager));
      setError('')
      if (currentUser.isManager === true) {
      navigate('/home');
      } else {
      navigate('/items');
      }
    } else {
      setError('Email or password is incorrect')
    }
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then(res => {
      setUsers(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [users])

  return (
    <div className='login-container'>
      <div className='login-content'>
        <div className="login-box">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <p className='error'>{ error }</p>
                <div className="form-group">
                  <div className='form-label'>
                    <label> <AiOutlineMail className='logo-login' /> Email address :</label>
                    <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                  </div>
                  <div className='form-label'>
                    <label> <BsKey className='logo-login' /> Password :</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  </div>
            </div>
            <div className='form-footer'>
            <button type="submit" className="btn btn-primary">Login</button>
            </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login