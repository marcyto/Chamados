import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/header";
import Title from "../../components/title";
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import './dashboard.css';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Dashboard(){

    const {signOut} = useContext(AuthContext);
    const [chamados, setChamados] = useState([1]);

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
                            <tr>
                                <td data-label="Cliente">SoberanoBurger</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status"><span className="badge" style={{backgroundColor:'#5cb85c'}}>Em aberto</span></td>
                                <td data-label="Cadastrado em">16/08/2022</td>
                                <td data-label="#">
                                    <button className="action" style={{backgroundColor:'#3583f6'}}><FiSearch size={17} color="#fff"/></button>
                                    <button className="action" style={{backgroundColor:'#f6a935'}}><FiEdit2 size={17} color="#fff"/></button>
                                </td>
                            </tr>
                            <tr>    
                                <td data-label="Cliente">ThayLucena</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status"><span className="badge" style={{backgroundColor:'#5cb85c'}}>Em aberto</span></td>
                                <td data-label="Cadastrado em">16/08/2022</td>
                                <td data-label="#">
                                    <button className="action" style={{backgroundColor:'#3583f6'}}><FiSearch size={17} color="#fff"/></button>
                                    <button className="action" style={{backgroundColor:'#f6a935'}}><FiEdit2 size={17} color="#fff"/></button>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    
                </>

                )}
                    
        

            </div>
        </div>
    );
}