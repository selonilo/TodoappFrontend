import React from "react";
import { useHistory } from "react-router-dom";

export const Access = (props) => {
  const history = useHistory();

  return (
    <div className="exception-body access">
      <div className="exception-topbar">
        <button id="logolink" onClick={() => history.push("/")} className="layout-topbar-logo p-link">
          <img src={`assets/layout/images/logo-freya.svg`} />
        </button>
      </div>
      <div className="exception-wrapper">
        <div className="exception-content">
          <img src="assets/layout/images/pages/asset-access.svg" alt="logo" />
          <span>Yetkisiz Giriş</span>
        </div>
        <div className="exception-footer">
          <h6>Copyright Ⓒ CMV</h6>
        </div>
      </div>
    </div>
  );
};
