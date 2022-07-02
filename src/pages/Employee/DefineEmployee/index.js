import React, { useState, useEffect } from "react";
import { Modal, Input, Toast, DataTable } from "../../../components";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { api } from "../../../services";
import { Paginator } from "primereact/paginator";

export default function DefineEmployee() {
  const user = localStorage.getItem("loginName");
  const [allEmployee, setAllEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  let emptyEmployeeInfo = {
    employeeName: "",
    employeeSurname: "",
  };

  const [employeeInfo, setEmployeeInfo] = useState(emptyEmployeeInfo);

  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(null);

  const [filterName, setFilterName] = useState();
  const [filterSurname, setFilterSurname] = useState();

  const showModal = (selectedEmployee) => {
    setEmployeeInfo(selectedEmployee?.id ? { employeeName: selectedEmployee?.name, employeeSurname: selectedEmployee?.surname } : emptyEmployeeInfo);
    setSelectedEmployee(selectedEmployee);
    setVisible(true);
  };

  const hideModal = () => {
    setSubmitted(false);
    setVisible(false);
  };

  const onChangeEmployeeInfo = (e) => {
    setEmployeeInfo({ ...employeeInfo, [e.target.name]: e.target.value });
  };

  const pageableEmployee = async () => {
    const { data = [], error } = await api.employee.pageableEmployee(page, size, {
      name: filterName,
      surname: filterSurname,
    });

    if (error) {
      Toast.error(error);
    }
    setAllEmployee(data?.content);
    setTotalRecords(data?.totalElements);
  };

  useEffect(() => {
    pageableEmployee();
  }, [page, size, filterName, filterSurname]);

  const onPageChange = (event) => {
    setPage(event.first);
    setSize(event.rows);
  };

  const handleSaveEmployee = async () => {
    setSubmitted(true);

    if (!employeeInfo.employeeName || !employeeInfo.employeeSurname) return;

    const params = {
      name: employeeInfo.employeeName?.toUpperCase(),
      surname: employeeInfo.employeeSurname?.toUpperCase(),
      createUser: user,
    };
    const { data = [], error } = await api.employee.saveEmployee({ ...params });
    if (error) return Toast.error(error);

    pageableEmployee();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const handleUpdateEmployee = async () => {
    setSubmitted(true);

    if (!employeeInfo.employeeName || !employeeInfo.employeeSurname) return;

    const params = {
      id: selectedEmployee?.id,
      name: employeeInfo.employeeName,
      surname: employeeInfo.employeeSurname,
      updateUser: user,
    };
    const { data = [], error } = await api.employee.updateEmployee({ ...params });
    if (error) return Toast.error(error);

    pageableEmployee();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const deleteEmployee = (item) => {
    confirmDialog({
      message: "Bu çalışanı silmek istediğinize emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        const { data = [], error } = await api.employee.deleteEmployee(item?.id);
        if (error) return Toast.error(error);
        pageableEmployee();

        Toast.success("İşlem Başarılı");
      },
    });
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteEmployee(item)} />
      </div>
    );
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedEmployee?.id ? handleUpdateEmployee() : handleSaveEmployee();
    }
  };

  const headerName = (
    <div className="table-header">
      <div className="mb-1">
        <Input value={filterName} onChange={(e) => setFilterName(e?.target?.value)} />
      </div>

      <span>Çalışan Adı</span>
    </div>
  );

  const headerSurname = (
    <div className="table-header">
      <div className="mb-1">
        <Input value={filterSurname} onChange={(e) => setFilterSurname(e?.target?.value)} />
      </div>

      <span>Çalışan Soyadı</span>
    </div>
  );

  return (
    <div className="card">
      <div className="flex justify-content-end">
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>

      <Modal header={selectedEmployee?.id ? "Çalışan Güncelle" : "Çalışan Ekle"} visible={visible} onHide={hideModal} onPress={selectedEmployee?.id ? handleUpdateEmployee : handleSaveEmployee} label={selectedEmployee?.id && "Güncelle"}>
        <Input name="employeeName" label="Çalışan Adı" errorText={submitted && !employeeInfo?.employeeName && "Lütfen Çalışan Adı giriniz"} value={employeeInfo?.employeeName} onChange={onChangeEmployeeInfo} />
        <div className="py-3">
          <Input onKeyPress={onKeyPress} name="employeeSurname" label="Çalışan Soyadı" errorText={submitted && !employeeInfo?.employeeSurname && "Lütfen Çalışan Soyadı giriniz"} value={employeeInfo?.employeeSurname} onChange={onChangeEmployeeInfo} />
        </div>
      </Modal>

      <DataTable dataKey="id" data={allEmployee} sortOrder={-1} scrollHeight="600px" responsiveLayout="scroll">
        <Column header={headerName} field="name" sortable />
        <Column header={headerSurname} field="surname" sortable />
        <Column body={(item) => actionsTemplate(item)} />
      </DataTable>

      <Paginator leftContent={() => <span>Toplam Çalışan Sayısı: {totalRecords}</span>} first={page} rows={size} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 50]} onPageChange={onPageChange}></Paginator>
    </div>
  );
}
