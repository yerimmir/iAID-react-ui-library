import React from "react";
import SnackBar from "./Snackbar";
import NotificationGroup from "./NotificationGroup";

export default {
  component: NotificationGroup,
  title: "NotificationGroup",
};

const Template = (args) => {
  return (
    <NotificationGroup {...args}>
      <SnackBar type="none"></SnackBar>
      <SnackBar type="success"></SnackBar>
      <SnackBar type="warning"></SnackBar>
      <SnackBar type="error"></SnackBar>
      <SnackBar type="info"></SnackBar>
    </NotificationGroup>
  );
};

export const NotificationGroupTS = Template.bind({});

NotificationGroupTS.args = {
  // className: "hello",
  style: {backgroundColor: 'gray', height: '700px', top: 50, right: 0, alignItems: 'start', flexWrap:'wrap-reverse'},
};
