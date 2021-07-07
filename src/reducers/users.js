export const usersReducer = (state = [] , action) => {
    switch (action.type) {
        case "INITUSERS":
            return [...action.payload]
    
        default:
            return state ;
    }
}