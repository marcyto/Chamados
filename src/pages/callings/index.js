import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/header";
import Title from "../../components/title";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import './callings.css';


export default function Callings(){

    const [chamados, setChamados] = useState([]);

    return(
        <div>
            <Header/>

            <div className="content">

                <Title name="Atendimentos">
                    <FiMessageSquare size={25}/>
                </Title>

                {chamados.length === 0 ? (
                    <div className="container callings">

                    <span>Nenhum chamado registrado...</span>
                     <Link to='/new' className="new">
                        <FiPlus size={25}/>
                        Novo chamado
                     </Link>
                    </div>
                ) : (

                    <>
                        <span>Nenhum chamado registrado...</span>
                            <Link to='/new' className="new">
                                <FiPlus size={25}/>
                                Novo chamado
                            </Link>
                    </>
                )}

                

            </div>            
        </div>
    );
}


