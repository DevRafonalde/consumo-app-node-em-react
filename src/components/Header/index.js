import React from "react";
import {
    FaHome,
    FaSignInAlt,
    FaUserAlt,
    FaCircle,
    FaPowerOff,
} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import history from "../../services/history";
import {Nav} from "./styled";
import * as actions from "../../store/modules/auth/actions";

export default function Header() {
    const dispatch = useDispatch();
    const isLogado = useSelector((state) => state.auth.isLogado);
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(actions.loginFailure());
        history.push("/");
    };
    return (
        <Nav>
            <Link to="/">
                <FaHome size={24} />
            </Link>
            <Link to="/register">
                <FaUserAlt size={24} />
            </Link>
            {isLogado ? (
                <Link onClick={handleLogout} to="/logout">
                    <FaPowerOff size={24} />
                </Link>
            ) : (
                <Link to="/login">
                    <FaSignInAlt size={24} />
                </Link>
            )}
            {isLogado && <FaCircle size={24} color="#66ff33" />}
        </Nav>
    );
}
