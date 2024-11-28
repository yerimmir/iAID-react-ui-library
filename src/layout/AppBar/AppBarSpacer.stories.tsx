import React from "react";
import { AppBar } from "./AppBar";
import { AppBarSpacer } from "./AppBarSpacer";
import "./style/_index.scss";

export default {
  component: AppBarSpacer,
  title: "AppBar",
};

export const appBarSpacer = () => {
  return (
    <AppBar>
      <div>IAID</div>
      <AppBarSpacer style={{ width: 300, border:'1px solid pink'}} className='BarSpacer'></AppBarSpacer>
      <div>From IAID</div>
    </AppBar>
  );
};
