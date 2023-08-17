import React from "react";
import {useParams, Link} from "react-router-dom";
import {FaEdit, FaUserCircle} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {isEmail, isInt, isFloat} from "validator";
import {get} from "lodash";
import {toast} from "react-toastify";
import {Container} from "../../styles/GlobalStyles";
import {Form, ProfilePicture, Title} from "./styled";
import Loading from "../../components/Loading";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

export default function Aluno() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = get(params, "id", "");
    const [nome, setNome] = React.useState("");
    const [sobrenome, setSobrenome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [idade, setIdade] = React.useState("");
    const [peso, setPeso] = React.useState("");
    const [altura, setAltura] = React.useState("");
    const [foto, setFoto] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (!id) {
            return;
        }
        async function getData() {
            try {
                setIsLoading(true);
                const {data} = await axios.get(`/alunos/show/${id}`);
                const tblFoto = get(data, "tblFotos[0].url", "");
                setFoto(tblFoto);

                setNome(data.nome);
                setSobrenome(data.sobrenome);
                setEmail(data.email);
                setIdade(data.idade);
                setPeso(data.peso);
                setAltura(data.altura);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                const status = get(error, "response.status", "");
                const errors = get(error, "response.data.erros", []);

                if (status === 400) {
                    errors.map((erro) => toast.error(erro));
                }
                history.push("/");
            }
        }

        getData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = false;

        if (nome.length < 3 || nome.length > 255) {
            toast.error("O nome precisa ter entre 3 e 255 caracteres");
            formErrors = true;
        }

        if (sobrenome.length < 3 || sobrenome.length > 255) {
            toast.error("O sobrenome precisa ter entre 3 e 255 caracteres");
            formErrors = true;
        }

        if (!isEmail(email)) {
            toast.error("Email inválido");
            formErrors = true;
        }

        if (!isInt(String(idade))) {
            toast.error("A idade deve ser um número inteiro");
            formErrors = true;
        }

        if (!isFloat(String(peso).replace(",", "."))) {
            toast.error("Peso inválido (Deve ter em quilogramas)");
            formErrors = true;
        }

        if (!isFloat(String(altura).replace(",", "."))) {
            toast.error("Altura inválida (Deve ser em metros)");
            formErrors = true;
        }

        if (formErrors) {
            return;
        }

        try {
            if (id) {
                setIsLoading(true);
                // Editando
                await axios.put(`/alunos/update/${id}`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura,
                });
                setIsLoading(false);
                toast.success("Aluno(a) editado(a) com sucesso");
                history.push("/");
            } else {
                setIsLoading(true);
                // Criando
                const {data} = await axios.post("/alunos/create", {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura,
                });
                setIsLoading(false);
                toast.success("Aluno(a) criado(a) com sucesso");
                history.push(`/aluno/${data.id}/edit`);
            }
        } catch (err) {
            setIsLoading(false);
            const status = get(err, "response.status", 0);
            const data = get(err, "response.data", []);
            const errors = get(data, "errors", []);

            if (errors.length > 0) {
                errors.map((error) => toast.error(error));
            } else {
                toast.error("Erro desconhecido");
            }

            if (status === 401) {
                dispatch(actions.loginFailure());
            }
        }
    };

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <Title>{id ? "Editar Aluno(a)" : "Novo Aluno(a)"}</Title>
            {id && (
                <ProfilePicture>
                    {foto ? (
                        <img src={foto} alt={nome} />
                    ) : (
                        <FaUserCircle size={180} />
                    )}
                    <Link to={`/fotos/${id}`}>
                        <FaEdit size={24} />
                    </Link>
                </ProfilePicture>
            )}
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                />
                <input
                    type="text"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    placeholder="Sobrenome"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                />
                <input
                    type="number"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    placeholder="Idade"
                />
                <input
                    type="text"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Peso"
                />
                <input
                    type="text"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="Altura"
                />
                <button type="submit">
                    {id ? "Alterar Aluno(a)" : "Cadastrar Aluno(a)"}
                </button>
            </Form>
        </Container>
    );
}
