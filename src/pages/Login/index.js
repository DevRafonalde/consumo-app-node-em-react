import React from "react";
import {useDispatch} from "react-redux";
import {Container} from "../../styles/GlobalStyles";
import {Title, Paragrafo} from "./styled";
// import axios from "../../services/axios";
import * as exampleActions from "../../store/modules/example/actions";

export default function Login() {
    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     async function getData() {
    //         const response = await axios.get("/alunos");
    //         const {data} = response;
    //         console.log(data);
    //     }
    //     getData();
    // }, []);

    function handleClick(e) {
        e.preventDefault();
        dispatch(exampleActions.clicaBotaoRequest());
    }

    return (
        <Container>
            <Title>
                Login
                <small>Oie</small>
            </Title>
            <Paragrafo>Lorem Ipsum dolor sit amet.</Paragrafo>
            <button type="button" onClick={handleClick}>
                Enviar
            </button>
        </Container>
    );
}
