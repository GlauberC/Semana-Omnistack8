import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import "./Main.scss"

import api from '../sevices/api'

import logo from '../assets/logo.svg'
import likeImg from '../assets/like.svg'
import dislikeImg from '../assets/dislike.svg'

export default ( { match } ) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })
            setUsers(response.data)
        }
        loadUsers()
    }, [match.params.id])

    const handleLike =  async id => {
        await api.post(`/devs/${id}/likes`, null, {
            headers: {user: match.params.id}
        })
        setUsers(users.filter(user => user._id !== id))
    }
    const handleDislike =  async id => {
        await api.post(`/devs/${id}/deslikes`, null, {
            headers: {user: match.params.id}
        })
        setUsers(users.filter(user => user._id !== id))
    }
    
    return (
        <div className = "main-container">
            <Link to='/'><img src = {logo} alt="Tindev"/></Link>
            {users.length > 0 ? (
                    <ul>
                    {users.map(user => (
                        <li key = {user._id}>
                            <div className = "img-frame">
                                <img src={user.avatar} alt={`Foto de ${user.name}`}/>
                            </div>
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className = "buttons">
                                <button type = "button" onClick = {() => handleDislike(user._id)}>
                                    <img src = {dislikeImg} alt="Dislike"/>
                                </button>
                                <button type = "button" onClick = { () => handleLike(user._id) }>
                                    <img src = {likeImg} alt="Like"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : <div className = "empty">Nenhum usuário disponível :(</div>}
        </div>
    )
}