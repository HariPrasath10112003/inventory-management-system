import React, { useState } from "react";
// import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App()  
 {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {/* {isLoggedIn ? ( */}
        <Dashboard />
      {/* ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )} */}
    </div>
  );
}

export default App;