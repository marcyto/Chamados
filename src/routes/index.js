import { Switch } from "react-router-dom";
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp'; 
import Route from './route';
import Dashboard from '../pages/dashboard';
import Profile from "../pages/profile";
import Customers from "../pages/customers";
import New from "../pages/New";

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={SignIn}/>
            <Route exact path="/register" component={SignUp}/>
            <Route exact path="/dashboard" component={Dashboard} isPrivate/>
            <Route exact path="/profile" component={Profile} isPrivate/>
            <Route exact path="/customers" component={Customers} isPrivate/>
            <Route exact path="/new" component={New} isPrivate/>
        </Switch>
    );
}