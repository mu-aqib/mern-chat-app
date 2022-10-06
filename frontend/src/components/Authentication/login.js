import React, { Component } from 'react'

export default class login extends Component {
  render() {
    return (
        <>
          <div class='form-box'>
              <h2>login</h2>
              <form>
                  <input type="email" class="email" placeholder="email" />
      
                  <input type="password" class="pwd" placeholder="password" />

                  <button type='submit' class="btn btn-info"> <span>login</span> </button>
              </form>
          </div>
        </>
    )
  }
}
