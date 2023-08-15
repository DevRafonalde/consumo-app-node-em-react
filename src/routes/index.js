import React from "react";
// import {toast} from "react-toastify";
import {Switch} from "react-router-dom";
import MyRoute from "./MyRoute";
import Login from "../pages/Login";
import Page404 from "../pages/Page404";

export default function Routes() {
    // toast.success("Opa, sucesso!");
    // toast.error("Opa, erro!");
    // toast.warning("Opa, aviso!");
    // toast.info("Opa, informação!");
    return (
        <Switch>
            <MyRoute exact path="/" component={Login} />
            <MyRoute path="*" component={Page404} />
        </Switch>
    );
}
