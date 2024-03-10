import React, { useState } from 'react';
import "./Login.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import 'icofont/dist/icofont.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { doc, getDoc } from 'firebase/firestore'

export default function Login({db}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    // Handles the login functionality of the user
    async function handleLogin (e){
        e.preventDefault()
        
        // We create a doc that 'points' at collection 'users' with primary key user's input email 
        const ref = doc(db, "users", email); 
        // Now "Bring me, from the collection 'users' the document with name/value 'email'"
        const res = await getDoc(ref);

        //If the user with email = "email" and password = "passowrd" exists in the db...
        if (res.exists() && res.data().email === email && res.data().password === password) {
            // Get the role and email...
            const user_role = res.data().role
            const user_email = res.data().email
            const user_sex = res.data().sex

            // Store the email and role as keys in your browser local storage
            localStorage.setItem('role', user_role)
            localStorage.setItem('email', user_email)
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('sex', user_sex)

            
            // Go to page /courses
            window.location.href = './myhome'
            console.log("Found User:", res.data());
            
        } else {
            setErrorMessage('Incorrect username or password. Please try again.');
            console.log("No such document!");
        }
    }

    return(
        <div>
                <Navbar/>    
                    {/*--------- Breadcrumbs -------> */}
                    <section id="breadcrumbs" className="breadcrumbs">
                        <div className="container">
                            <div className="d-flex justify-content-between align-items-center">
                                <ol>
                                    <li><a href="/"><i className="icofont-home"></i></a></li>
                                    <li>Σύνδεση</li>
                                </ol>
                            </div>
                        </div>
                    </section>
                    {/*--------- Breadcrumbs -------> */}
                    <div className='row justify-content-center'>
                    <div className='login' >
                        <form onSubmit={handleLogin} className='login-container'>
                            <h1 style={{ fontWeight: 'bold' }}>Σύνδεση</h1>
                            <hr />
                            <p style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Συμπληρώστε το όνομα χρήστη και τον κωδικό σας για να αποκτήσετε πρόσβαση στον ιστοχώρο του Πανεπιστημίου.</p>
                            <hr />
                            <div className='login-row'>
                                <i className="icofont-user-alt-3" style={{ color: '#1869ff', paddingRight: '5px' }}></i>
                                <label> Email</label>
                                &nbsp;&nbsp;&nbsp;
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='login-row'>
                            <FontAwesomeIcon icon={faLock} style={{ color: '#1869ff', paddingRight: '5px' }} />
                                <label>Password</label>
                                &nbsp;&nbsp;&nbsp;
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <button type='submit'>Login</button>
                            <a href='/register' className="create-user-link">Create new user</a>
                            <a href='/comingsoon' className="forgot-user-link">Forgot your password?</a>
                        </form>
            </div>       
        </div>
    <Footer/>
    </div>
    )
}