import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/header";

export default function Dashboard(){

    const {signOut} = useContext(AuthContext);

    return(

        <div>
            <Header/>
        </div>
    );
}