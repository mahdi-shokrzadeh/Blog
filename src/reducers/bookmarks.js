export const bookmarksReducer = (state = [] , action) => {
    switch (action.type) {
        case "INIT_BOOKMARKS":
            return [...action.payload]
    
        default:
            return state ;
    }
}