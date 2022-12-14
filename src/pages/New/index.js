
import Header from "../../components/header";
import Title from "../../components/title";
import { FiPlus } from "react-icons/fi";
import './new.css';
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../services/firebaseConnection";
import { toast } from 'react-toastify';

export default function New(){

    const [loadCustomers, setLoadCustomers] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] =  useState('');

    const {user} = useContext(AuthContext);


    useEffect(()=> {

        async function loadCustomers(){
            await firebase.firestore().collection('Customers')
            .get()
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc)=> {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if(lista.length === 0){
                    console.log("Nenhuma empresa cadastrada");
                    setSelectedCustomer([{id: '1', nomeFantasia:''}])
                    setLoadCustomers(false);
                    return;
                }
                setCustomers(lista);
                setLoadCustomers(false);

            })
            .catch((error)=> {
                alert("Ops, parece que algo deu errado");
                setLoadCustomers(false);
                setSelectedCustomer([{id: '1', nomeFantasia: ''}])
            })
        }

        loadCustomers();
    }, [])
    

    async function handleRegister(e){
        e.preventDefault();

        await firebase.firestore().collection('Chamados')
        .add({
            created: new Date(),
            cliente: customers[selectedCustomer].nomeFantasia,
            clientId: customers[selectedCustomer].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid,
        })
        .then(()=>{
            toast.success('Chamado cadastrado com sucesso');
            setComplemento('');
            setSelectedCustomer(0);


        })
        .catch((err)=>{
            toast.error('Ops, parece que algo deu errado, tente novamente!');
            console.log(err);
        })


    }

    function handleSubjectSelect(e){
        setAssunto(e.target.value);
    }
    function handleStatusSelect(e){
        setStatus(e.target.value);
    }
    function handleComplementSelect(e){
        setComplemento(e.target.value);
    }
    function handleChangeCustomer(e){
        setSelectedCustomer(e.target.value);
    }
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Novo Chamado">
                    <FiPlus size={25}/>
                </Title>

                <div className='container'>

                    <form className="form-profile" onSubmit={handleRegister}>

                        <label>Cliente:</label>

                        {loadCustomers ? (
                            <input type="text" value="Carregando Clientes..." disabled={true}/>
                        ) : (
                            <select value={selectedCustomer} onChange={handleChangeCustomer}>
                            {customers.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.nomeFantasia}
                                    </option>
                                )
                            })}
                            </select>
                        )}
                        

                        <label>Assunto:</label>
                        <select value={assunto} onChange={handleSubjectSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status:</label>
                        <div className='status'>
                            <input type="radio" name="radio" value="Aberto" onChange={handleStatusSelect} checked={ status === 'Aberto'}/>
                            <span>Em Aberto</span>
                            <input type="radio" name="radio" value="Progresso" onChange={handleStatusSelect} checked={ status === 'Progresso'}/>
                            <span>Progresso</span>
                            <input type="radio" name="radio" value="Atendido" onChange={handleStatusSelect} checked={ status === 'Atendido'}/>
                            <span>Atendido</span>
                        </div>

                        <label>Complemento:</label>

                        <textarea type="text" placeholder="Descreva seu problema(Opcional)" value={complemento} onChange={handleComplementSelect}/>

                        <button type="submit">Registrar</button>
            
                    </form>

                </div>

            </div>

        </div>
    )
}