import React from "react";
import "./App.css";
// import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
// defiened components
import ChatBody from "./components/chatBody/ChatBody";
import Authentication from "./components/Authentication/Auth";

function App() {
  return (
      <div className="__main">
        <Router>
          <Routes>
              <Route path="/" element={ 
                <Authentication />
              } />
              <Route path="/chat" element={ <ChatBody /> } />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
