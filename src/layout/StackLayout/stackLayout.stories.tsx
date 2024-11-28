import React from "react";
import { StackLayout } from "./StackLayout";
import "../../theme/default/scss/index.scss"

export default {
  component: StackLayout,
  title: "StackLayoutSection",
};

export const stackLayout = () => {
  return (
    <div
      className="example-wrapper"
      style={{ width: "300px", margin: "0 auto", minHeight: "280px" }}
    >
      <div className="page" style={{ padding: "20px 10px" }}>
        <div
          className="content"
          style={{
            background: "#F9F9F9",
            borderRadius: "30px 30px 0 0",
            height: "450px",
          }}
        >
          <StackLayout
            orientation={"horizontal"}
            gap={20}
            style={{ height: "100%" }}
            align={{horizontal: "center" ,vertical: "bottom"}}
          >
            <div
              className="box first k-flex-40"
              style={{ padding: "4px", backgroundColor: "#FAE47A" }}
            />
            <div
              className="box second k-flex-20"
              style={{ padding: "4px", backgroundColor: "#FBD17F" }}
            />
            <div
              className="box third k-flex-10"
              style={{ padding: "4px", backgroundColor: "#EBAA79" }}
            />
            <div
              className="box fourth k-flex-30"
              style={{ padding: "4px", backgroundColor: "#FAE47A" }}
            />
          </StackLayout>
        </div>
      </div>
    </div>
  );
};
