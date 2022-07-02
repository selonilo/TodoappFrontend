import React, {useState } from "react";
import { Dropdown } from "primereact/dropdown";


export default function SituationDropdown(props) {
  const { onChangeSituation, selectedSituation } = props;
  const [allSituations] = useState([
    {
      name: "Sahada Yeni",
      id: "Sahada Yeni",
    },
    {
      name: "Sahada Eski",
      id: "Sahada Eski",
    },
    {
      name: "Sahada Çok Eski",
      id: "Sahada Çok Eski",
    },
    {
      name: "Bozuk",
      id: "Bozuk",
    },
    {
      name: "Hurda",
      id: "Hurda",
    },
  ]);

  return (
    <>
      <label className="block py-1">Durum Seç</label>
      <Dropdown
        filter
        showClear
        filterBy="name"
        emptyMessage="Durum Bulunamadı"
        className="w-full my-1"
        optionLabel="name"
        value={allSituations?.find((item) => item?.id == selectedSituation?.id)}
        options={allSituations}
        onChange={onChangeSituation}
        placeholder="Durum Seç"
      />
    </>
  );
}
