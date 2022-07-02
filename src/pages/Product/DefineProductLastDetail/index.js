import React, { useState, useEffect } from "react";
import { Modal, Input, Toast, DataTable } from "../../../components";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { ProductGroupDropdown, SubProductDetailDropdown, SubProductGroupDropdown } from "../components";
import { api } from "../../../services";
import moment from "moment";
import { Paginator } from "primereact/paginator";
import AllProductGroupDropdown from "../components/AllProductGroupDropdown";

export default function DefineProductLastDetail() {
  const user = localStorage.getItem("loginName");
  const [allProductLastDetail, setAllProductLastDetail] = useState([]);

  const [visible, setVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(null);

  const [productLastDetail, setProductLastDetail] = useState("");

  const [selectedProductGroup, setSelectedProductGroup] = useState({});
  const [selectedSubProductGroup, setSelectedSubProductGroup] = useState({});
  const [selectedSubProductDetail, setSelectedSubProductDetail] = useState({});
  const [selectedProductLastDetail, setSelectedProductLastDetail] = useState({});

  const [filterProductLastDetail, setFilterProductLastDetail] = useState();

  const [submitted, setSubmitted] = useState(false);

  const showModal = (selectedProductLastDetail_) => {
    setProductLastDetail(selectedProductLastDetail_?.id ? selectedProductLastDetail_?.name : "");

    setSelectedProductLastDetail(selectedProductLastDetail_);
    setSelectedProductGroup(selectedProductLastDetail_?.productGroupDto);
    setSelectedSubProductGroup(selectedProductLastDetail_?.productSubGroupDto);
    setSelectedSubProductDetail(selectedProductLastDetail_?.productSubGroupDetailDto);
    setVisible(true);
  };

  const hideModal = () => {
    setSelectedProductGroup({});
    setSelectedSubProductGroup({});
    setSelectedSubProductDetail({});
    setSelectedProductLastDetail({});
    setProductLastDetail("");

    setSubmitted(false);
    setVisible(false);
  };

  // useEffect(() => {
  //   setSelectedSubProductDetail(null);
  // }, [selectedProductGroup]);

  const onChangeProductLastDetail = (e) => {
    setProductLastDetail(e.target.value);
  };

  const onChangeSubProductGroup = (e) => {
    setSelectedSubProductGroup(e.value);
  };

  const onChangeProductGroup = (e) => {
    setSelectedProductGroup(e?.value);
  };
  const onChangeSubProductDetail = (e) => {
    setSelectedSubProductDetail(e?.value);
  };

  const pageableProductLastDetail = async () => {
    const { data = [], error } = await api.productLastDetail.pageableProductLastDetail(page, size, {
      name: filterProductLastDetail,
    });
    if (error) {
      Toast.error(error);
    }
    setAllProductLastDetail(data?.content);
    setTotalRecords(data?.totalElements);
  };

  const onPageChange = (event) => {
    setPage(event.first);
    setSize(event.rows);
  };

  const handleSaveProductLastDetail = async () => {
    setSubmitted(true);
    if (!productLastDetail || !selectedProductGroup?.id) return;

    const params = {
      productSubGroupDetailId: selectedSubProductDetail?.id,
      name: productLastDetail?.toUpperCase(),
      createUser: user,
      updateUser: user,
    };

    const { data = {}, error } = await api.productLastDetail.saveProductLastDetail({ ...params });
    if (error) return Toast.error(error);

    pageableProductLastDetail();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const handleUpdateProductLastDetail = async () => {
    setSubmitted(true);

    const params = {
      productSubGroupDetailId: selectedSubProductDetail?.id,
      id: selectedProductLastDetail?.id,
      name: productLastDetail,
      updateUser: user,
    };

    const { data = [], error } = await api.productLastDetail.updateProductLastDetail({ ...params });
    if (error) return Toast.error(error);

    pageableProductLastDetail();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const deleteProductLastDetail = (item) => {
    confirmDialog({
      message: "Ürün alt son silmek istediğinize emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.productLastDetail.deleteProductLastDetail(item?.id);
        if (error) return Toast.error(error);
        pageableProductLastDetail();

        Toast.success("İşlem Başarılı");
      },
    });
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteProductLastDetail(item)} />
      </div>
    );
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedProductLastDetail?.id ? handleUpdateProductLastDetail() : handleSaveProductLastDetail();
    }
  };

  useEffect(() => {
    pageableProductLastDetail();
  }, [page, size, filterProductLastDetail]);

  const headerProductLastDetail = (
    <div className="table-header">
      <div className="mb-2">
        <Input value={filterProductLastDetail} onChange={(e) => setFilterProductLastDetail(e?.target?.value)} />
      </div>

      <span className="pt-1">Ölçü/Biçim</span>
    </div>
  );

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>
      <Modal
        header={selectedProductLastDetail?.id ? "Ölçü/Biçim güncelle" : "Ölçü/Biçim Ekle"}
        visible={visible}
        onHide={hideModal}
        onPress={selectedProductLastDetail?.id ? handleUpdateProductLastDetail : handleSaveProductLastDetail}
        label={selectedProductLastDetail?.id && "Güncelle"}
      >
        <AllProductGroupDropdown selectedProductGroup={selectedProductGroup} onChangeProductGroup={onChangeProductGroup} errorText={submitted && !selectedProductGroup?.id && "Lütfen ürün grubu seçiniz"} />
        <SubProductGroupDropdown productGroupId={selectedProductGroup?.id} selectedSubProductGroup={selectedSubProductGroup} onChangeSubProductGroup={onChangeSubProductGroup} />
        <SubProductDetailDropdown subProductGroupId={selectedSubProductGroup?.id} selectedSubProductDetail={selectedSubProductDetail} onChangeSubProductDetail={onChangeSubProductDetail} />
        <div className="py-3">
          <Input onKeyPress={onKeyPress} name="subProductDetail" label="Ürün Alt Son Adı" errorText={submitted && !productLastDetail && "Lütfen Ürün Alt Son giriniz"} value={productLastDetail} onChange={onChangeProductLastDetail} />
        </div>
      </Modal>

      <DataTable data={allProductLastDetail} sortOrder={-1} responsiveLayout="scroll">
        <Column field="name" sortable header={headerProductLastDetail} />
        <Column field="productSubGroupDetailDto.name" sortable header="Hammadde" />
        <Column body={(item) => moment(item?.updatedAt).format("Do MMMM YYYY, HH:mm:ss")} sortable header="Güncellenme Tarihi" />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>

      <Paginator leftContent={() => <span>Toplam: {totalRecords}</span>} first={page} rows={size} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 50]} onPageChange={onPageChange}></Paginator>
    </div>
  );
}
