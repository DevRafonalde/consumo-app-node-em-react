import React from "react";
import {get} from "lodash";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {Container} from "../../styles/GlobalStyles";
import {Form} from "./styled";
import * as actions from "../../store/modules/auth/actions";

export default function Login(props) {
    const dispatch = useDispatch();
    const prevPath = get(props, "location.state.prevPath", "/");
    const [nome_user, setNome_user] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErros = false;

        if (nome_user.length < 3 || nome_user.length > 255) {
            formErros = true;
            toast.error("Usuário inválido");
        }

        if (password.length < 6 || password.length > 50) {
            formErros = true;
            toast.error("Senha inválida");
        }

        if (!formErros) {
            dispatch(actions.loginRequest({nome_user, password, prevPath}));
        }
    };

    return (
        <Container>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nome_user}
                    onChange={(e) => setNome_user(e.target.value)}
                    placeholder="Nome de Usuário"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />
                <button type="submit">Acessar</button>
            </Form>
        </Container>
    );
}
