import React from "react";
import SnackBar from "./Snackbar";

export default {
    component: SnackBar,
    title: "Snackbar"
}

const Template = (args) => {
    return (
        <SnackBar {...args}></SnackBar>
    )
}

export const SnackBarTS = Template.bind({});

SnackBarTS.args = {
    className: '',
    closable: true,
    dir: 'auto',
    type: "info",
    hideIcon: false,
    // onClose: {},
    children: 'error is occurred!'
}