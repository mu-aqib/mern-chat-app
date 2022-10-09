import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
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

      let {data} = await axios.post('api/user/login', {
        email,
        password
      } , config)

      if(data){
        alert();
        navigate('/chat')
      }
    }
    catch(err){
      console.log(err)
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
      </div>
    </div>
  )
}

export default Login

