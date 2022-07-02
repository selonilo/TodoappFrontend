import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";

export default function ColourDropdown(props) {
  const { onChangeColour, selectedColour } = props;
  const [allColours, setAllColours] = useState([]);

  const getAllColour = async () => {
    const { data = [], error } = await api.colour.getAllColour();
    setAllColours(data);
  };

  useEffect(() => {
    getAllColour();
  }, []);

  return (
    <>
      <label className="block py-1">Renk Seç</label>
      <Dropdown
        filter
        showClear
        filterBy="name"
        emptyMessage="Renk Bulunamadı"
        className="w-full my-1"
        optionLabel="name"
        value={allColours?.find((item) => item?.id == selectedColour?.id)}
        options={allColours}
        onChange={onChangeColour}
        placeholder="Renk Seç"
      />
    </>
  );
}
