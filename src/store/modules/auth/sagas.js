/* eslint-disable require-yield */
import {call, put, all, takeLatest} from "redux-saga/effects";
import {toast} from "react-toastify";
import {get} from "lodash";
import * as actions from "./actions";
import * as types from "../types";
import axios from "../../../services/axios";
import history from "../../../services/history";

function* loginRequest({payload}) {
    try {
        const response = yield call(axios.post, "/tokens", payload);
        yield put(actions.loginSuccess({...response.data}));
        toast.success("Login efetuado com sucesso!");
        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        history.push(payload.prevPath);
    } catch (error) {
        toast.error("Usuário ou senha inválidos");
        yield put(actions.loginFailure());
    }
}

function persistRehydrate({payload}) {
    const token = get(payload, "auth.token", "");
    if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

function* registerRequest({payload}) {
    const {idStored, nome, nome_user, email, password} = payload;

    try {
        if (idStored) {
            yield call(axios.put, "/usuarios/update", {
                email,
                nome,
                nome_user,
                password: password || undefined,
            });
            toast.success("Conta alterada com sucesso!");
            yield put(actions.registerUpdatedSuccess(payload));
        } else {
            yield call(axios.post, "/usuarios/create", {
                email,
                nome,
                nome_user,
                password,
            });
            toast.success("Conta criada com sucesso!");
            yield put(actions.registerCreatedSuccess(payload));
            history.push("/login");
        }
    } catch (e) {
        const errors = get(e, "response.data.errors", []);
        const status = get(e, "response.status");

        if (status === 401) {
            toast.error("Você precisa fazer o login novamente.");
            yield put(actions.loginFailure());
            history.push("/login");
        }

        if (errors.length > 0) {
            errors.map((error) => toast.error(error));
        } else {
            toast.error("Erro desconhecido");
        }

        yield put(actions.registerFailure());
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
