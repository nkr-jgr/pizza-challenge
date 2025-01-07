"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewUserPage: React.FC = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, age: parseInt(age), gender }),
            });

            if (response.ok) {
                alert('User added successfully');
                setName('');
                setAge('');
                setGender('Male');
                router.push('/');
            } else {
                alert('Failed to add user');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Create New User</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 w-96">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to disclose">Prefer not to disclose</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                    Submit
                </button>
            </form>
            <button
                onClick={() => router.push('/')}
                className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
                Go Back
            </button>
        </div>
    );
};

export default NewUserPage;
