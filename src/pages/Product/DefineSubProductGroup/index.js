import React, { useState, useEffect } from "react";
import { Modal, Input, Toast, DataTable } from "../../../components";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { ProductGroupDropdown } from "../components";
import { api } from "../../../services";
import moment from "moment";
import { Paginator } from "primereact/paginator";
import AllProductGroupDropdown from "../components/AllProductGroupDropdown";

export default function DefineSubProductGroup() {
  const user = localStorage.getItem("loginName");
  const [allSubProductGroup, setAllSubProductGroup] = useState([]);

  const [visible, setVisible] = useState(false);
  const [subProductGroup, setSubProductGroup] = useState("");

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(null);

  const [filterSubProductGroup, setFilterSubProductGroup] = useState();

  const [selectedProductGroup, setSelectedProductGroup] = useState({});
  const [selectedSubProductGroup, setSelectedSubProductGroup] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const showModal = (selectedSubProductGroup) => {
    setSubProductGroup(selectedSubProductGroup?.id ? selectedSubProductGroup?.name : "");
    setSelectedSubProductGroup(selectedSubProductGroup);
    setSelectedProductGroup(selectedSubProductGroup?.productGroupDto);
    setVisible(true);
  };

  const hideModal = () => {
    setSelectedProductGroup({});
    setSelectedSubProductGroup({});
    setSubProductGroup("");

    setSubmitted(false);
    setVisible(false);
  };

  const onChangeSubProductGroup = (e) => {
    setSubProductGroup(e.target.value);
  };

  const onChangeProductGroup = (e) => {
    setSelectedProductGroup(e?.value);
  };

  const pageableSubProductGroup = async () => {
    const { data = [], error } = await api.subProductGroup.pageableSubProductGroup(page, size, {
      name: filterSubProductGroup,
    });
    if (error) {
      Toast.error(error);
    }
    setAllSubProductGroup(data?.content);
    setTotalRecords(data?.totalElements);
  };

  const handleSaveSubProductGroup = async () => {
    setSubmitted(true);
    if (!subProductGroup || !selectedProductGroup?.id) return;

    const params = {
      productGroupId: selectedProductGroup?.id,
      name: subProductGroup?.toUpperCase(),
      createUser: user,
      updateUser: user,
    };

    const { data = {}, error } = await api.subProductGroup.saveSubProductGroup({ ...params });
    if (error) return Toast.error(error);

    pageableSubProductGroup();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const onPageChange = (event) => {
    setPage(event.first);
    setSize(event.rows);
  };

  const handleUpdateSubProductGroup = async () => {
    setSubmitted(true);

    const params = {
      productGroupId: selectedProductGroup?.id,
      id: selectedSubProductGroup?.id,
      name: subProductGroup,
      updateUser: user,
    };

    const { data = [], error } = await api.subProductGroup.updateSubProductGroup({ ...params });
    if (error) return Toast.error(error);

    pageableSubProductGroup();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const deleteSubProductGroup = (item) => {
    confirmDialog({
      message: "Bu kullanım amacını silmek istediğinize emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.subProductGroup.deleteSubProductGroup(item?.id);
        if (error) return Toast.error(error);
        pageableSubProductGroup();

        Toast.success("İşlem Başarılı");
      },
    });
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteSubProductGroup(item)} />
      </div>
    );
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedSubProductGroup?.id ? handleUpdateSubProductGroup() : handleSaveSubProductGroup();
    }
  };

  useEffect(() => {
    pageableSubProductGroup();
  }, [page, size, filterSubProductGroup]);

  const headerSubProductGroup = (
    <div className="table-header">
      <div className="mb-2">
        <Input value={filterSubProductGroup} onChange={(e) => setFilterSubProductGroup(e?.target?.value)} />
      </div>

      <span className="pt-1">Kullanım Amacı</span>
    </div>
  );

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>
      <Modal
        header={selectedSubProductGroup?.id ? "Kullanım Amacı Güncelle" : "Kullanım Amacı Ekle"}
        visible={visible}
        onHide={hideModal}
        onPress={selectedSubProductGroup?.id ? handleUpdateSubProductGroup : handleSaveSubProductGroup}
        label={selectedSubProductGroup?.id && "Güncelle"}
      >
        <AllProductGroupDropdown selectedProductGroup={selectedProductGroup} onChangeProductGroup={onChangeProductGroup} errorText={submitted && !selectedProductGroup?.id && "Lütfen ürün grubu seçiniz"} />
        <div className="py-3">
          <Input onKeyPress={onKeyPress} name="subProductGroup" label="Alt Ürün Grubu Adı" errorText={submitted && !subProductGroup && "Lütfen Alt Ürün Grubu giriniz"} value={subProductGroup} onChange={onChangeSubProductGroup} />
        </div>
      </Modal>

      <DataTable data={allSubProductGroup} sortOrder={-1} responsiveLayout="scroll">
        <Column field="name" sortable header={headerSubProductGroup} />
        <Column field="productGroupDto.name" sortable header="Ürün Adı" />
        <Column body={(item) => moment(item?.updatedAt).format("Do MMMM YYYY, HH:mm:ss")} header="Güncellenme Tarihi" />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>

      <Paginator leftContent={() => <span> Toplam: {totalRecords}</span>} first={page} rows={size} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 50]} onPageChange={onPageChange}></Paginator>
    </div>
  );
}
