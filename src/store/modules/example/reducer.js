import {toast} from "react-toastify";
import * as types from "../types";

const initialState = {
    botaoClicado: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.BOTAO_CLICADO_REQUEST: {
            console.log("Estou fazendo a requisição");
            toast.info("Estou fazendo a requisição");
            return state;
        }
        case types.BOTAO_CLICADO_SUCCESS: {
            const newState = {...state};
            newState.botaoClicado = !newState.botaoClicado;
            console.log("Opa, sucesso!");
            toast.success("Opa, sucesso!");
            return newState;
        }
        case types.BOTAO_CLICADO_FAILURE: {
            toast.error("Deu erro 😭😭");
            console.log("Deu erro 😭😭");
            return state;
        }
        default: {
            return state;
        }
    }
}
