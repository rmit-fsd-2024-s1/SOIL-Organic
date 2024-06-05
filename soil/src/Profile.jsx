// Profile.jsx
import React, { useState, useEffect } from 'react';
// import { hashPassword } from './utils/hashPassword';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        //Fetch user details from API
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/users/profile'); // Ensure this endpoint returns the logged-in user's data
                const userData = response.data;
                setUser(userData);
                setName(userData.name);
                setEmail(userData.email);
                setJoinDate(userData.joinDate);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data.');
            }
        };
        fetchUser();
    }, []);

    // User can edit their name, email and password
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Delete user's account via API
    const handleDelete = async () => {
        try {
            await axios.delete('/api/users/${user.user_id}'); // Ensure this endpoint deletes the logged-in user's account
            localStorage.removeItem('user');
            alert('Your account has been deleted successfully!');
            navigate("/");
        } catch (error) {
            console.error('Error deleting account:', error);
            setError('Failed to delete account.');
        }
    };

    // Cancle edit form
    const handleCancle = () =>{
        setIsEditing(false);
        setError("");
        setSuccessMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Hash the password
        // Ensure hashPassword function is implemented
        const hashedPassword = password;

        // Updated user data
        const updatedUser = {
            name,
            email,
            password: hashedPassword,
            // joinDate,
        };

        // Send updated data to API
        // Ensure this endpoint updates the logged-in user's data
        try {
            const response = await axios.put('/api/users/${user.user_id}', updatedUser);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setSuccessMessage("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile.');
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col items-center justify-center w-64'>
                <h2 className='text-2xl text-orange-600'>
                    <strong>{name}'s Profile</strong>
                </h2>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {error && <p className="text-red-500">{error}</p>}
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
                            <br></br>
                            <div className='flex justify-center space-x-4'>
                                <button 
                                    type='submit' 
                                    className="hover:bg-orange-500 bg-orange-400 text-white px-6 py-3 rounded w-full"
                                >
                                    Save
                                </button>
                                <button
                                    type='button' 
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
