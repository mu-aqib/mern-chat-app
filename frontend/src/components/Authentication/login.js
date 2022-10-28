import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login({setLoginError}) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const navigate = useNavigate();
  const submitHandler = async (e)=> {
    e.preventDefault();
    if(!email || !password) {
      alert('please fill all required (*) field'); 
      return
    }

    try{
      const config = {
          header: {"Content-type": "application/json",}
      }

      let data = await axios.post('api/user/login', {
        email,
        password
      } , config)

      if(data){
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/chat')
      }
      else{
        setLoginError("please Login First")
      }
      console.log(data.response.data)
    }
    catch({response: {data : {message}}}){
      setLoginError(message)
      // alert(message)
    }
  }

  return (
    <div>
      <div className='form-box'>
        <h2>login</h2>
        <form onSubmit={(e) => submitHandler(e)}>
          <input name='email' type="email" placeholder="email *" onChange={(e) => setEmail(e.target.value)}/>
        
          <input name='password' type="password" placeholder="password *" onChange={(e) => setPass(e.target.value)}/>

          <button type='submit' className="btn btn-info"> <span>login</span> </button>
        </form>
        {/* 03409075113 */}
      </div>
    </div>
  )
}

export default Login

