import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import './header.css';
import avatar from '../../assets/avatar.png';
import {FiUser, FiHome, FiSettings} from "react-icons/fi";
import Dashboard from "../../pages/dashboard";

export default function Header(){

    const { user } = useContext(AuthContext);
    return(
        <div className="sidebar">
            <div className="img-area">
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl}/>
            </div>

            <Link to="/callings">
                <FiHome color="#FFF" size={25}/>
                Chamados
            </Link>
            <Link to="/customers">
                <FiUser color="#FFF" size={25}/>
                Clientes
            </Link>
            <Link to="/profile">
                <FiSettings color="#FFF" size={25}/>
                Configurações
            </Link>

            

            
         
        </div>
    )
}

