import axios from "axios";
import { API_URL_LOGIN, API_URL_REGISTER } from "../constant/constantURL/URLAuth";

class AuthService  {
    static postLogin(login) {
        return axios.post(API_URL_LOGIN,login)
    }
    static postRegister(register) {
        return axios.post(API_URL_REGISTER,register)
    }
}   

export default AuthService;
