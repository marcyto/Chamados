
import { useContext,useState } from "react";
import { Link } from "react-router-dom";
import './signup.css';
import logo from '../../assets/logo.png';
import { AuthContext } from "../../contexts/auth";


export default function SignUp(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { signUp } = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault(e);

        if(nome !== '' && email !== '' && password !== ''){
            signUp(email, password, nome)
        }
    }

    return(

        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro</h1>
                    <input type="text" placeholder="Nome" onChange={ (e)=> setNome(e.target.value)} />
                    <input type="email" placeholder="Email" onChange={ (e)=> setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Cadastrar</button>
                </form>
                <label>Ja tem uma conta?<Link to="/">Clique aqui</Link></label>

            </div>
            
        </div>
    );
}