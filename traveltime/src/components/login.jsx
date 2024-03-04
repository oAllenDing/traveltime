import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../UserContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const {setUser} = useContext(UserContext);

    const loginSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('/login', {
                email, 
                password,
            });
            setUser(data);
            alert('Login successful!');
            setRedirect(true);
        } catch (err) {
            alert('Login failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-2xl text-center mb-4">Welcome back traveler! Please Login</h1>
                <form className="max-w-md mx-auto" onSubmit={loginSubmit}>
                    <input type='email' placeholder='Enter email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input type='password' placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button className='primary dark:bg-primary-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Login</button>
                    <div className="text-center py-4 text-gray-500">
                        Not a traveler yet? <Link className='underline' to={'/registration'}>Embark now!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;