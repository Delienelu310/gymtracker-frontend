import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export default function Registration(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    const authContext = useAuth();

    async function handleSubmit() {

        if (await authContext.handleRegistration({username, password, fullname, email})) {
            setShowErrorMessage(false);     
            navigate(`/`);
        } else {
            setShowErrorMessage(true);
        }
    }

    if(authContext.isAuthenticated) {
        return <Navigate to='/'/>;
    }

    return (
        <div className="Login">
            {showErrorMessage && <div className='errorMessage'>Error</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <label>User Name</label>
                    <input type="text" name="fullname" value={fullname} onChange={(event) => setFullname(event.target.value)} />
                </div>
                <div>
                    <label>User Name</label>
                    <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <button type="button" name="login" className='btn btn-success' onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );
}