import React, { useState, useEffect } from "react";
import { Modal, Input, Toast, DataTable } from "../../../components";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { ProductGroupDropdown, SubProductGroupDropdown } from "../components";
import { api } from "../../../services";
import moment from "moment";
import { Paginator } from "primereact/paginator";
import AllProductGroupDropdown from "../components/AllProductGroupDropdown";

export default function DefineSubProductDetail() {
  const user = localStorage.getItem("loginName");
  const [allSubProductDetail, setAllSubProductDetail] = useState([]);

  const [visible, setVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(null);

  const [filterSubProductDetail, setFilterSubProductDetail] = useState();

  const [subProductDetail, setSubProductDetail] = useState("");

  const [selectedProductGroup, setSelectedProductGroup] = useState({});
  const [selectedSubProductGroup, setSelectedSubProductGroup] = useState({});
  const [selectedSubProductDetail, setSelectedSubProductDetail] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const showModal = (selectedSubProductDetail_) => {
    setSubProductDetail(selectedSubProductDetail_?.id ? selectedSubProductDetail_?.name : "");

    setSelectedSubProductDetail(selectedSubProductDetail_);
    setSelectedProductGroup(selectedSubProductDetail_?.productGroupDto);
    setSelectedSubProductGroup(selectedSubProductDetail_?.productSubGroupDto);
    setVisible(true);
  };

  const hideModal = () => {
    setSelectedSubProductGroup({});
    setSelectedProductGroup({});
    setSelectedSubProductDetail({});
    setSubProductDetail("");

    setSubmitted(false);
    setVisible(false);
  };

  const onChangeSubProductDetail = (e) => {
    setSubProductDetail(e.target.value);
  };

  const onChangeSubProductGroup = (e) => {
    setSelectedSubProductGroup(e.value);
  };

  const onChangeProductGroup = (e) => {
    setSelectedProductGroup(e?.value);
  };

  const pageableSubProductDetail = async () => {
    const { data = [], error } = await api.subProductDetail.pageableSubProductDetail(page, size, {
      name: filterSubProductDetail,
    });
    if (error) {
      Toast.error(error);
    }
    setAllSubProductDetail(data?.content);
    setTotalRecords(data?.totalElements);
  };

  const onPageChange = (event) => {
    setPage(event.first);
    setSize(event.rows);
  };

  const handleSaveSubProductDetail = async () => {
    setSubmitted(true);
    if (!subProductDetail || !selectedProductGroup?.id) return;

    const params = {
      productSubGroupId: selectedSubProductGroup?.id,
      name: subProductDetail?.toUpperCase(),
      createUser: user,
      updateUser: user,
    };

    const { data = {}, error } = await api.subProductDetail.saveSubProductDetail({ ...params });
    if (error) return Toast.error(error);

    pageableSubProductDetail();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const handleUpdateSubProductDetail = async () => {
    setSubmitted(true);

    const params = {
      productSubGroupId: selectedSubProductGroup?.id,
      id: selectedSubProductDetail?.id,
      name: subProductDetail,
      updateUser: user,
    };

    const { data = [], error } = await api.subProductDetail.updateSubProductDetail({ ...params });
    if (error) return Toast.error(error);

    pageableSubProductDetail();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const deleteSubProductDetail = (item) => {
    confirmDialog({
      message: "Bu hammaddeyi silmek istediğinize emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.subProductDetail.deleteSubProductDetail(item?.id);
        if (error) return Toast.error(error);
        pageableSubProductDetail();

        Toast.success("İşlem Başarılı");
      },
    });
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteSubProductDetail(item)} />
      </div>
    );
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedSubProductDetail?.id ? handleUpdateSubProductDetail() : handleSaveSubProductDetail();
    }
  };

  useEffect(() => {
    pageableSubProductDetail();
  }, [page, size, filterSubProductDetail]);

  const headerSubProductDetail = (
    <div className="table-header">
      <div className="mb-2">
        <Input value={filterSubProductDetail} onChange={(e) => setFilterSubProductDetail(e?.target?.value)} />
      </div>

      <span className="pt-1">Hammadde</span>
    </div>
  );

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>
      <Modal
        header={selectedSubProductDetail?.id ? "Hammadde Güncelle" : "Hammadde Ekle"}
        visible={visible}
        onHide={hideModal}
        onPress={selectedSubProductDetail?.id ? handleUpdateSubProductDetail : handleSaveSubProductDetail}
        label={selectedSubProductDetail?.id && "Güncelle"}
      >
        <AllProductGroupDropdown selectedProductGroup={selectedProductGroup} onChangeProductGroup={onChangeProductGroup} errorText={submitted && !selectedProductGroup?.id && "Lütfen ürün grubu seçiniz"} />
        <SubProductGroupDropdown productGroupId={selectedProductGroup?.id} selectedSubProductGroup={selectedSubProductGroup} onChangeSubProductGroup={onChangeSubProductGroup} />
        <div className="py-3">
          <Input onKeyPress={onKeyPress} name="subProductDetail" label="Ürün Alt Detay Adı" errorText={submitted && !subProductDetail && "Lütfen Ürün Alt Detay giriniz"} value={subProductDetail} onChange={onChangeSubProductDetail} />
        </div>
      </Modal>

      <DataTable data={allSubProductDetail} sortOrder={-1} responsiveLayout="scroll">
        <Column field="name" sortable header={headerSubProductDetail} />
        <Column field="productSubGroupDto.name" sortable header="Kullanım Amacı" />
        <Column body={(item) => moment(item?.updatedAt).format("Do MMMM YYYY, HH:mm:ss")} header="Güncellenme Tarihi" />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>

      <Paginator leftContent={() => <span> Toplam: {totalRecords}</span>} first={page} rows={size} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 50]} onPageChange={onPageChange}></Paginator>
    </div>
  );
}
