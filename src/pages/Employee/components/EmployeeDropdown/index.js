import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";
import { Button } from "primereact/button";

export default function EmployeeDropdown(props) {
  const { onChangeEmployee, selectedEmployee, errorText,onClick } = props;
  const [allEmployees, setAllEmployees] = useState([]);

  const getAllEmployee = async () => {
    const { data = [], error } = await api.employee.getAllEmployee();

    let optionsData = [];
    optionsData.push(
      ...data?.map((item) => {
        return {
          ...item,
          name: item?.name + " " + item?.surname,
        };
      })
    );
    setAllEmployees(optionsData);
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  return (
    <>
      <label className="block py-1">Çalışan Adı Seç</label>
      <div className="flex">
        <Dropdown emptyMessage="Çalışan Bulunamadı" className="w-full my-1 mr-4" optionLabel="name" value={allEmployees?.find((item) => item?.id == selectedEmployee?.id)} options={allEmployees} onChange={onChangeEmployee} placeholder="Çalışan Adı Seç" />
        <Button icon="pi pi-plus" className="p-button-success px-4" onClick={onClick} />
      </div>

      {errorText && <small className="p-error block py-1">{errorText}</small>}
    </>
  );
}
