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
        <div className="wrapper">
            {showErrorMessage && <div className='errorMessage'>Error</div>}
            <div className="RegistrationForm">
                <div>
                    <label className='m-2' for="username">User Name</label>
                    <input className="form-control" type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <label className='m-2' for="fullname">Fullname</label>
                    <input className="form-control" type="text" id="fullname" name="fullname" value={fullname} onChange={(event) => setFullname(event.target.value)} />
                </div>
                <div>
                    <label className='m-2' for="email">Email</label>
                    <input className="form-control" type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label className='m-2' for="password">Password</label>
                    <input className="form-control" type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <button type="button" name="login" className='btn btn-success m-5' onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    );
}