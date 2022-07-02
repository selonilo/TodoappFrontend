import React, { useState, useEffect, useRef } from "react";
import { Modal, Input, Toast, DataTable } from "../../../components";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { api } from "../../../services";
import moment from "moment";
import { Paginator } from "primereact/paginator";

export default function DefineLocation() {
  const user = localStorage.getItem("loginName");
  const [allLocation, setAllLocation] = useState([]);

  const [visible, setVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(null);

  const [filterLocation, setFilterLocation] = useState();

  const [location, setLocation] = useState("");

  const [selectedLocation, setSelectLocation] = useState(null);

  const [submitted, setSubmitted] = useState(false);

  const showModal = (selectedLocation) => {
    setLocation(selectedLocation?.id ? selectedLocation?.name : "");
    setSelectLocation(selectedLocation);
    setVisible(true);
  };

  const hideModal = () => {
    setSubmitted(false);
    setSelectLocation({});
    setLocation("");
    setVisible(false);
  };

  const onChangeLocation = (e) => {
    setLocation(e?.target?.value);
  };

  const pageableLocation = async () => {
    const { data = [], error } = await api.location.pageableLocation(page, size, {
      name: filterLocation,
    });
    if (error) {
      Toast.error(error);
    }

    setAllLocation(data?.content);
    setTotalRecords(data?.totalElements);
  };

  const onPageChange = (event) => {
    setPage(event.first);
    setSize(event.rows);
  };


  const handleSaveLocation = async () => {
    setSubmitted(true);

    if (!location) return;
    

    const params = {
      name: location?.toUpperCase(),
      createUser: user,
      updateUser: user,
    };

    const { data = {}, error } = await api.location.saveLocation({ ...params });
    if (error) return Toast.error(error);

    pageableLocation();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const handleUpdateLocation = async () => {
    setSubmitted(true);

    if (!location) return;

    const params = {
      id: selectedLocation?.id,
      name: location,
      updateUser: user,
    };
    const { data = [], error } = await api.location.updateLocation({ ...params });
    if (error) return Toast.error(error);

    pageableLocation();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const deleteLocation = (item) => {
    confirmDialog({
      message: "Bu lokasyonu silmek istediğinize emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.location.deleteLocation(item?.id);
        if (error) return Toast.error(error);
        pageableLocation();

        Toast.success("İşlem Başarılı");
      },
    });
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteLocation(item)} />
      </div>
    );
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedLocation?.id ? handleUpdateLocation() : handleSaveLocation();
    }
  };
  useEffect(() => {
    pageableLocation();
  }, [page, size, filterLocation]);

  const headerLocation = (
    <div className="table-header">
      <div className="mb-2">
        <Input value={filterLocation} onChange={(e) => setFilterLocation(e?.target?.value)} />
      </div>

      <span className="pt-1">Bölge Adı</span>
    </div>
  );

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>

      <Modal
        header={selectedLocation?.id ? "Lokasyon Güncelle" : "Lokasyon Ekle"}
        visible={visible}
        onHide={hideModal}
        onPress={selectedLocation?.id ? handleUpdateLocation : handleSaveLocation}
        label={selectedLocation?.id && "Güncelle"}
      >
        <Input
          onKeyPress={onKeyPress}
          autoFocus
          name="location"
          label="Lokasyon Adı"
          errorText={submitted && !location && "Lütfen Lokasyon giriniz"}
          value={location}
          onChange={onChangeLocation}
        />
      </Modal>

      <DataTable data={allLocation} sortOrder={-1} responsiveLayout="scroll">
        <Column field="name" sortable header={headerLocation} />
        <Column body={(item) => moment(item?.createdAt).format("Do MMMM YYYY, HH:mm:ss")}  header="Oluşturulma Tarihi" />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>

      <Paginator
        leftContent={() => <span> Toplam Bölge Sayısı: {totalRecords} </span>}
        first={page}
        rows={size}
        totalRecords={totalRecords}
        rowsPerPageOptions={[10, 20, 50]}
        onPageChange={onPageChange}
      ></Paginator>
    </div>
  );
}
