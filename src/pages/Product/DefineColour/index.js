// import { Button } from "primereact/button";
// import { Column } from "primereact/column";
// import { DataTable } from "primereact/datatable";
// import React, { useState, useEffect } from "react";
// import { Input, Modal } from "../../../components";
// import moment from "moment";
// import { api } from "../../../services";
// import { Toast } from "../../../components";
// import { confirmDialog } from "primereact/confirmdialog";

// export default function DefineColour() {
//   const user = localStorage.getItem("loginName");
//   const [allColour, setAllColour] = useState([]);

//   const [visible, setVisible] = useState(false);

//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(20);
//   const [totalRecords, setTotalRecords] = useState(null);

//   const [colour, setColour] = useState("");
//   const [selectedColour, setSelectedColour] = useState({});

//   const [submitted, setSubmitted] = useState(false);

//   const showModal = (selectedColour_) => {
//     setColour(selectedColour_?.id ? selectedColour_?.name : "");

//     setSelectedColour(selectedColour_);
//     setVisible(true);
//   };

//   const hideModal = () => {
//     setSubmitted(false);
//     setSelectedColour({});
//     setColour("");
//     setVisible(false);
//   };

//   const onChangeColour = (e) => {
//     setColour(e.target.value);
//   };

//   const getAllColour = async () => {
//     const { data = [], error } = await api.defineProductArea.getAllColour();
//     if (error) {
//       Toast.error(error);
//     }
//     setAllColour(data);
//   };

//   const handleSaveColour = async () => {
//     setSubmitted(true);

//     if (!colour) return;

//     const params = {
//       name: colour,
//       createUser: user,
//       updateUser: user,
//     };

//     const { data = {}, error } = await api.colour.saveColour({ ...params });
//     if (error) return Toast.error(error);

//     getAllColour();

//     Toast.success("İşlem Başarılı");
//     hideModal();
//   };

//   const deleteColour = (item) => {
//     confirmDialog({
//       message: "Bu rengi silmek istediğinize emin misiniz ?",
//       header: "İşlemi Onayla",
//       acceptLabel: "Evet",
//       rejectLabel: "Hayır",
//       icon: "pi pi-exclamation-triangle",
//       accept: async () => {
//         const { data = [], error } = await api.colour.deleteColour(item?.id);
//         if (error) return Toast.error(error);
//         getAllColour();

//         Toast.success("İşlem Başarılı");
//       },
//     });
//   };

//   const actionsTemplate = (item) => {
//     return (
//       <div className="flex justify-content-center">
//         <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
//         <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteColour(item)} />
//       </div>
//     );
//   };

//   const onKeyPress = (e) => {
//     if (e.key === "Enter") {
//       selectedColour?.id && handleSaveColour();
//     }
//   };

//   useEffect(() => {
//     getAllColour;
//   }, []);

//   return (
//     <div className="card">
//       <div className="flex justify-content-end">
//         <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
//       </div>
//       <Modal
//         header={selectedColour?.id && "Renk Ekle"}
//         visible={visible}
//         onHide={hideModal}
//         onPress={selectedColour?.id && handleSaveColour}
//         label={selectedColour?.id && "Güncelle"}
//       >
//         <div className="py-3">
//           <Input
//             onKeyPress={onKeyPress}
//             autoFocus
//             name="colour"
//             label="Renk"
//             errorText={submitted && !colour && "Lütfen Renk Giriniz"}
//             value={colour}
//             onChange={onChangeColour}
//           />
//         </div>
//       </Modal>

//       <DataTable data={allColour} sortOrder={-1} responsiveLayout="scroll">
//         <Column field="name" sortable header="Renk" />
//         {/* <Column field="productSubGroupDetailDto.name" sortable header="Renk" /> */}
//         <Column body={(item) => moment(item?.updatedAt).format("Do MMMM YYYY, HH:mm:ss")} sortable header="Güncellenme Tarihi" />
//         <Column body={(item) => actionsTemplate(item)} />
//       </DataTable>
//     </div>
//   );
// }
