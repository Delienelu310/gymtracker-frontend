import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    const authContext = useAuth();

    async function handleSubmit() {

        if (await authContext.login(username, password)) {
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
        <div className="wrapper">
            {showErrorMessage && <div className='errorMessage'>Error</div>}
            <div className="LoginForm">
                <div>
                    <label className="m-2" for="username">User Name</label>
                    <input className="form-control" type="text" id="username" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <label className='m-2' for="password">Password</label>
                    <input className="form-control" id="password" type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <button type="button" name="login" className='btn btn-success m-5' onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );
}
