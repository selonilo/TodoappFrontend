import React, {useState } from "react";
import { Dropdown } from "primereact/dropdown";


export default function BarcodePlaceDropdown(props) {
  const { onChangeBarcodePlace, selectedBarcodePlace } = props;
  const [allBarcodePlace] = useState([
    {
      name: "Sol Ön Üst",
      id: "Sol Ön Üst",
    },
    {
      name: "Sağ Ön Üst",
      id: "Sağ Ön Üst",
    },
    {
      name: "Sol Ön Alt",
      id: "Sol Ön Alt",
    },
    {
      name: "Sağ Ön Alt",
      id: "Sağ Ön Alt",
    },
    {
      name: "Sağ Arka Üst",
      id: "Sağ Arka Üst",
    },
    {
      name: "Sol Arka Üst",
      id: "Sol Arka Üst",
    },
    {
      name: "Sağ Arka Alt",
      id: "Sağ Arka Alt",
    },
    {
      name: "Sol Arka Alt",
      id: "Sol Arka Alt",
    },
  ]);

  return (
    <>
      <label className="block py-1">Barkod Yer Seç</label>
      <Dropdown
        filter
        showClear
        filterBy="name"
        emptyMessage="Barkod Yer Bulunamadı"
        className="w-full my-1"
        optionLabel="name"
        value={allBarcodePlace?.find((item) => item?.id == selectedBarcodePlace?.id)}
        options={allBarcodePlace}
        onChange={onChangeBarcodePlace}
        placeholder="Barkod Yer Seç"
      />
    </>
  );
}
