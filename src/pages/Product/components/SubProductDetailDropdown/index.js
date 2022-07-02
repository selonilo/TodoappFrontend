import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";
import { Button } from "primereact/button";

export default function SubProductDetailDropdown(props) {
  const { subProductGroupId, onChangeSubProductDetail, selectedSubProductDetail,onClick,visible } = props;
  const [allSubProductDetails, setAllSubProductDetails] = useState([]);

  const getAllSubProductDetail = async () => {
    const { data = [], error } = await api.productLastDetail.getProductLastDetailById(subProductGroupId);
    setAllSubProductDetails(data);
  };

  useEffect(() => {
    if (subProductGroupId) {
      getAllSubProductDetail();
    }
  }, [subProductGroupId,visible]);

  return (
    <>
      <label className="block py-1">Hammadde Seç</label>
      <div className="flex">
        <Dropdown
          filter
          showClear
          filterBy="name"
          emptyMessage="Hammade Bulunamadı"
          className="w-full my-1 mr-4"
          optionLabel="name"
          value={allSubProductDetails?.find((item) => item?.id == selectedSubProductDetail?.id)}
          options={allSubProductDetails}
          onChange={onChangeSubProductDetail}
          placeholder="Hammade Seç"
        />
        <Button icon="pi pi-plus" className="p-button-success px-4" onClick={onClick} />
      </div>
    </>
  );
}
