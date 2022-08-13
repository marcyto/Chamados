
import { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

export default function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');
            
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, [])

    async function signIn(email, password){
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value)=> {

            let uid = value.user.uid;

            const UserProfile = await firebase.firestore().collection('Users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: UserProfile.data().nome,
                avatarUrl: UserProfile.data().avatarUrl,
                email: value.user.email,
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success(`Bem vindo + ${UserProfile.data().nome}`);
        })
        .catch((error)=>{
            console.log(error);
            toast.error(`OPS, algo deu errado...`);
            setLoadingAuth(false);
        })
    }

    async function signUp(email, password, nome){
        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {

            let uid = value.user.uid;
            
            await firebase.firestore().collection('Users')
            .doc(uid)
            .set({
                nome: nome,
                avatarUrl: null,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null,
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success(`Bem vindo + ${nome}`);
            })
        })
        .catch((error) => {
            console.log(error);
            toast.error(`Ops, algo deu errado...`)
            setLoadingAuth(false);
        })
    }
    
    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    async function signOut(){

        await firebase.auth().signOut();
        toast.success(`Logout concluido`);
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    return(

        <AuthContext.Provider value={{ 
            signed: 
                !!user, 
                user, 
                loading, 
                signUp, 
                signOut, 
                signIn,
                setUser,
                storageUser
                }}>
            {children}
        </AuthContext.Provider>

    );

}
