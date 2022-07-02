import React, { useState, useEffect } from "react";
import { Modal, Input, Toast, DataTable } from "../../../components";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { api } from "../../../services";
import moment from "moment";
import { Paginator } from "primereact/paginator";
import { MultiSelect } from "primereact/multiselect";
import { Checkbox } from "primereact/checkbox";

export default function DefineProductGroup() {
  const user = localStorage.getItem("loginName");
  const [allProductGroup, setAllProductGroup] = useState([]);

  const [visible, setVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(null);

  const [productGroup, setProductGroup] = useState("");

  const [selectedProductGroup, setSelectedProductGroup] = useState(null);

  const [submitted, setSubmitted] = useState(false);

  const [filterProductGroup, setFilterProductGroup] = useState();
  const [selectedProductArea, setSelectedProductArea] = useState([]);

  const [allProductArea, setAllProductArea] = useState([]);
  const [calibration, setCalibration] = useState(false);

  const getAllProductArea = async () => {
    const { data = [], error } = await api.defineProductArea.getAllProductArea();
    setAllProductArea(data);
  };

  useEffect(() => {
    getAllProductArea();
  }, []);

  const showModal = (_selectedProductGroup) => {
    setProductGroup(_selectedProductGroup?.id ? _selectedProductGroup?.name : "");
    setSelectedProductGroup(_selectedProductGroup);
    setSelectedProductArea(_selectedProductGroup?.selectedProductArea);
    // setCalibration(calibration);
    setVisible(true);
  };

  const hideModal = () => {
    setProductGroup("");
    setSelectedProductGroup({});
    setSelectedProductArea([]);
    setCalibration(false);
    setSubmitted(false);
    setVisible(false);
  };

  const onChangeProductGroup = (e) => {
    setProductGroup(e?.target?.value);
  };

  const pageableProductGroup = async () => {
    const { data = [], error } = await api.productGroup.pageableProductGroup(page, size, {
      name: filterProductGroup,
    });
    if (error) {
      Toast.error(error);
    }

    setAllProductGroup(data?.content);
    setTotalRecords(data?.totalElements);
  };

  const onPageChange = (event) => {
    setPage(event.first);
    setSize(event.rows);
  };

  const handleSaveProductGroup = async () => {
    setSubmitted(true);

    if (!productGroup) return;

    const params = {
      name: productGroup?.toUpperCase(),
      createUser: user,
      updateUser: user,
      productAreaList: selectedProductArea?.map((item) => item?.id),
      calibration: calibration,
    };

    const { data = {}, error } = await api.productGroup.saveProductGroup({ ...params });
    if (error) return Toast.error(error);

    pageableProductGroup();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const handleUpdateProductGroup = async () => {
    setSubmitted(true);

    if (!productGroup) return;

    const params = {
      id: selectedProductGroup?.id,
      name: productGroup,
      createUser: user,
      updateUser: user,
      productAreaList: selectedProductArea?.map((item) => item?.id),
      calibration: calibration,
    };

    const { data = [], error } = await api.productGroup.updateProductGroup({ ...params });
    if (error) return Toast.error(error);

    pageableProductGroup();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const deleteProductGroup = (item) => {
    confirmDialog({
      message: "Bu ürün grubunu silmek istediğinize emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.productGroup.deleteProductGroup(item?.id);
        if (error) return Toast.error(error);
        pageableProductGroup();

        Toast.success("İşlem Başarılı");
      },
    });
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteProductGroup(item)} />
      </div>
    );
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedProductGroup?.id ? handleUpdateProductGroup() : handleSaveProductGroup();
    }
  };

  useEffect(() => {
    pageableProductGroup();
  }, [page, size, filterProductGroup]);

  const headerProductGroup = (
    <div className="table-header">
      <div className="mb-2">
        <Input value={filterProductGroup} onChange={(e) => setFilterProductGroup(e?.target?.value)} />
      </div>

      <span className="pt-1">Ürün Adı</span>
    </div>
  );

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>
      <Modal
        header={selectedProductGroup?.id ? "Ürün Adı Güncelle" : "Ürün Adı Ekle"}
        visible={visible}
        onHide={hideModal}
        onPress={selectedProductGroup?.id ? handleUpdateProductGroup : handleSaveProductGroup}
        label={selectedProductGroup?.id && "Güncelle"}
      >
        <MultiSelect style={{ width: "100%" }} value={selectedProductArea} options={allProductArea} onChange={(e) => setSelectedProductArea(e.value)} optionLabel="name" placeholder="Departman Seç" maxSelectedLabels={3} />
        <Input onKeyPress={onKeyPress} name="productGroup" label="Ürün Grubu Adı" errorText={submitted && !productGroup && "Lütfen Ürün Grubu giriniz"} value={productGroup} onChange={onChangeProductGroup} />
        <div className="card mt-3">
          <Checkbox inputId="binary" checked={calibration} onChange={(e) => setCalibration(e.checked)} />

          <label style={{ marginLeft: 6 }} htmlFor="binary">
            Kalibrasyon yapılacak mı ?
          </label>
        </div>
      </Modal>

      <DataTable data={allProductGroup} sortOrder={-1} responsiveLayout="scroll">
        <Column field="name" sortable header={headerProductGroup} />
        <Column body={(item) => moment(item?.createdAt).format("Do MMMM YYYY, HH:mm:ss")} header="Oluşturulma Tarihi" />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>

      <Paginator leftContent={() => <span>Toplam: {totalRecords}</span>} first={page} rows={size} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 50]} onPageChange={onPageChange}></Paginator>
    </div>
  );
}
