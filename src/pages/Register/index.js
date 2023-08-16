/* eslint-disable react/jsx-no-bind */
import React from "react";
import {isEmail} from "validator";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import * as actions from "../../store/modules/auth/actions";
import {Container} from "../../styles/GlobalStyles";
import {Form} from "./styled";
import Loading from "../../components/Loading";

export default function Register() {
    const dispatch = useDispatch();
    const idStored = useSelector((state) => state.auth.usuario.id);
    const nomeStored = useSelector((state) => state.auth.usuario.nome);
    const nome_userStored = useSelector(
        (state) => state.auth.usuario.nome_user
    );
    const emailStored = useSelector((state) => state.auth.usuario.email);
    const isLoading = useSelector((state) => state.auth.isLoading);

    const [nome, setNome] = React.useState("");
    const [nome_user, setNome_user] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    React.useEffect(() => {
        if (idStored) {
            setNome(nomeStored);
            setEmail(emailStored);
            setNome_user(nome_userStored);
        }
    }, [nomeStored, idStored, nome_userStored, emailStored]);

    async function handleSubmit(e) {
        e.preventDefault();
        let formErros = false;

        if (nome.length < 3 || nome.length > 255) {
            formErros = true;
            toast.error("O nome deve ter entre 3 e 255 caracteres");
        }

        if (nome_user.length < 3 || nome_user.length > 255) {
            formErros = true;
            toast.error("O nome de usuário deve ter entre 3 e 255 caracteres");
        }

        if (!isEmail(email)) {
            formErros = true;
            toast.error("E-mail inválido");
        }

        if (!idStored && (password.length < 6 || password.length > 50)) {
            formErros = true;
            toast.error("A senha deve ter entre 6 e 50 caracteres");
        }

        if (!formErros) {
            dispatch(
                actions.registerRequest({
                    nome,
                    nome_user,
                    email,
                    password,
                    idStored,
                })
            );
        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>{idStored ? "Editar dados" : "Crie sua conta"}</h1>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="nome">
                    Nome:
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome do usuário"
                    />
                </label>
                <label htmlFor="nome_user">
                    Nome de Usuário:
                    <input
                        id="nome_user"
                        type="text"
                        value={nome_user}
                        onChange={(e) => setNome_user(e.target.value)}
                        placeholder="Digite o nome de usuário"
                    />
                </label>
                <label htmlFor="email">
                    E-mail:
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite o e-mail do usuário"
                    />
                </label>
                <label htmlFor="password">
                    Senha:
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite a senha do usuário"
                    />
                </label>
                <button type="submit">
                    {idStored ? "Modificar usuário" : "Criar usuário"}
                </button>
            </Form>
        </Container>
    );
}
