import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  let navigate = useNavigate();

  const onChangeValue = (e)=> {
    this.setState( {
      [e.target.name] : e.target.value
    })
  }

  const submitHandler = async (e)=> {
    e.preventDefault();
    alert();
    const state = this.state;
    if(!state.email || !state.password) {
        alert('please fill all required (*) field'); 
        return
    }

    try{
        const config = {
            header: {"Content-type": "application/json",}
        }

        let {data} = await axios.post('api/user/login', {
                email: state.email,
                password: state.password
        } , config)

        if(data){
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
          <input name='email' type="email" placeholder="email *" onChange={(e) => onChangeValue(e)}/>
        
          <input name='password' type="password" placeholder="password *" onChange={(e) => onChangeValue(e)}/>

          <button type='submit' className="btn btn-info"> <span>login</span> </button>
        </form>
      </div>
    </div>
  )
}

export default Login

