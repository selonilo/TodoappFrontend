import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { api } from "../../../../services";
import { Button } from "primereact/button";

export default function ProductLastDetailsDropdown(props) {
  const { subProductDetailId, onChangeProductLastDetail, selectedProductLastDetail,onClick,visible } = props;
  const [allProductLastDetails, setAllProductLastDetails] = useState([]);

  const getAllProductLastDetail = async () => {
    const { data = [], error } = await api.productLastDetail.getProductLastDetail(subProductDetailId);
    setAllProductLastDetails(data);
  };

  useEffect(() => {
    if (subProductDetailId) {
      getAllProductLastDetail();
    }
  }, [subProductDetailId,visible]);

  return (
    <div className="py-3">
      <label className="block py-1">Ölçü/Biçim Seç</label>
      <div className="flex">
        <Dropdown
          filter
          showClear
          filterBy="name"
          emptyMessage="Ölçü/Biçim Bulunamadı"
          className="w-full my-1 mr-4"
          optionLabel="name"
          value={allProductLastDetails?.find((item) => item?.id == selectedProductLastDetail?.id)}
          options={allProductLastDetails}
          onChange={onChangeProductLastDetail}
          placeholder="Ölçü/Biçim Seç"
        />
        <Button icon="pi pi-plus" className="p-button-success px-4" onClick={onClick} />
      </div>
    </div>
  );
}
