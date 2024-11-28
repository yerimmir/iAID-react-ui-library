import React from "react";
import { AppBar } from "./AppBar";
import { AppBarSpacer } from "./AppBarSpacer";
import { AppBarSection } from "./AppBarSection";
import "./style/_index.scss";

export default {
    component: AppBarSection,
    title: "AppBar"
}

export const appBarSection = () => {
    return (
        <AppBar>
        <AppBarSection>
          <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base" style={{width: '20px', height: '20px'}}>
            <span className="k-icon k-i-menu" />
          </button>
        </AppBarSection>

        <AppBarSpacer
          style={{
            width: 20,
          }}
        />
        <AppBarSection>
          <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base" style={{width: '20px', height: '20px'}}>
            <span className="k-icon k-i-menu" />
          </button>
        </AppBarSection>
      </AppBar>
    )
}