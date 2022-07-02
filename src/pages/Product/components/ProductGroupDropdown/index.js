import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";
import { Button } from "primereact/button";

export default function ProductGroupDropdown(props) {
  const { onChangeProductGroup, selectedProductGroup, selectedProductArea, visible, onClick } = props;
  const [allProductGroups, setAllProductGroups] = useState([]);

  const getAllProductGroup = async () => {
    const { data = [], error } = await api.productGroup.getAllProductGroup(selectedProductArea?.id);
    setAllProductGroups(data);
  };

  useEffect(() => {
    selectedProductArea?.id && getAllProductGroup();
  }, [selectedProductArea?.id, visible]);

  return (
    <>
      <label className="block py-1">Ürün Adı Seç</label>
      <div className="flex">
        <Dropdown
          filter
          showClear
          filterBy="name"
          emptyMessage="Ürün Grubu Bulunamadı"
          className="w-full my-1 mr-4"
          optionLabel="name"
          value={allProductGroups?.find((item) => item?.id == selectedProductGroup?.id)}
          options={allProductGroups}
          onChange={onChangeProductGroup}
          placeholder="Ürün Adı Seç"
        />
        <Button icon="pi pi-plus" className="p-button-success px-4" onClick={onClick} />
      </div>
    </>
  );
}
