import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useHistory, Redirect } from "react-router-dom";
import classNames from "classnames";
import { Toast } from "primereact/toast";
import logo from "../../../assets/images/logo.png";
import { api } from "../../../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useRef(null);
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) return <Redirect to={"/showProducts"} />;

  const onSubmit = async () => {
    setSubmitted(true);
    if(!username || !password ) return;
    setLoading(true);

    const { data ={}, error } = await (api.auth.login) ({username, password});

    setLoading(false);

    if(error) return Toast.error(error);

    localStorage.setItem("token", data?.token);
    localStorage.setItem("refreshToken", data?.refreshToken);

    localStorage.setItem("loginName",data?.username);
    
    history.push("/showProducts");
  };

  const enterKey = (e) => {
    if(e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="login-body">
      <Toast ref={toast} />
      <div className="login-wrapper">
        <div className="login-panel" style={{ padding: 0 }}>
          <div onClick={() => history.push("/")} className="logo p-link" style={{ marginBottom: 10 }}>
            <img src={logo} alt="logo" style={{ width: 200, height: 200 }} />
          </div>

          <InputText
            onKeyPress={enterKey}
            placeholder="Kullanıcı Adı"
            id="username2"
            aria-describedby="username2-help"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !username,
            })}
          />
          {!username && submitted && (
            <small className="p-error" style={{ marginBlockEnd: 5 }}>
              Kullanıcı adı boş olamaz
            </small>
          )}

          <InputText
            onKeyPress={enterKey}
            placeholder="Şifre"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={classNames({
              "p-invalid": submitted && !password,
            })}
          />
          {!password && submitted && (
            <small className="p-error" style={{ marginBlockEnd: 5 }}>
              Şifre boş olamaz
            </small>
          )}

          <Button
            label="Giriş Yap"
            className="p-mt-3"
            onClick={onSubmit}
            loading={loading}
          />
        </div>
        <div className="login-footer">
          <h6>Ⓒ CMV</h6>
        </div>
      </div>
    </div>
  );
}
