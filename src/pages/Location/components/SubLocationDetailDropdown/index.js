import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { api } from "../../../../services";
import { getAllSubLocationDetail } from "../../../../services/api/paths";

export default function SubLocationDetailDropdown(props) {
  const { subLocationId, onChangeSubLocationDetail, selectedSubLocationDetail, errorText } = props;
  const [allSubLocationDetails, setAllSubLocationDetails] = useState([]);

  const getAllSubLocationDetail = async () => {
    const { data = [], error } = await api.sublocationDetail.getSubLocationDetail(subLocationId);
    setAllSubLocationDetails(data);
  };

  useEffect(() => {
    if (subLocationId) {
      getAllSubLocationDetail();
    }
  }, [subLocationId]);

  return (
    <div className="py-3">
      <label className="block py-1">Alt Lokasyon Seç</label>
      <Dropdown
        filter
        showClear
        filterBy="name"
        emptyMessage="Alt Lokasyon Bulunamadı"
        className={classNames("w-full my-1", { "p-invalid": errorText })}
        optionLabel="name"
        value={allSubLocationDetails?.find((item) => item?.id == selectedSubLocationDetail?.id)}
        options={allSubLocationDetails}
        onChange={onChangeSubLocationDetail}
        placeholder="Alt Lokasyon Seç"
      />
      {errorText && <small className="p-error block py-1">{errorText}</small>}
    </div>
  );
}
