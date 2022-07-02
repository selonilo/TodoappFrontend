import React, { useState, useEffect } from "react";
import { Modal, Input, Toast, DataTable } from "../../../components";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { LocationDropdown } from "../components";
import { api } from "../../../services";
import moment from "moment";
import "moment/locale/tr";
import { Paginator } from "primereact/paginator";

export default function DefineSubLocation() {
  const user = localStorage.getItem("loginName");
  const [allSubLocation, setAllSubLocation] = useState([]);

  const [visible, setVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(null);

  const [filterSubLocation, setFilterSubLocation] = useState();

  const [subLocation, setSubLocation] = useState("");

  const [selectedLocation, setSelectedLocation] = useState({});
  const [selectedSubLocation, setSelectedSubLocation] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const showModal = (selectedSubLocation) => {
    setSubLocation(selectedSubLocation?.id ? selectedSubLocation?.name : "");
    setSelectedSubLocation(selectedSubLocation);
    setSelectedLocation(selectedSubLocation?.locationDto);
    setVisible(true);
  };

  const hideModal = () => {
    setSubmitted(false);
    setSelectedLocation({});
    setSelectedSubLocation({});
    setSubLocation("");
    setVisible(false);
  };

  const onChangeSubLocation = (e) => {
    setSubLocation(e.target.value);
  };

  const onChangeLocation = (e) => {
    setSelectedLocation(e?.value);
  };

  const pageableSubLocation = async () => {
    const { data = [], error } = await api.sublocation.pageableSublocation(page, size, {
      name: filterSubLocation,
    });
    if (error) {
      Toast.error(error);
    }
    setAllSubLocation(data?.content);
    setTotalRecords(data?.totalElements);
  };

  const onPageChange = (event) => {
    setPage(event.page);
    setSize(event.rows);
  };

  const handleSaveSubLocation = async () => {
    setSubmitted(true);
    if (!subLocation || !selectedLocation?.id) return;

    const params = {
      locationId: selectedLocation?.id,
      name: subLocation,
      createUser: user,
      updateUser: user,
    };

    const { data = {}, error } = await api.sublocation.saveSublocation({ ...params });
    if (error) return Toast.error(error);

    pageableSubLocation();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const handleUpdateSubLocation = async () => {
    setSubmitted(true);

    const params = {
      id: selectedSubLocation?.id,
      locationId: selectedLocation?.id,
      name: subLocation,
      updateUser: user,
    };

    const { data = [], error } = await api.sublocation.updateSublocation({ ...params });
    if (error) return Toast.error(error);

    pageableSubLocation();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const deleteSubLocation = (item) => {
    confirmDialog({
      message: "Alt lokasyonu silmek istediğinize emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.sublocation.deleteSublocation(item?.id);
        if (error) return Toast.error(error);
        pageableSubLocation();

        Toast.success("İşlem Başarılı");
      },
    });
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteSubLocation(item)} />
      </div>
    );
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedSubLocation?.id ? handleUpdateSubLocation() : handleSaveSubLocation();
    }
  };

  useEffect(() => {
    pageableSubLocation();
  }, [page, size, filterSubLocation]);

  const headerSubLocation = (
    <div className="table-header">
      <div className="mb-2">
        <Input value={filterSubLocation} onChange={(e) => setFilterSubLocation(e?.target?.value)} />
      </div>

      <span className="pt-1">Lokasyon Adı</span>
    </div>
  );

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>
      <Modal
        header={selectedSubLocation?.id ? "Alt Lokasyon Güncelle" : "Alt Lokasyon Ekle"}
        visible={visible}
        onHide={hideModal}
        onPress={selectedSubLocation?.id ? handleUpdateSubLocation : handleSaveSubLocation}
        label={selectedSubLocation?.id && "Güncelle"}
      >
        <LocationDropdown
          selectedLocation={selectedLocation}
          onChangeLocation={onChangeLocation}
          errorText={submitted && !selectedLocation?.id && "Lütfen lokasyon seçiniz"}
        />
        <div className="py-3">
          <Input
            maxLength={4}
            keyfilter="num"
            onKeyPress={onKeyPress}
            name="subLocation"
            label="Alt Lokasyon Adı"
            errorText={submitted && !subLocation && "Lütfen Alt Lokasyon giriniz"}
            value={subLocation}
            onChange={onChangeSubLocation}
          />
        </div>
      </Modal>

      <DataTable data={allSubLocation} sortOrder={-1} responsiveLayout="scroll">
        <Column field="name" sortable header={headerSubLocation} />
        <Column field="locationDto.name" sortable header="Bölge Adı" />
        <Column body={(item) => moment(item?.updatedAt).format("Do MMMM YYYY, HH:mm:ss")} header="Güncellenme Tarihi" />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>
      <Paginator
        first={page}
        rows={size}
        totalRecords={totalRecords}
        rowsPerPageOptions={[10, 20, 50]}
        onPageChange={onPageChange}
      ></Paginator>
    </div>
  );
}
