import React , { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../actions/user';
import { logoutUser } from '../../services/userService';


const Logout = ({history}) => {
    
    const dispatch = useDispatch();

    useEffect( async () => {
        
        try {
            const token = {
                token :localStorage.getItem("token")
            } ;
            const {status , data } = await logoutUser(token);
            
            if(status === 200){
                localStorage.removeItem("token");
                dispatch(clearUser()) ;
                history.push("/")
            }

        }catch(ex){
            console.log(ex);
        }
        
    } , [])


    return null ;
}
 
export default Logout;