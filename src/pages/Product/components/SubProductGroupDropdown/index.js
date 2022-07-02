import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";
import { Button } from "primereact/button";

export default function SubProductGroupDropdown(props) {
  const { productGroupId, onChangeSubProductGroup, selectedSubProductGroup,onClick,visible } = props;
  const [allSubProductGroups, setAllSubProductGroups] = useState([]);

  const getAllSubProductGroups = async () => {
    const { data = [], error } = await api.subProductGroup.getSubProductGroupById(productGroupId);
    setAllSubProductGroups(data);
  };

  useEffect(() => {
    if (productGroupId) {
      getAllSubProductGroups();
    }
  }, [productGroupId,visible]);

  return (
    <div className="py-3">
      <label className="block py-1">Kullanım Amacı Seç</label>
      <div className="flex">
        <Dropdown
          filter
          showClear
          filterBy="name"
          emptyMessage="Kullanım Amacı Bulunamadı"
          className="w-full my-1 mr-4"
          optionLabel="name"
          value={allSubProductGroups?.find((item) => item?.id == selectedSubProductGroup?.id)}
          options={allSubProductGroups}
          onChange={onChangeSubProductGroup}
          placeholder="Kullanım Amacı Seç"
        />
        <Button icon="pi pi-plus" className="p-button-success px-4" onClick={onClick} />
      </div>
    </div>
  );
}
