import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";

export default function AllProductGroupDropdown(props) {
  const { onChangeProductGroup, selectedProductGroup, selectedProductArea } = props;
  const [allProductGroups, setAllProductGroups] = useState([]);

  const getAllProductGroup = async () => {
    const { data = [], error } = await api.productGroup.getAllProductGroupList();
    setAllProductGroups(data);
  };

  useEffect(() => {
    getAllProductGroup();
  }, []);

  return (
    <>
      <label className="block py-1">Ürün Adı Seç</label>
      <Dropdown
        filter
        showClear
        filterBy="name"
        emptyMessage="Ürün Grubu Bulunamadı"
        className="w-full my-1"
        optionLabel="name"
        value={allProductGroups?.find((item) => item?.id == selectedProductGroup?.id)}
        options={allProductGroups}
        onChange={onChangeProductGroup}
        placeholder="Ürün Adı Seç"
      />
    </>
  );
}
