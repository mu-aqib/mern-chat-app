import React, { Component } from 'react'
import axios from 'axios';

export default class register extends Component {
    constructor(props){
        super(props)
        this.state = {
            username : '',
            email : '',
            password : '',
            confirm_password : '',
            user_profile: undefined,
        }
    }

    // update given different states
    onChangeValue = (e)=> {
        this.setState( {
            [e.target.name] : e.target.value
        } )
    }

    // file upload
    fileUpload = (e)=>{
        const file = e.target.files[0]
        if(file){
            if(file.type === "image/jpeg" || file.type === "image/png"){
                const data = new FormData();
                data.append('file', file);
                data.append('upload_preset', 'chat-app')
                data.append('cloudinary_name', 'cloudymedia313');
                fetch(`https://api.cloudinary.com/v1_1/cloudymedia313/image/upload`, {
                    method: 'post',
                    body: data,
                })
                .then(res => res.json() )
                .then(data => {
                    this.setState({ user_profile : data.url })
                } )
                .catch(err => console.log(err))
            }
        }
        else{
            alert('file not defined')
        }
    }

    submitHandler = async (e)=> {
        e.preventDefault();
        const state = this.state;
        if(!state.username||!state.email||!state.password||!state.confirm_password) {
            alert('please fill all required (*) field'); 
            return
        }
        if(state.password != state.confirm_password) {
            alert("passwords not matched");
            return;
        }

        try{
            const config = {
                header: {"Content-type": "application/json",}
            }

            let {data} = await axios.post('api/user', {
                    name: state.username,
                    email: state.email,
                    password: state.password,
                    picture: state.user_profile
            } , config)

            if(data){
                alert(data.message)
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
                    <h2>Register</h2>
                    <form onSubmit={this.submitHandler}>
                        <input name='username' type="text" placeholder="username *" onChange={this.onChangeValue}/>

                        <input name='email' type="email" placeholder="email *" onChange={this.onChangeValue}/>
            
                        <input name='password' type="password" placeholder="password *" onChange={this.onChangeValue}/>

                        <input name='confirm_password' type="password" placeholder="confirm password *" onChange={this.onChangeValue}/>

                        <input type="file" className='file-btn' onChange={this.fileUpload} />

                        <button type='submit' className="btn btn-info"> <span>login</span> </button>
                    </form>
                </div>
            </>
        )
    }
}


{/* <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="800px" height="600px" viewBox="0 0 800 600" enable-background="new 0 0 800 600" xml:space="preserve">
                <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="174.7899" y1="186.34" x2="330.1259" y2="186.34" gradientTransform="matrix(0.8538 0.5206 -0.5206 0.8538 147.9521 -79.1468)">
                    <stop offset="0" style="stop-color:#FFC035" />
                    <stop offset="0.221" style="stop-color:#F9A639" />
                    <stop offset="1" style="stop-color:#E64F48" />
                </linearGradient>
                <circle fill="url(#SVGID_1_)" cx="266.498" cy="211.378" r="77.668" />
                <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="290.551" y1="282.9592" x2="485.449" y2="282.9592">
                    <stop offset="0" style="stop-color:#FFA33A" />
                    <stop offset="0.0992" style="stop-color:#E4A544" />
                    <stop offset="0.9624" style="stop-color:#00B59C" />
                </linearGradient>
                <circle fill="url(#SVGID_2_)" cx="388" cy="282.959" r="97.449" />
                <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="180.3469" y1="362.2723" x2="249.7487" y2="362.2723">
                    <stop offset="0" style="stop-color:#12B3D6" />
                    <stop offset="1" style="stop-color:#7853A8" />
                </linearGradient>
                <circle fill="url(#SVGID_3_)" cx="215.048" cy="362.272" r="34.701" />
                <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="367.3469" y1="375.3673" x2="596.9388" y2="375.3673">
                    <stop offset="0" style="stop-color:#12B3D6" />
                    <stop offset="1" style="stop-color:#7853A8" />
                </linearGradient>
                <circle fill="url(#SVGID_4_)" cx="482.143" cy="375.367" r="114.796" />
                <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="365.4405" y1="172.8044" x2="492.4478" y2="172.8044" gradientTransform="matrix(0.8954 0.4453 -0.4453 0.8954 127.9825 -160.7537)">
                    <stop offset="0" style="stop-color:#FFA33A" />
                    <stop offset="1" style="stop-color:#DF3D8E" />
                </linearGradient>
                <circle fill="url(#SVGID_5_)" cx="435.095" cy="184.986" r="63.504" />
</svg> */}
