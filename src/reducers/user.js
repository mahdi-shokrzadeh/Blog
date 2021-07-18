export const userReducer = (state = {} , action) => {
    switch (action.type) {
        case "SET_USER":
            return {...action.payload } ;

        case "CLEAR_USER" :
            return {...action.payload} ;
        
        case "DELETE_USER_POST" :
            localStorage.setItem("user" , JSON.stringify({...action.payload}));
            return {...action.payload};
        
        case "CREATE_USER_POST" :
            localStorage.setItem("user" , JSON.stringify({...action.payload}));
            return {...action.payload};

        case "CHANGE_FULLNAME" :
            localStorage.setItem("user" , JSON.stringify({...action.payload}));
            return {...action.payload};

        case "CHANGE_BIO" :
            localStorage.setItem("user" , JSON.stringify({...action.payload}));
            return {...action.payload};

        default :
            return state ;
            
    }
}