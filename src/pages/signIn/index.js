
import { useState } from "react";
import { Link } from "react-router-dom";

import logo from '../../assets/logo.png';
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import './signin.css';

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signIn} = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault(e);
        console.log("clicou");
        if(email !== '' && password !== ''){
            signIn(email, password);
        }
    }

    return(

        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Acessar</h1>
                    <input type="email" placeholder="Digite seu Email" onChange={ (e)=> setEmail(e.target.value)} />
                    <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Acessar</button>
                </form>
                <Link to="/register">Criar uma Conta</Link>

            </div>
            
        </div>
    );
}