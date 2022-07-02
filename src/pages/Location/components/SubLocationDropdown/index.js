import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";
import { classNames } from "primereact/utils";

export default function SubLocationDropdown(props) {
  const { locationId, onChangeSubLocation, selectedSubLocation, errorText } = props;
  const [allSubLocation, setAllSubLocation] = useState([]);

  const getSubLocationById = async () => {
    const { data = [], error } = await api.sublocation.getSubLocationById(locationId);
    setAllSubLocation(data);
  };
  useEffect(() => {
    if (locationId) {
      getSubLocationById();
    }
  }, [locationId]);

  return (
    <>
      <label className="block py-1">Lokasyon Seç</label>
      <Dropdown
        filter
        showClear
        filterBy="name"
        emptyMessage="Lokasyon"
        className={classNames("w-full my-1", { "p-invalid": errorText })}
        optionLabel="name"
        value={allSubLocation?.find((item) => item?.id == selectedSubLocation?.id)}
        options={allSubLocation}
        onChange={onChangeSubLocation}
        placeholder="Lokasyon Seç"
      />
      {errorText && <small className="p-error block py-1">{errorText}</small>}
    </>
  );
}
