import axios from "axios";
import store from ".././store";
import { updateUser } from ".././redux/actions/user";

class AuthService {
	
	
  authenticate() {
	
    store.dispatch(updateUser({username:"tritran"}));
  }

  logout() {
    store.dispatch(updateUser({username:""}));
  }
 
  getCurrentUser() {

    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
