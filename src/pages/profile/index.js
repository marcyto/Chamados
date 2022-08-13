

import Header from '../../components/header';
import Title from '../../components/title';
import {FiSettings, FiUpload} from 'react-icons/fi';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';
import './profile.css';
import firebase from '../../services/firebaseConnection';

export default function Profile(){
    const { user, signOut, setUser, storageUser } = useContext(AuthContext);
    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);


    function handleFile(e){

        if(e.target.files[0]){

            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }else{
                alert('Envie uma image do tipo JPEG ou PNG');
                setImageAvatar(null);
                return null;
            }
        }

    }

    async function handleUpdate(){
        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
        .ref(`image/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async ()=> {

            await firebase.storage().ref(`image/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async (url)=> {
                let urlFoto = url;
                await firebase.firestore().collection('Users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlFoto,
                    nome: nome
                })
                .then(()=> {
                    let data ={
                        ...user,
                        avatarUrl:urlFoto,
                        nome: nome
                    }
                    setUser(data);
                    storageUser(data);
                })
            })
        })
    }

    async function handleSave(e){
        e.preventDefault();
        if(imageAvatar === null && nome !== ''){
            await firebase.firestore().collection('Users')
            .doc(user.uid)
            .update({
                nome:nome,
            })  
            .then(() =>{
                let data = {
                    ...user,
                    nome: nome
                }
                setUser(data);
                storageUser(data);
            })
            .catch((error) => {
                console.log(error);
            })
        }else if(nome !== '' && imageAvatar !== null){
            handleUpdate();

        }
        
    }


    return(
        <div className="profile">
            <Header/>

            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings color='#121212' size={24}/>
                </Title>

                <div className="container">
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span> <FiUpload color="#FFF" size={25}/></span>

                            <input type="file" accept="image/*" onChange={handleFile}/> <br/>
                            {
                                avatarUrl === null ? 
                                <img src={avatar} width="250" height="250" alt="Foto perfil do usuario"/>
                                :
                                <img src={user.avatarUrl} width="250" height="250" alt="Foto perfil do usuario"/>
                            }
                        </label>


                        <label>Nome</label>
                        <input type="text" value={nome} onChange={ (e) => setNome(e.target.value)}/>

                        <label>Email</label>
                        <input type="text" value={email} disabled={true}/>

                        <button type="submit"> Salvar </button>
                    </form>
                </div>
                <div className="container">
                    <button className='logout-btn' onClick={() => signOut()}>
                        Sair
                    </button>

                </div>
            </div>

            
            
        </div>
    );
}