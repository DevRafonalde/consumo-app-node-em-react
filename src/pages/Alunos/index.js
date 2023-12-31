import React from "react";
import {get} from "lodash";
import {
    FaUserCircle,
    FaEdit,
    FaWindowClose,
    FaExclamation,
} from "react-icons/fa";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {Container} from "../../styles/GlobalStyles";
import axios from "../../services/axios";
import {AlunoContainer, ProfilePicture, NovoAluno} from "./styled";
import Loading from "../../components/Loading";
import * as colors from "../../config/colors";

export default function Alunos() {
    const [alunos, setAlunos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const response = await axios.get("/alunos");
            setAlunos(response.data);
            setIsLoading(false);
        }
        getData();
    }, []);

    const handleDeleteAsk = (e) => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute("display", "block");
        e.currentTarget.remove();
    };

    const handleDelete = async (e, id, index) => {
        try {
            setIsLoading(true);
            await axios.delete(`/alunos/delete/${id}`);
            const novosAlunos = [...alunos];
            novosAlunos.splice(index, 1);
            setIsLoading(false);
            setAlunos(novosAlunos);
        } catch (error) {
            const status = get(error, "response.status", []);
            if (status) {
                toast.error("Você precisa fazer o login");
            } else {
                toast.error("Ocorreu um erro ao excluir o aluno");
            }
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>Alunos</h1>
            <NovoAluno to="/aluno/">Novo Aluno</NovoAluno>
            <AlunoContainer>
                {alunos.map((aluno, index) => (
                    <div key={String(aluno.id)}>
                        <ProfilePicture>
                            {get(aluno, "tblFotos[0].url", false) ? (
                                <img src={aluno.tblFotos[0].url} alt="" />
                            ) : (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>
                        <span>{aluno.nome}</span>
                        <span>{aluno.email}</span>
                        <Link to={`/aluno/${aluno.id}/edit`}>
                            <FaEdit size={16} color={colors.primaryColor} />
                        </Link>
                        <Link
                            onClick={handleDeleteAsk}
                            to={`/aluno/${aluno.id}/delete`}>
                            <FaWindowClose
                                size={16}
                                color={colors.primaryColor}
                            />
                        </Link>
                        <FaExclamation
                            size={16}
                            display="none"
                            cursor="pointer"
                            onClick={(e) => handleDelete(e, aluno.id, index)}
                        />
                    </div>
                ))}
            </AlunoContainer>
        </Container>
    );
}
