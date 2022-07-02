import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";

export default function ProductAreaDropdown(props) {
  const { onChangeProductArea, selectedProductArea } = props;
  const [allProductArea, setAllProductArea] = useState([]);

  const getAllProductArea = async () => {
    const { data = [], error } = await api.defineProductArea.getAllProductArea();
    setAllProductArea(data);
  };

  useEffect(() => {
    getAllProductArea();
  }, []);

  return (
    <>
      <label className="block py-3">Departman Seç</label>
      <Dropdown
        filter
        showClear
        filterBy="name"
        emptyMessage="Departman Bulunamadı"
        className="w-full my-1"
        optionLabel="name"
        value={allProductArea?.find((item) => item?.id == selectedProductArea?.id)}
        options={allProductArea}
        onChange={onChangeProductArea}
        placeholder="Departman Seç"
      />
    </>
  );
}
