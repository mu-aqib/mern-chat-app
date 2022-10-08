import React, { Component } from 'react';
import axios from 'axios';

export default class login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email : '',
      password : ''
    }
  }
      // update given different states
    onChangeValue = (e)=> {
      this.setState( {
        [e.target.name] : e.target.value
      })
    }


  submitHandler = async (e)=> {
    e.preventDefault();
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
            alert(data.message)
            console.log(data)
        }
    }
    catch(err){
        console.log(err)
    }
  }
  render() {
    return (
        <>
          <div className='form-box'>
              <h2>login</h2>
              <form onSubmit={this.submitHandler}>
                <input name='email' type="email" placeholder="email *" onChange={this.onChangeValue}/>
              
                <input name='password' type="password" placeholder="password *" onChange={this.onChangeValue}/>

                <button type='submit' className="btn btn-info"> <span>login</span> </button>
              </form>
          </div>
        </>
    )
  }
}
