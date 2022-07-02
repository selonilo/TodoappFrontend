import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="exception-body notfound">
      <div className="exception-wrapper">
        <div className="exception-content">
          <span>404</span>
          <span className="exception-subtitle">Sayfa Bulunamadı</span>
          <Link to="/">
            <Button className="p-p-3 p-mt-2" type="button" label="Ana sayfaya dön"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
