import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/header";
import Title from "../../components/title";
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import './dashboard.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import firebase from "../../services/firebaseConnection";
import {format} from 'date-fns';

const listRef = firebase.firestore().collection('Chamados').orderBy('created', 'desc');


export default function Dashboard(){

    const {signOut} = useContext(AuthContext);
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    //quando for clicar para buscar mais items na lista.
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();


    useEffect(()=> {

        loadCallings();
    
        return ()=>{

        }

    }, [])

    async function loadCallings(){
        await listRef.limit(5)
        .get()
        .then((snapshot)=>{
            updateState(snapshot)
        })
        .catch((err)=>{
            console.log(err);
            setLoadingMore(false);
        })
        setLoading(false);

    }

    async function updateState(snapshot){

        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty){

            let lista = [];

            snapshot.forEach((doc)=> {
                lista.push({
                    id: doc.id,
                    cliente: doc.data().cliente,
                    assunto: doc.data().assunto,
                    clientId: doc.data().clientId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length -1]; //pega o ultimo elemento lido

            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);
        }else{
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }
    async function handleMore(e){
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot)=>{
            updateState(snapshot)
        })
        .catch((err)=>{
            console.log(err);
            

        })
    }


    if(loading){
        return(
            <div>
                <Header/>
                <div className="content">
                    <Title name="Atendimentos">
                        <FiMessageSquare size={24}/>
                    </Title>
                    <div className="container dashboard">
                        <span>Buscando Chamados...</span>
                    </div>
                </div>
            </div>
        )
    }

    return(

        <div>
            <Header/>
            <div className="content">
                <Title name="Atendimentos">
                    <FiMessageSquare size={24}/>
                </Title>

                {chamados.length === 0 ? (
                    <div className="container dashboard">
                        <span>Nenhum cadastro encontrado...</span>
                        <Link to="/new" className="new">
                            <FiPlus size={17}/>
                            NovoChamado
                        </Link>
                    </div>
                            
                ) : (
                    
                <>
                    <Link to="/new" className="new">
                            <FiPlus size={17}/>
                            NovoChamado
                    </Link>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastrado em</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chamados.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td data-label="Cliente">{item.cliente}</td>
                                        <td data-label="Assunto">{item.assunto}</td>
                                        <td data-label="Status">
                                            <span className="badge" style={{backgroundColor:  '#5cb85c' }}>{item.status}</span>
                                        </td>
                                        <td data-label="Cadastrado em">{item.createdFormated}</td>
                                        <td data-label="#">
                                            <button className="action" style={{backgroundColor:'#3583f6'}}><FiSearch size={17} color="#fff"/></button>
                                            <button className="action" style={{backgroundColor:'#f6a935'}}><FiEdit2 size={17} color="#fff"/></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {loadingMore && <h3 style={{textAlign:'center', marginTop:35}}>Buscando Dados</h3>}
                    {!loadingMore && !isEmpty &&<button className="btn-more" onClick={handleMore}>Buscar Mais</button>}
                    
                </>
                )}
                    
        

            </div>
        </div>
    );
}