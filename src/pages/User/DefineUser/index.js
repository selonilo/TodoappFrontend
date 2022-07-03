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
    name: "",
  };

  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(emptyUserInfo);
  const [submitted, setSubmitted] = useState(false);

  const showModal = (selectedUser) => {
    setUserInfo(selectedUser?.id ? { name: selectedUser?.name} : emptyUserInfo);
    setSelectedUser(selectedUser)
    setVisible(true);
    console.log(allUser)
  };

  const hideModal = () => {
    setSubmitted(false);
    setVisible(false);
  };

  const onChangeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const getToDoList = async () => {
    const { data = [], error } = await api.user.getToDoList(localStorage.getItem("id"));
    if (error) {
      Toast.error(error);
    }
    setAllUser(data);
  };

  const handleSaveUser = async () => {
    setSubmitted(true);
    const params = {
      name: userInfo.name,
      userId: localStorage.getItem("id"),
    };
    console.log(selectedUser?.id)
    const { data = [], error } = await api.user.saveToDoList({ ...params });
    if (error) return Toast.error(error);

    getToDoList();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const handleUpdateUser = async () => {
    setSubmitted(true);
    const params = {
      id: selectedUser?.id,
      name: userInfo.name,
      userId: localStorage.getItem("id"),
    };
    const { data = [], error } = await api.user.updateToDoList({ ...params });
    if (error) return Toast.error(error);

    getToDoList();

    Toast.success("işlem Başarılı");
    hideModal();
  };

  const deleteUser = (item) => {
    confirmDialog({
      message: "Silmek istediğinizden emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.user.deleteToDoList(item?.id);
        if (error) return Toast.error(error);
        getToDoList();

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
    getToDoList();
  }, []);

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>
      <Modal header={selectedUser?.id ? "Yapılacak Güncelle" : "Yapılacak ekle"} visible={visible} onHide={hideModal} onPress={selectedUser?.id ? handleUpdateUser : handleSaveUser} label={selectedUser?.id && "Güncelle"}>
        <Input onKeyPress={onKeyPress} autoFocus name="name" label="Yapılacaklar" errorText={submitted && !userInfo.name && "Lütfen boş bırakmayınız."} value={userInfo.name} onChange={onChangeUserInfo} />
      </Modal>

      <DataTable data={allUser} sortOrder={-1}>
        <Column field="name" sortable header="Yapılacaklar" />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>
    </div>
  );
}
