import { useState, useEffect, useRef, useReducer } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'

function UserCard({ firstName, lastName, username, email, image, gender, birthDate }) {
    return (
        <article className="user-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
            <img src={image} alt={`${firstName} ${lastName}`} width="64" height="64" style={{ borderRadius: '50%' }} />
            <h3>{firstName} {lastName}</h3>
            <p>@{username}</p>
            <p>{email}</p>
            <small>{gender} • {birthDate}</small>
        </article>
    );
}

export default function Users() {
    const { data, loading, error } = useFetch('https://dummyjson.com/users');
    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    const userList = (data?.users || []).map(user => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        image: user.image,
        gender: user.gender,
        birthDate: user.birthDate,
    }));
    return (
        <div className="work-grid">
            {userList.map(user => <UserCard key={user.username} {...user} />)}
        </div>
    );
}
