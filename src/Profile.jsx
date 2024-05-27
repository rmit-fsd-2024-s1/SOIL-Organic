// Profile.jsx
import React, { useState, useEffect } from 'react';
import { hashPassword } from './utils/hashPassword';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setName(userData.name);
            setEmail(userData.email);
            setPassword(userData.password);
            setJoinDate(userData.joinDate);
        } else{
            <p>This user is not found!</p>
        }
    }, []);

    // User can edit their name, email and password
    const handleEdit = () => {
        setIsEditing(true);
        const savedEdit = () => {
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
            setConfirmPassword(user.confirmPassword);
        }
        localStorage.setItem('savedEdit', JSON.stringify(savedEdit));
    };

    // Delete user's account
    const handleDelete = () => {
        localStorage.clear('user');
        alert('Your account deleted successfully!');
        
        // Redirect to home page
        navigate("/");
    };

    // Cancle edit form
    const handleCancle = () =>{
        setIsEditing(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(email)) {
                setError("Invalid email format.");
                return;
            }

        // Hash the password
        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!strongPasswordRegex.test(password)) {
                setError(
                    "Please enter a strong password. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
                );
                return;
            }

        const hashedPassword = hashPassword(password);

        // Updated in LocalStorage
        const updatedUser = {
            name,
            email,
            password: hashedPassword,
            joinDate,
            confirmPassword,
        };

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const newUsers = users.filter((user) => user.email !== email);
        newUsers.push(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("users", JSON.stringify(newUsers));

        // Reset the form firlds
        setName(updatedUser.name);
        setEmail(updatedUser.email);
        setPassword(updatedUser.password);
        setConfirmPassword("");
        if (confirmPassword === password){
            alert('User is updated successfully!');
            setIsEditing(false);
        } else{
            setError("Password is not comfirm!");
        }
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col items-center justify-center w-64'>
                <h2 className='text-2xl text-orange-600'>
                    <strong>{name}'s Profile</strong>
                </h2>
                <form className='flex flex-col mt-8'>
                    <div className='py-2'>
                       <label>Name: {name}</label> 
                    </div>
                    <div className='py-2'>
                        <label>Email: {email}</label>
                    </div>
                    <div className='py-2'>
                        <label>Date: {joinDate}</label>
                    </div>
                </form>
                <br></br>
            
                {isEditing? (
                    <div className='flex flex-col items-center justify-center w-64'>
                        <h1><strong>Edit Profile</strong></h1>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-8'>
                                <label>
                                    Name:
                                    <input 
                                        type='text' 
                                        className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}>
                                    </input>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Email:
                                    <input 
                                        type='email' 
                                        className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}>
                                    </input>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Password:
                                    <input 
                                        type='password' 
                                        className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}>
                                    </input>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Comfirm Password:
                                    <input 
                                        type='password' 
                                        className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                        value={confirmPassword} 
                                        onChange={(e) => setConfirmPassword(e.target.value)}>
                                    </input>
                                </label>
                            </div>
                            {error && <p className="font-bond text-orange-700">{error}</p>}
                            <br></br>
                            <div className='flex justify-center space-x-4'>
                                <button 
                                    type='submit' 
                                    className="hover:bg-orange-500 bg-orange-400 text-white px-6 py-3 rounded w-full"
                                >
                                    Save
                                </button>
                                <button 
                                    onClick={handleCancle} 
                                    className="hover:bg-orange-500 bg-orange-400 text-white px-6 py-3 rounded w-full"
                                >
                                    Cancle
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className='flex space-x-4'>
                        <button 
                            onClick={handleEdit} 
                            className="hover:bg-orange-500 bg-orange-400 text-white px-6 py-3 rounded w-full"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={handleDelete} 
                            className="hover:bg-orange-500 bg-orange-400 text-white px-6 py-3 rounded w-full"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile;
