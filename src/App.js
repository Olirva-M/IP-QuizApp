import './App.css';
import { useState } from 'react';
import TeacherView from './View/TeacherView';
import StudentView from './View/StudentView';

export default function App() {
    const [Students, setStudents] = useState([]);
    const [qbank, setQbank] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const [isStud, setIsStud] = useState(false);



    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === 'username') setUsername(value);
        else if (id === 'password') setPassword(value);
    };

    const updateScore = (score) =>
    {
        fetch('http://localhost:5000/updatescore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, username })
        })
        .then(res => res.json())
        .then(data => {                        
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
        console.log('cooool');
    };

    const handleLogin = () => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        .then(res => res.json())
        .then(data => {
            setIsLogin(false);
            setIsSignUp(false);
            
            if(data.message === 'teacher') //Teacher
            {
                console.log('test', data.message);
                setIsTeacher(true);

                fetch('http://localhost:5000/getstud', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(data => {                        
                    setStudents(data);
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
            
                // <TeacherView Students={ Students }/>
            }
            else if (data.message ==='student') //Student
            {
                setIsStud(true);
                fetch('http://localhost:5000/question', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(data => {                        
                    console.log('qbank', data);
                    setQbank(data);
                })
                .catch(error => console.error('Error:', error));
            }
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
          if(data.message === 'success'){
            console.log('login to continue')
            setIsLogin(true);
            setIsSignUp(false);
          }
      })
      .catch(error => console.error('Error:', error));
    };

    return (
        <center>
<div className="App" style={{ padding: "100px", color:'white',backgroundImage: "url(https://t4.ftcdn.net/jpg/04/39/13/37/360_F_439133763_FrLdhZsd5aGC23r9ATARuKJBr8ifZjIe.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" ,height: "100vh" }}>
        <center>
            <h3 style = {{fontFamily:'cursive',fontSize:'60px', color:'white'}}>OH! Quiz challenge</h3>
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
                            {!isSignUp && !isLogin && !isTeacher && !isStud && (
                                <button style = {{fontSize:'30px'}} onClick={()=>{setIsSignUp(true);}}>Sign Up</button>
                            )}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {!isSignUp && !isLogin && !isTeacher && !isStud && (
                                <button style = {{fontSize:'30px'}} onClick={()=>{setIsLogin(true);}}>Login</button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            {isTeacher && <TeacherView Students={Students} />}
            {isStud && <StudentView qbank={qbank} updateScore={updateScore}/>}
            </center>
        </div>
        </center>
    );
}
