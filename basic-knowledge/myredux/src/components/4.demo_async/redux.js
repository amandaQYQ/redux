const initialState = {
    connect: false,
    data: null,
    error: null
}
function searchReducer(state = initialState, action) {
    switch (action.type) {
        case "SEARCH_REQUEST":
            return { ...state, connect: true };
        case "SEARCH_SUCCESS":
            return { ...state, connect: true, data: action.data };
        case "SEARCH_FAIL":
            return { ...state, connect: false, error: action.error, data: null };
        default:
            return state;
    };
};



export { searchReducer };


function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

const a = createReducer(initialState, {
    SEARCH_REQUEST:(state, act)=>{
        return { ...state, connect: true };
    },
    SEARCH_SUCCESS:()=>{
        return { ...state, connect: true, data: action.data };
    }
})


x = function() {

}