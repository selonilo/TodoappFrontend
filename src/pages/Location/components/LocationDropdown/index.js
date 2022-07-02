import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";
import { classNames } from "primereact/utils";

export default function LocationDropdown(props) {
  const { onChangeLocation, selectedLocation, errorText } = props;
  const [allLocation, setAllLocation] = useState([]);

  const getAllLocation = async () => {
    // eslint-disable-next-line
    const { data = [], error } = await api.location.getAllLocation();
    setAllLocation(data);
  };

  useEffect(() => {
    getAllLocation();
  }, []);

  return (
    <div className="py-3">
      <label className="block py-1">Bölge Seç</label>
      <Dropdown
        filter
        showClear
        filterBy="name"
        emptyMessage="Bölge Bulunamadı"
        className={classNames("w-full my-1", { "p-invalid": errorText })}
        optionLabel="name"
        value={allLocation?.find((item) => item?.id == selectedLocation?.id)}
        options={allLocation}
        onChange={onChangeLocation}
        placeholder="Bölge Seç"
      />
      {errorText && <small className="p-error block py-1">{errorText}</small>}
    </div>
  );
}
