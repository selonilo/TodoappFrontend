import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useHistory, Redirect } from "react-router-dom";
import classNames from "classnames";
import { Toast } from "primereact/toast";
import logo from "../../../assets/images/logo.png";
import { api } from "../../../services/api";
import { Input, Modal } from "../../../components";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useRef(null);
  const isAuthenticated = localStorage.getItem("token");
  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [visible, setVisible] = useState(false);
  let emptyUserInfo = {
    username: "",
    nameSurname: "",
    email: "",
    password: "",
  };
  const [userInfo, setUserInfo] = useState(emptyUserInfo);



  if (isAuthenticated) return <Redirect to={"/showProducts"} />;

  const onSubmit = async () => {
    setSubmitted(true);
    if (!username || !password) return;
    setLoading(true);

    const { data = {}, error } = await api.auth.login({ username, password });

    setLoading(false);

    if (error) return Toast.error(error);

    localStorage.setItem("token", data?.token);
    localStorage.setItem("refreshToken", data?.refreshToken);

    localStorage.setItem("loginName", data?.username);
    localStorage.setItem("id",data?.id);

    history.push("/defineUser");
  };

  const enterKey = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const hideModal = () => {
    setSubmitted(false);
    setVisible(false);
  };


  const handleSaveUser = async () => {
    setSubmitted(true);
    setVisible(true);

    if (!userInfo.username || !userInfo.nameSurname || !userInfo.email || !userInfo.password) return;

    const params = {
      username: userInfo.username,
      nameSurname: userInfo.nameSurname,
      email: userInfo.email,
      role: [],
      password: userInfo.password,
    };
    const { data = [], error } = await api.user.saveUser({ ...params });
    if (error) return Toast.error(error);

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const handleUpdateUser = async () => {
    setSubmitted(true);

    if (!userInfo.username || !userInfo.nameSurname || !userInfo.email) return;

    const params = {
      id: selectedUser?.id,
      username: userInfo.username,
      nameSurname: userInfo.nameSurname,
      email: userInfo.email,
      role: [],
    };
    const { data = [], error } = await api.user.updateUser({ ...params });
    if (error) return Toast.error(error);


    Toast.success("işlem Başarılı");
    hideModal();
  };

  const showModal = (selectedUser) => {
    setUserInfo(selectedUser?.id ? { username: selectedUser?.username, nameSurname: selectedUser?.nameSurname, email: selectedUser?.email } : emptyUserInfo);
    setSelectedUser(selectedUser);
    setVisible(true);
  };



  const onChangeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedUser?.id ? handleUpdateUser() : handleSaveUser();
    }
  };


  return (
    <div className="login-body">
      <Toast ref={toast} />
      <div className="login-wrapper">
        <div className="login-panel" style={{ padding: 0 }}>
          <div onClick={() => history.push("/")} className="logo p-link" style={{ marginBottom: 10 }}>
            <img src={logo} alt="logo" style={{ width: 529, height: 229 }} />
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

          <Button label="Giriş Yap" className="p-mt-3" onClick={onSubmit} loading={loading} />
          <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />

          <Modal header={selectedUser?.id ? "Kullancı Güncelle" : "Kullanıcı Ekle"} visible={visible} onHide={hideModal} onPress={selectedUser?.id ? handleUpdateUser : handleSaveUser} label={selectedUser?.id && "Güncelle"}>
            <Input onKeyPress={onKeyPress} autoFocus name="username" label="Kullanıcı Adı" errorText={submitted && !userInfo.username && "Lütfen Kullanıcı Adı giriniz"} value={userInfo.username} onChange={onChangeUserInfo} />
            <div className="py-3">
              <Input onKeyPress={onKeyPress} name="nameSurname" label="Kullanıcı Soyadı" errorText={submitted && !userInfo.nameSurname && "Lütfen Kullanıcı Soyadı giriniz"} value={userInfo.nameSurname} onChange={onChangeUserInfo} />
            </div>
            <div className="py-3">
              <Input onKeyPress={onKeyPress} name="email" label="Kullanıcı E-Posta" errorText={submitted && !userInfo.email && "Lütfen Kullanıcı E-Posta giriniz"} value={userInfo.email} onChange={onChangeUserInfo} />
            </div>
            {!selectedUser?.id && (
              <div className="py-3">
                <Input onKeyPress={onKeyPress} name="password" label="Kullanıcı Şifresi" type="password" errorText={submitted && !userInfo.password && "Lütfen Kullanıcı Şifrenizi giriniz"} value={userInfo.password} onChange={onChangeUserInfo} />
              </div>
            )}
          </Modal>
        </div>
        <div className="login-footer">
          <h6>🅢ALIH</h6>
        </div>
      </div>
    </div>
  );
}
