import React from "react";
import "./model.css";

function Modal({ toggleModel }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">

        <button onClick={() => { toggleModel(false); }} class="btn-close">✖</button>

        <div className="card-header">
            {/* header content  */}
            <div className="chatList__search">
                <div className="search_wrap">
                    <input type="text" placeholder="Search Here" required />
                    <button className="search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>

        <div className="card-body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div>

        <div className="card-footer">
            {/* <button onClick={() => { toggleModel(false); }} id="cancelBtn" >
                Cancel
            </button>
            
            <button>Continue</button> */}
        </div>

      </div>
    </div>
  );
}

export default Modal;