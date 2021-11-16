export const reducer = (state, action) => {
    switch (action.type) {
        case "login":
            //console.log("invoked")
            return {
                ...state,
                user: action.user,
                loggedIn: true
            }
        case "logout":
            return {
                ...state,
                user: {},
                loggedIn: false
            }

        default:
            return state
    }
}

export const initialState = {
    user: {},
    loggedIn: false,
    redirect: ""
}