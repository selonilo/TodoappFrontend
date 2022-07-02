import React, { useEffect, useState } from "react";
import { Modal, Input, DataTable, Toast } from "../../../components";
import { Button } from "primereact/button";
import { api } from "../../../services";
import { confirmDialog } from "primereact/confirmdialog";
import { Column } from "primereact/column";

export default function DefineUser() {
  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  let emptyUserInfo = {
    username: "",
    nameSurname: "",
    email: "",
    password: "",
  };

  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(emptyUserInfo);
  const [submitted, setSubmitted] = useState(false);

  const showModal = (selectedUser) => {
    setUserInfo(selectedUser?.id ? { username: selectedUser?.username, nameSurname: selectedUser?.nameSurname, email: selectedUser?.email } : emptyUserInfo);
    setSelectedUser(selectedUser);
    setVisible(true);
  };

  const hideModal = () => {
    setSubmitted(false);
    setVisible(false);
  };

  const onChangeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const getAllUser = async () => {
    const { data = [], error } = await api.user.getAllUser();
    if (error) {
      Toast.error(error);
    }
    setAllUser(data);
  };

  const handleSaveUser = async () => {
    setSubmitted(true);

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

    getAllUser();

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

    getAllUser();

    Toast.success("işlem Başarılı");
    hideModal();
  };

  const deleteUser = (item) => {
    confirmDialog({
      message: "Bu kullanıcıyı silmek istediğinizden emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.user.deleteUser(item?.id);
        if (error) return Toast.error(error);
        getAllUser();

        Toast.success("işlem Başarılı");
      },
    });
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteUser(item)} />
      </div>
    );
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedUser?.id ? handleUpdateUser() : handleSaveUser();
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>
      <Modal
        header={selectedUser?.id ? "Kullancı Güncelle" : "Kullanıcı Ekle"}
        visible={visible}
        onHide={hideModal}
        onPress={selectedUser?.id ? handleUpdateUser : handleSaveUser}
        label={selectedUser?.id && "Güncelle"}
      >
        <Input
          onKeyPress={onKeyPress}
          autoFocus
          name="username"
          label="Kullanıcı Adı"
          errorText={submitted && !userInfo.username && "Lütfen Kullanıcı Adı giriniz"}
          value={userInfo.username}
          onChange={onChangeUserInfo}
        />
        <div className="py-3">
          <Input
            onKeyPress={onKeyPress}
            name="nameSurname"
            label="Kullanıcı Soyadı"
            errorText={submitted && !userInfo.nameSurname && "Lütfen Kullanıcı Soyadı giriniz"}
            value={userInfo.nameSurname}
            onChange={onChangeUserInfo}
          />
        </div>
        <div className="py-3">
          <Input
            onKeyPress={onKeyPress}
            name="email"
            label="Kullanıcı E-Posta"
            errorText={submitted && !userInfo.email && "Lütfen Kullanıcı E-Posta giriniz"}
            value={userInfo.email}
            onChange={onChangeUserInfo}
          />
        </div>
        {!selectedUser?.id && (
          <div className="py-3">
            <Input
              onKeyPress={onKeyPress}
              name="password"
              label="Kullanıcı Şifresi"
              type="password"
              errorText={submitted && !userInfo.password && "Lütfen Kullanıcı Şifrenizi giriniz"}
              value={userInfo.password}
              onChange={onChangeUserInfo}
            />
          </div>
        )}
      </Modal>

      <DataTable data={allUser} sortOrder={-1}>
        <Column field="username" sortable header="Kullanıcı Adı" />
        <Column field="nameSurname" sortable header="Kullanıcı Soyadı" />
        <Column field="email" sortable header="Kullanıcı E-Posta" />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>
    </div>
  );
}
