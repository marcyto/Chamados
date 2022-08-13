
import { useState, useContext } from "react";
import './customers.css';
import Header from "../../components/header";
import Title from "../../components/title";
import { FiUser } from "react-icons/fi";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

export default function Customers(){
    
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereço, setEndereço] = useState('');

    async function handleAdd(e){
        e.preventDefault();
        
        if(nomeFantasia !== '' && cnpj !== '' && endereço !== ''){

            await firebase.firestore().collection('Customers')
            .add({
                nomeFantasia : nomeFantasia,
                cnpj:cnpj,
                endereço:endereço
            })
            .then(()=> {
                setNomeFantasia('');
                setCnpj('');
                setEndereço('');
                toast.info("Empresa cadastrada com sucesso");
            })
            .catch((error)=>{
                console.log(error);
                toast.error("Erro ao cadastrar essa empresa");
            })
        }else{
            toast.error("Preencha todos os campos");
        }
        
    }

    return(

        <div>
            <Header/>

            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleAdd}>
                        <label>Nome fantasia</label>
                        <input type="text" placeHolder="Digite o Nome da sua Empresa" value={nomeFantasia} onChange={ (e) => setNomeFantasia(e.target.value)} />

                        <label>Cpnj</label>
                        <input type="text" placeHolder="Digite o Cnpj da sua Empresa" value={cnpj} onChange={ (e) => setCnpj(e.target.value)} />

                        <label>Endereço</label>
                        <input type="text" placeHolder="Digite o Endereço da sua Empresa" value={endereço} onChange={ (e) => setEndereço(e.target.value)} />

                        <button type="submit">Cadastrar</button>

                    </form>

                </div>
            </div>
        </div>
    );

}