import React from "react";
import "./App.css";
import { Route, Routes} from "react-router-dom";
// defiened components
import Auth from "./pages/Auth";
import ChatBody from "./pages/chatPage";

function App() {
  return (
      <div className="__main">
    
        <Routes>
          <Route path="/" element={ 
            <Auth />
          } />
          <Route path="/chat" element={ <ChatBody /> } />
        </Routes>
  
      </div>
  );
}

export default App;
