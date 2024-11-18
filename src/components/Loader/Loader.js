import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-box">
      <div className="loader-box-child loader-first-box-parent">
        <div style={{ width: "80%" }} className="load-holder">
          <div className="loader-profile-pics"></div>
          <div className="loader-profile-rectangle-holderr">
            <div className="loader-profile-longg"></div>
            <div className="loader-profile-shortt"></div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
          className="load-holder"
        >
          <div className="loader-profile-pics"></div>
          <div className="loader-profile-pics"></div>
        </div>
      </div>
      <div className="loader-box-child loader-second-box-parent">
        <div className="loader-second-box">Adeweb Developer</div>
        <div style={{ width: "35%" }} className="loader-second-box"></div>
      </div>
      <div className="loader-box-child loader-third-box-parent">
        <div className="loader-third-box"></div>
        <div className="loader-third-box"></div>
      </div>
      <div className="loader-box-child">
        <div className="loader-profile-rectangle-holder">
          <div className="loader-profile-longg"></div>
          <div className="loader-profile-shortt"></div>
        </div>
      </div>
      <div className="loader-box-child">
        <div className="loader-profile-rectangle-holder">
          <div className="loader-profile-longg"></div>
          <div className="loader-profile-shortt"></div>
        </div>
      </div>
      <div className="loader-box-child another-loader">
        <div className="loader-profile-rectangle-holder">
          <div className="loader-profile-long"></div>
          <div className="loader-profile-shortt"></div>
        </div>

        <div className="loader-profile-picsx"></div>
      </div>
      <div className="loader-box-child">
        <div className="last-loader">
          <div className="buttonno">Built by Adeweb Developer</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
