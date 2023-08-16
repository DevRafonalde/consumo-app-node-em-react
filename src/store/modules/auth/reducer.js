import * as types from "../types";

const initialState = {
    isLogado: false,
    token: false,
    usuario: {},
    isLoading: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST: {
            const newState = {...state};
            newState.isLoading = true;
            return newState;
        }
        case types.LOGIN_SUCCESS: {
            const newState = {...state};
            newState.isLogado = true;
            newState.token = action.payload.token;
            newState.usuario = action.payload.usuario;
            newState.isLoading = false;
            return newState;
        }
        case types.LOGIN_FAILURE: {
            const newState = {...initialState};
            newState.isLoading = false;
            return newState;
        }
        default: {
            return state;
        }
    }
}
