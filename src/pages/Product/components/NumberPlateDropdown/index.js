import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";

export default function NumberPlateDropdown(props) {
  const { onChangeNumberPlate, selectedNumberPlate } = props;
  const [allNumberPlate, setAllNumberPlate] = useState([]);

  const getAllNumberPlate = async () => {
    const { data = [], error } = await api.numberPlate.getAllNumberPlate();
    setAllNumberPlate(data);
  };

  useEffect(() => {
    getAllNumberPlate();
  }, []);

  return (
    <>
      <label className="block py-1">Plaka Seç</label>
      <Dropdown
        filter
        showClear
        filterBy="name"
        emptyMessage="Plaka Bulunamadı"
        className="w-full my-1"
        optionLabel="name"
        value={allNumberPlate?.find((item) => item?.id == selectedNumberPlate?.id)}
        options={allNumberPlate}
        onChange={onChangeNumberPlate}
        placeholder="Plaka Seç"
      />
    </>
  );
}
