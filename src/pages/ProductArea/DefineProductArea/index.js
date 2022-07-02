import React from "react";
import { DataTable, Modal, Toast, Input } from "../../../components";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { api } from "../../../services";
import { confirmDialog } from "primereact/confirmdialog";

export default function DefineProductArea() {
  const user = localStorage.getItem("loginName");
  const [allProductArea, setAllProductArea] = useState([]);
  const [productArea, setProductArea] = useState("");
  const [selectedProductArea, setSelectedProductArea] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [visible, setVisible] = useState(false);

  const showModal = (selectedProductArea) => {
    setProductArea(selectedProductArea?.id ? selectedProductArea?.name : "");
    setSelectedProductArea(selectedProductArea);
    setVisible(true);
  };

  const hideModal = () => {
    setProductArea("");
    setSelectedProductArea({});
    setSubmitted(false);
    setVisible(false);
  };

  const getAllProductArea = async () => {
    const { data = [], error } = await api.defineProductArea.getAllProductArea();
    if (error) {
      Toast.error(error);
    }
    setAllProductArea(data);
  };

  const handleSaveProductArea = async () => {
    setSubmitted(true);

    if (!productArea) return;

    const params = {
      name: productArea?.toUpperCase(),
      createUser: user,
      updateUser: user,
    };

    const { data = {}, error } = await api.defineProductArea.saveProductArea({ ...params });
    if (error) return Toast.error(error);

    getAllProductArea();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const deleteDefineProductArea = (item) => {
    confirmDialog({
      message: "Bu departmanı silmek istediğinizden emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.defineProductArea.deleteProductArea(item?.id);
        if (error) return Toast.error(error);
        getAllProductArea();

        Toast.success("işlem Başarılı");
      },
    });
  };

  useEffect(() => {
    getAllProductArea();
  }, []);

  const onChangeProductArea = (e) => {
    setProductArea(e?.target?.value);
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        {/* <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} /> */}
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteDefineProductArea(item)} />
      </div>
    );
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedProductArea?.id && handleSaveProductArea();
    }
  };

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>
      <Modal
        header={selectedProductArea?.id ? "Ürün Grubu Güncelle" : "Ürün Grubu Ekle"}
        visible={visible}
        onHide={hideModal}
        onPress={handleSaveProductArea}
      >
        <Input
          onKeyPress={onKeyPress}
          name="productArea"
          label="Departman"
          errorText={submitted && !productArea && "Lütfen Ürün Bölgesini giriniz"}
          value={productArea}
          onChange={onChangeProductArea}
        />
      </Modal>

      <DataTable data={allProductArea} sortOrder={-1} responsiveLayout="scroll">
        <Column field="name" sortable header={"Departman"} />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>
    </div>
  );
}
