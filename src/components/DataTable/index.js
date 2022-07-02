import React from "react";
import { DataTable as DT } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import "./style.css";

export default function DataTable(props) {
  let _row = 0;
  const rowClass = () => {
    _row = _row + 1;
    return {
      whiteSmokeRow: _row % 2 === 0,
    };
  };

  return (
    <div className="mt-5">
      <DT emptyMessage="Kayıt Bulunamadı" className="p-datatable-responsive-demo" value={props.data} {...props} rowClassName={rowClass}>
        {props.children}
      </DT>
      {props.paginationConfig && (
        <Paginator
          rows={props.paginationConfig.itemsPerPage}
          totalRecords={props.paginationConfig.totalRecords}
          first={props.paginationConfig.first}
          rowsPerPageOptions={[10, 20, 50]}
          onPageChange={props.onActivePageChange}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="{totalRecords} kayıttan {first} - {last} arası gösteriliyor"
        />
      )}
    </div>
  );
}
