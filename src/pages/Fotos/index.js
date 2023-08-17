import React from "react";
import {useParams} from "react-router-dom";
import {get, set} from "lodash";
import {toast} from "react-toastify";
import {Container} from "../../styles/GlobalStyles";
import Loading from "../../components/Loading";
import {Form, Title} from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";

export default function Fotos() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [foto, setFoto] = React.useState("");
    const params = useParams();
    const id = get(params, "id", "");

    React.useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const {data} = await axios.get(`/alunos/show/${id}`);
                setFoto(get(data, "tblFotos[0].url", ""));
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast.error("Erro ao obter imagem");
                history.push("/");
            }
        };
        getData();
    }, []);

    const handleChange = (e) => {
        const fotoEscolhida = e.target.files[0];
        const fotoEscolhidaUrl = URL.createObjectURL(fotoEscolhida);

        setFoto(fotoEscolhidaUrl);
    };

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <Title>Fotos</Title>
            <Form>
                <label htmlFor="foto">
                    {foto ? <img src={foto} alt="foto" /> : "Selecionar"}
                    <input type="file" id="foto" onChange={handleChange} />
                </label>
            </Form>
        </Container>
    );
}
