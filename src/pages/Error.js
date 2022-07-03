import React from "react";
import { useHistory } from "react-router-dom";

export const Error = (props) => {
  const history = useHistory();

  return (
    <div className="exception-body error">
      <div className="exception-topbar">
        <button id="logolink" onClick={() => history.push("/")} className="layout-topbar-logo p-link">
          <img src={`assets/layout/images/logo-freya.svg`} />
        </button>
      </div>
      <div className="exception-wrapper">
        <div className="exception-content">
          <img src="assets/layout/images/pages/asset-error.svg" alt="logo" />
          <span>Error</span>
        </div>
        <div className="exception-footer">
          <h6>Copyright 🅢ALIH</h6>
        </div>
      </div>
    </div>
  );
};
