import './App.css';
import { useState } from 'react';

export default function App() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === 'username') setUsername(value);
        else if (id === 'password') setPassword(value);
    };

    const handleLogin = () => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        .then(res => res.json())
        .then(data => {
            setMessage(data.message);
            console.log(data.message);
            if(data.message === 'success')
              console.log('nextpage');
        })
        .catch(error => console.error('Error:', error));
    };

    function handleSignUp()  {
      fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, role }),
      })
      .then(res => res.json())
      .then(data => {
          setMessage(data.message);
          if(data.message === 'success'){
            console.log('login to continue')
            setIsLogin(true);
            setIsSignUp(false);
          }
      })
      .catch(error => console.error('Error:', error));
    };

    return (
        <div className="App" style={{ padding: "100px" }}>
            <table>
                <tbody>
                    {(isSignUp || isLogin) && (
                        <>
                            <tr>
                                <td>Username</td>
                                <td><input type="text" id="username" onChange={handleInputChange} /></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td><input type="password" id="password" onChange={handleInputChange} /></td>
                            </tr>
                            {isSignUp && !isLogin && (
                                <tr>
                                    <td colSpan={2}>
                                        <div>
                                            Please select your role:
                                            <label>
                                                <input type="radio" name="role" value="teacher" onChange={() => setRole("teacher")} />
                                                Teacher
                                            </label>
                                            <label>
                                                <input type="radio" name="role" value="student" onChange={() => setRole("student")} />
                                                Student
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    )}
                    <tr>
                        <td colSpan={2}>
                            {isSignUp && !isLogin && (
                                <button onClick={handleSignUp}>Sign Up</button>
                            )}
                            {isLogin && !isSignUp && (
                                <button onClick={handleLogin}>Login</button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {!isSignUp && !isLogin && (
                                <button onClick={()=>{setIsSignUp(true);}}>Sign Up</button>
                            )}
                            {!isSignUp && !isLogin && (
                                <button onClick={()=>{setIsLogin(true);}}>Login</button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            <p>{message}</p>
        </div>
    );
}
