import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Login } from "./components/organisms/Login";

function App() {

       const [userLoggedIn, setUserLoggedIn] = useState(false)

       useEffect(() => {
              axios.get('http://localhost:3001/user', {
                     headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                     }
              }).then(response => {
                     setUserLoggedIn(response.data.loggedIn)
              }).catch(error => {
                     setUserLoggedIn(false)
              })
       }, [])

       useEffect(() => {
              const token = localStorage.getItem('token')
              if (token) {
                     setUserLoggedIn(true)
              }
       }, [])

       return (
              <div className="App">
                     <header className="App-header">
                            <h1>Rojo</h1>
                            {userLoggedIn ? 'Logged in' : <Login />}

                     </header>
              </div>
       );
}

export default App
