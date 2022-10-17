import React from "react";
import "./model.css";

function Modal({ toggleModel }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">

          <button onClick={() => {
                toggleModel(false);
            }} class="close">✖</button>

        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>

        <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div>

        <div className="footer">
          <button
            onClick={() => {
                toggleModel(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
        
      </div>
    </div>
  );
}

export default Modal;