import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userRegistration = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/registration', {
                name,
                email,
                password,
            });
            alert('Registration complete!');
        } catch (err) {
            alert('Registration failed');
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-2xl text-center mb-4">Explore the world! Register Here</h1>
                <form className="max-w-md mx-auto" onSubmit={userRegistration}>
                    <input type='text' placeholder='Enter username'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input type='email' placeholder='Enter email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input type='password' placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button className='primary dark:bg-primary-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Register</button>
                    <div className="text-center py-4 text-gray-500">
                        Already a traveler? <Link className='underline' to={'/login'}>Login here!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;