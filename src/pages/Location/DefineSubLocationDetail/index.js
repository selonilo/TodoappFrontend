import React, { useState, useEffect } from "react";
import { Modal, Input, DataTable, Toast } from "../../../components";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { LocationDropdown, SubLocationDropdown } from "../components";
import { api } from "../../../services";
import moment from 'moment';
import 'moment/locale/tr';
import { Paginator } from "primereact/paginator";
 

export default function DefineSubLocationDetail() {
  const user = localStorage.getItem("loginName");
  const [allSubLocationDetail, setAllSubLocationDetail] = useState([]);

  const [visible, setVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(null);

  const [filterSubLocationDetail,setFilterSubLocationDetail] = useState();

  const [subLocationDetail, setSubLocationDetail] = useState("");

  const [selectedLocation, setSelectedLocation] = useState({
    id: null,
    name: null,
  });
  const [selectedSubLocation, setSelectedSubLocation] = useState({
    id: null,
    name: null,
    locationDto: {},
  });
  const [selectedSubLocationDetail, setSelectedSubLocationDetail] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const showModal = (selectedSubLocationDetail) => {
    setSubLocationDetail(selectedSubLocationDetail?.id ? selectedSubLocationDetail?.name : "");
    setSelectedLocation(selectedSubLocationDetail?.locationDto);
    setSelectedSubLocation(selectedSubLocationDetail?.subLocationDto);
    setSelectedSubLocationDetail(selectedSubLocationDetail?.id && selectedSubLocationDetail);
    setVisible(true);
  };

  const hideModal = () => {
    setSubmitted(false);
    setSelectedSubLocationDetail({});
    setSelectedSubLocation({});
    setSelectedLocation({});
    setSubLocationDetail({});
    setVisible(false);
  };

  const onChangeSubLocationDetail = (e) => {
    setSubLocationDetail(e.target.value);
  };

  const onChangeLocation = (e) => {
    setSelectedLocation(e?.value);
  };

  const onChangeSubLocation = (e) => {
    setSelectedSubLocation(e?.value);
  };

  const pageableSubLocationDetail = async () => {
    const { data = [], error } = await api.sublocationDetail.pageableSublocationDetail(page,size,{
      "name":filterSubLocationDetail
    });
    if (error) {
      Toast.error(error);
    }
    setAllSubLocationDetail(data?.content);
    setTotalRecords(data?.totalElements);
  };

  const onPageChange = (event) => {
    setPage(event.page);
    setSize(event.rows);
  };

  const handleSaveSubLocationDetail = async () => {
    setSubmitted(true);
    if (!subLocationDetail || !selectedLocation?.id) return;

    const params = {
      subLocationId: selectedSubLocation?.id,
      name: subLocationDetail,
      createUser: user,
      updateUser: user,
    };

    const { data = {}, error } = await api.sublocationDetail.saveSublocationDetail({ ...params });
    if (error) return Toast.error(error);

    pageableSubLocationDetail();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const handleUpdateSubLocationDetail = async () => {
    setSubmitted(true);

    if (!subLocationDetail || !selectedLocation?.id) return;

    const params = {
      id: selectedSubLocationDetail?.id,
      subLocationId: selectedSubLocation?.id,
      name: subLocationDetail,
      updateUser: user,
    };

    const { data = [], error } = await api.sublocationDetail.updateSublocationDetail({ ...params });
    if (error) return Toast.error(error);

    pageableSubLocationDetail();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const deleteSubLocationDetail = (item) => {
    confirmDialog({
      message: "Alt lokasyon detayı silmek istediğinize emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.sublocationDetail.deleteSublocationDetail(item?.id);
        if (error) return Toast.error(error);
        pageableSubLocationDetail();

        Toast.success("İşlem Başarılı");
      },
    });
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteSubLocationDetail(item)} />
      </div>
    );
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedSubLocationDetail?.id ? handleUpdateSubLocationDetail() : handleSaveSubLocationDetail();
    }
  };

  useEffect(() => {
    pageableSubLocationDetail();
  }, [page,size,filterSubLocationDetail]);

  const headerSubLocationDetail = (
    <div className="table-header">
      <div className="mb-2">
        <Input
          value={filterSubLocationDetail}
          onChange={(e) => setFilterSubLocationDetail(e?.target?.value)}
        /></div>

      <span className="pt-1">
        Alt Lokasyon Detay Adı
      </span>
    </div>
  );

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>
      <Modal header="Alt Lokasyon Detay Ekle" visible={visible} onHide={hideModal} onPress={selectedSubLocationDetail?.id ? handleUpdateSubLocationDetail : handleSaveSubLocationDetail}>
        <LocationDropdown 
        selectedLocation={selectedLocation} 
        onChangeLocation={onChangeLocation} 
        errorText={submitted && !selectedLocation?.id && "Lütfen lokasyon seçiniz"} />
        <SubLocationDropdown
          selectedSubLocation={selectedSubLocation}
          locationId={selectedLocation?.id}
          onChangeSubLocation={onChangeSubLocation}
          errorText={submitted && !selectedLocation?.id && !selectedSubLocation?.id && "Lütfen alt lokasyon seçiniz"}
        />
        <div className="py-3">
          <Input
          onKeyPress={onKeyPress}
            name="productSubDetail"
            label="Alt Lokasyon Detay Adı"
            errorText={submitted && !subLocationDetail && "Lütfen Alt Lokasyon Detay giriniz"}
            value={subLocationDetail}
            onChange={onChangeSubLocationDetail}
          />
        </div>
      </Modal>

      <DataTable data={allSubLocationDetail} sortOrder={-1} responsiveLayout="scroll">
        <Column field="name" sortable header={headerSubLocationDetail} />
        <Column field="subLocationDto.name" sortable header="Alt Lokasyon Adı" />
        <Column body={(item) => moment(item?.updatedAt).format("Do MMMM YYYY, HH:mm:ss")} sortable header="Güncellenme Tarihi" />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>

      <Paginator first={page} rows={size} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 50]} onPageChange={onPageChange}></Paginator>
    </div>
  );
}
