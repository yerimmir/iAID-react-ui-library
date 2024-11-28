import React from "react";
import { AppBar } from "./AppBar";
//import "./style/_index.scss";
import "../../theme/default/scss/index.scss"

export default {
    component: AppBar,
    title: "AppBar"
}

export const appBar = () => {
    return (
        <AppBar  style={{border:"1px solid black"}} position='bottom' positionMode="fixed" className="NameName" id="namename?"> App Bar Test </AppBar>
    )
}