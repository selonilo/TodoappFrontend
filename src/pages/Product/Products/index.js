import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { api } from "../../../services";
import { DataTable, Modal, Input, Toast } from "../../../components";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { saveAs } from "file-saver";
import moment from "moment";
import { Sidebar } from "primereact/sidebar";
import { Paginator } from "primereact/paginator";
import DatePicker from "../../../components/DatePicker";
import { Checkbox } from "primereact/checkbox";

export default function Products() {
  const user = localStorage.getItem("loginName");
  const [allProduct, setAllProduct] = useState([]);

  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSubLocation, setSelectedSubLocation] = useState("");
  const [selectedProductBarcode, setSelectedProductBarcode] = useState("");
  const [selectedProductArea, setSelectedProductArea] = useState("");
  const [selectedProductGroup, setSelectedProductGroup] = useState("");
  const [selectedSubProductGroup, setSelectedSubProductGroup] = useState("");
  const [selectedSubProductDetail, setSelectedSubProductDetail] = useState("");
  const [selectedProductLastDetail, setSelectedProductLastDetail] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [selectedBarcodePlace, setSelectedBarcodePlace] = useState("");
  const [selectedSituation, setSelectedSituation] = useState("");
  const [selectedNumberPlate, setSelectedNumberPlate] = useState("");
  const [selectedDeviceSerialNumber, setSelectedDeviceSerialNumber] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [selectedScreenSize, setSelectedScreenSize] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedWarrantyStartDate, setSelectedWarrantyStartDate] = useState(undefined);
  const [selectedWarrantyEndDate, setSelectedWarrantyEndDate] = useState(undefined);
  const [selectedFirstPeriodicMaintenanceDate, setSelectedFirstPeriodicMaintenanceDate] = useState(undefined);
  const [selectedDescriptions, setSelectedDescriptions] = useState("");

  const [selectedProduct, setSelectedProduct] = useState("null");

  const [selectedEmployee, setSelectedEmployee] = useState({});

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(null);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [filterProductArea, setFilterProductArea] = useState();
  const [filterProductGroup, setFilterProductGroup] = useState();
  const [filterSubProductGroup, setFilterSubProductGroup] = useState();
  const [filterSubProductDetail, setFilterSubProductDetail] = useState();
  const [filterProductLastDetail, setFilterProductLastDetail] = useState();
  const [filterLocation, setFilterLocation] = useState();
  const [filterLocations, setFilterLocations] = useState("");
  const [filterSubLocation, setFilterSubLocation] = useState();
  const [filterEmployeeName, setFilterEmployeeName] = useState();
  const [filterProductBarcode, setFilterProductBarcode] = useState();
  const [filterColour, setFilterColour] = useState();

  const [selectedLocations, setSelectedLocations] = useState("");
  const [selectedPower, setSelectedPower] = useState();
  const [selectedBatteryChangeDate, setSelectedBatteryChangeDate] = useState(undefined);
  const [selectedWarranty, setSelectedWarranty] = useState();
  const [selectedCalibrationDate, setSelectedCalibrationDate] = useState();
  const [selectedWarrantyPeriod, setSelectedWarrantyPeriod] = useState();
  const [calibration, setCalibration] = useState(false);
  const [checked, setChecked] = useState(false);

  let emptyProductBarcode = {
    productBarcode: "",
    oldBarcode: "",
    sapCode: "",
  };

  const [productBarcode, setProductBarcode] = useState(emptyProductBarcode);

  const showModal = (_selectedProduct) => {
    const { productBarcode = "" } = _selectedProduct;

    setProductBarcode(_selectedProduct?.id ? { productBarcode } : { ...emptyProductBarcode });

    setSelectedProduct(_selectedProduct);
    console.log(_selectedProduct);

    if (_selectedProduct?.id) {
      setSelectedProductGroup(_selectedProduct?.productGroup);
      setSelectedSubProductGroup(_selectedProduct?.productSubGroup);
      setSelectedSubProductDetail(_selectedProduct?.productSubGroupDetail);
      setSelectedProductLastDetail(_selectedProduct?.productLastDetail);
      setSelectedLocation(_selectedProduct?.location);
      setSelectedSubLocation(_selectedProduct?.subLocation);
      setSelectedProductBarcode(_selectedProduct?.productBarcode);
      setSelectedProductArea(_selectedProduct?.productArea);
      setCalibration(_selectedProduct?.calibration);
      setSelectedCalibrationDate(_selectedProduct?.calibrationDate ? _selectedProduct?.calibrationDate : undefined);
      setSelectedDeviceSerialNumber(_selectedProduct?.deviceSerialNo);
      setSelectedBrand(_selectedProduct?.brand);
      setSelectedModel(_selectedProduct?.model);
      setSelectedPower(_selectedProduct?.power);
      setSelectedScreenSize(_selectedProduct?.screenSize);
      setSelectedOperator(_selectedProduct?.worker);
      setSelectedWarrantyStartDate(_selectedProduct?.warrantyStartDate ? _selectedProduct?.warrantyStartDate : undefined);
      setSelectedWarrantyEndDate(_selectedProduct?.warrantyEndDate ? _selectedProduct?.warrantyEndDate : undefined);
      setSelectedFirstPeriodicMaintenanceDate(_selectedProduct?.firstPeriodicMaintenanceDate ? _selectedProduct?.firstPeriodicMaintenanceDate : undefined);
      setSelectedDescriptions(_selectedProduct?.descriptions);
      setChecked(_selectedProduct?.isOptional);
      setSelectedNumberPlate(_selectedProduct?.numberPlate);
      setSelectedColour(_selectedProduct?.colour);
      setSelectedSituation(_selectedProduct?.situation);
      setSelectedBarcodePlace(_selectedProduct?.barcodePlace);
    }

    setVisible(true);
  };

  const hideModal = () => {
    setSelectedProductGroup({});
    setSelectedSubProductGroup({});
    setSelectedSubProductDetail({});
    setSelectedProduct({});
    setSelectedLocation("");
    setSelectedSubLocation({});
    setSelectedEmployee({});
    setSelectedProductArea({});
    setSelectedColour({ id: 349, name: "beyaz" });
    setSelectedBarcodePlace({ name: "Sol Ön Üst" });
    setSelectedSituation({ name: "Sahada Yeni" });
    setCalibration("");
    setSelectedLocations("");
    setSelectedCalibrationDate(undefined);
    setSelectedDeviceSerialNumber("");
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedPower("");
    setSelectedScreenSize("");
    setSelectedOperator("");
    setSelectedWarrantyStartDate(undefined);
    setSelectedWarrantyEndDate(undefined);
    setSelectedFirstPeriodicMaintenanceDate(undefined);
    setSelectedDescriptions("");
    setSelectedNumberPlate({});
    setSubmitted(false);
    setVisible(false);
  };



  const onChangeWarrantyStartDate = (e) => {
    setSelectedWarrantyStartDate(e?._d);
  };

  const onChangeWarrantyEndDate = (e) => {
    setSelectedWarrantyEndDate(e?._d);
  };

  const onChangeFirstPeriodicMaintenance = (e) => {
    setSelectedFirstPeriodicMaintenanceDate(e?._d);
  };

  const imageBodyTemplate = (item) => {
    if (!item?.dynamicPath) return;
    return <Image src={`https://api-sayim.cmvteknoloji.com/api/public/product/image?dynamicPath=${item?.dynamicPath}`} width="80" preview />;
  };

  const pageableProduct = async () => {
    const { data = [], error } = await api.products.pageableProduct(page, size, {
      // location: filterLocation,
      // productArea: filterProductArea,
      // productGroup: filterProductGroup,
      // productSubGroup: filterSubProductGroup,
      // productSubGroupDetail: filterSubProductDetail,
      // productLastDetail: filterProductLastDetail,
      // worker: filterEmployeeName,
      // productBarcode: filterProductBarcode,
      // locations: filterLocations,
      productBarcode: filterProductBarcode,
      productGroup: filterProductGroup,
      productSubGroup: filterSubProductGroup,
      productSubGroupDetail: filterSubProductDetail,
      productLastDetail: filterProductLastDetail,
      location: filterLocation,
      subLocation: filterSubLocation,
      worker: filterEmployeeName,
      productArea: filterProductArea,
      colour: filterColour,
    });
    if (error) {
      Toast.error(error);
    }

    setAllProduct(data?.content);
    setTotalRecords(data?.totalElements);
  };

  const onPageChange = (event) => {
    setPage(event.first);
    setSize(event.rows);
  };

  useEffect(() => {
    pageableProduct();
  }, [page, size, filterProductGroup, filterSubProductGroup, filterSubProductDetail, filterProductLastDetail, filterLocation, filterLocations, filterEmployeeName, filterProductBarcode, filterProductArea]);

  const clearFilter = () => {
    setFilterProductGroup("");
    setFilterSubProductGroup("");
    setFilterSubProductDetail("");
    setFilterProductLastDetail("");
    setFilterLocation("");
    setFilterLocations("");
    setFilterSubLocation("");
    setFilterEmployeeName("");
    setFilterProductBarcode("");
  };

  const handleSaveProduct = async () => {
    setSubmitted(true);

    if (!productBarcode.productBarcode) return;

    if (Number(productBarcode.productBarcode) < 100000 || Number(productBarcode.productBarcode) > 200000) {
      if (Number(productBarcode.productBarcode) < 500000 || Number(productBarcode.productBarcode) > 530000) {
        return Toast.warning("Barkod 100000 - 199999 arasında yada 500000 - 519999 olmalıdır");
      }
    }

    const params = {
      productBarcode: selectedProductBarcode,
      productGroup: selectedProductGroup,
      productSubGroup: selectedSubProductGroup,
      productSubGroupDetail: selectedSubProductDetail,
      productLastDetail: selectedProductLastDetail,
      location: selectedLocation,
      sublocation: selectedSubLocation,
      worker: selectedOperator,
      productArea: selectedProductArea,
      createUser: user,
      updateUser: user,
      colourId: selectedColour?.id,
      barcodePlace: selectedBarcodePlace?.name,
      situation: selectedSituation?.name,
      deviceSerialNo: checked ? selectedDeviceSerialNumber : null,
      brand: checked ? selectedBrand : null,
      model: checked ? selectedModel : null,
      capacity: checked ? selectedPower : null,
      screenSize: checked ? selectedScreenSize : null,
      warrantyStartDate: checked ? selectedWarrantyStartDate : null,
      warrantyEndDate: checked ? selectedWarrantyEndDate : null,
      operator: checked ? selectedOperator : null,
      calibration: calibration,
      calibrationDate: calibration ? selectedCalibrationDate : null,
      firstPeriodicMaintenanceDate: checked ? selectedFirstPeriodicMaintenanceDate : null,
      descriptions: checked ? selectedDescriptions : null,
      isOptional: checked,
      numberPlateId: checked ? selectedNumberPlate?.id : null,
      workerId: selectedEmployee?.id,
    };

    // eslint-disable-next-line
    const { data = [], error } = await api.products.saveProduct({ ...params });
    if (error) return Toast.error(error);

    pageableProduct();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const handleUpdateProduct = async () => {
    setSubmitted(true);

    if (!productBarcode.productBarcode) return;

    const params = {
      id: selectedProduct?.id,
      productBarcode: productBarcode?.productBarcode,
      locationId: selectedLocation?.id,
      locations: selectedLocations,
      productGroupId: selectedProductGroup?.id,
      productSubGroupId: selectedSubProductGroup?.id,
      productSubGroupDetailId: selectedSubProductDetail?.id,
      productLastDetailId: selectedProductLastDetail?.id,
      updateUser: user,
      productAreaId: selectedProductArea?.id,
      dynamicPath: selectedProduct?.dynamicPath,
      fileType: selectedProduct?.fileType,
      basePath: selectedProduct?.basePath,
      colourId: selectedColour?.id,
      barcodePlace: selectedBarcodePlace?.name,
      situation: selectedSituation?.name,
      deviceSerialNo: checked ? selectedDeviceSerialNumber : null,
      brand: checked ? selectedBrand : null,
      model: checked ? selectedModel : null,
      capacity: checked ? selectedPower : null,
      screenSize: checked ? selectedScreenSize : null,
      warrantyStartDate: checked ? selectedWarrantyStartDate : null,
      warrantyEndDate: checked ? selectedWarrantyEndDate : null,
      operator: checked ? selectedOperator : null,
      calibration: calibration,
      calibrationDate: calibration ? selectedCalibrationDate : null,
      firstPeriodicMaintenanceDate: checked ? selectedFirstPeriodicMaintenanceDate : null,
      descriptions: checked ? selectedDescriptions : null,
      isOptional: checked,
      numberPlateId: checked ? selectedNumberPlate?.id : null,
      workerId: selectedEmployee?.id,
    };

    // eslint-disable-next-line
    const { data = [], error } = await api.products.updateProduct({ ...params });
    if (error) return Toast.error(error);

    pageableProduct();

    Toast.success("İşlem Başarılı");
    hideModal();
  };

  const deleteProduct = (item) => {
    confirmDialog({
      message: "Bu ürün grubunu silmek istediğinize emin misiniz ?",
      header: "İşlemi Onayla",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        // eslint-disable-next-line
        const { data = [], error } = await api.products.deleteProduct(item?.id);
        if (error) return Toast.error(error);
        pageableProduct();

        Toast.success("İşlem Başarılı");
      },
    });
  };

  const actionsTemplate = (item) => {
    return (
      <div className="flex justify-content-center">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => showModal(item)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteProduct(item)} />
      </div>
    );
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      selectedProduct?.id ? handleUpdateProduct() : handleSaveProduct();
    }
  };

  const exportExcel = async () => {
    let excel = [];

    setExcelLoading(true);

    const { data = {}, error } = await api.products.getAllProduct();
    setExcelLoading(false);

    if (error) return Toast.error(error);

    await excel.push(
      ...data.map((item) => {
        return {
          Bölge: item?.locationDto?.name,
          Lokasyon: item?.locations,
          Barkod: item?.productBarcode,
          Departman: item?.productAreaDto?.name,
          "Ürün Adı": item?.productGroupDto?.name,
          "Kullanım Amacı": item?.productSubGroupDto?.name,
          Hammadde: item?.productSubGroupDetailDto?.name,
          "Ölçü/Biçim": item?.productLastDetailDto?.name,
          Renk: item?.colourDto?.name,
          "Barkod Yer": item?.barcodePlace,
          Durum: item?.situation,
          "Kalibrasyon var mı ?": item?.calibration ? "Evet" : "Hayır",
          "Kalibrasyon Tarihi": item?.calibrationDate ? moment(item?.calibrationDate).format("Do MMMM YYYY, HH:mm:ss") : "-",
          Plaka: item?.numberPlateDto?.name ? item?.numberPlateDto?.name : "-",
          "Cihaz Seri No": item?.deviceSerialNo ? item?.deviceSerialNo : "-",
          Marka: item?.brand ? item?.brand : "-",
          Model: item?.model ? item?.model : "-",
          "Kapasite/Güç": item?.capacity ? item?.capacity : "-",
          Boyut: item?.screenSize ? item?.screenSize : "-",
          Kullanıcı: item?.workerDto?.name ? item?.workerDto?.name + " " + item?.workerDto?.surname : "-",
          "Garanti Başlangıç Tarihi": item?.warrantyStartDate ? moment(item?.warrantyStartDate).format("Do MMMM YYYY, HH:mm:ss") : "-",
          "Garanti Bitiş Tarihi": item?.warrantyEndDate ? moment(item?.warrantyEndDate).format("Do MMMM YYYY, HH:mm:ss") : "-",
          "İlk Periyodik Bakım Tarihi": item?.firstPeriodicMaintenanceDate ? moment(item?.firstPeriodicMaintenanceDate).format("Do MMMM YYYY, HH:mm:ss") : "-",
          Açıklama: item?.descriptions ? item?.descriptions : "-",
        };
      })
    );

    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(excel);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "Ürün Raporu");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((FileSaver) => {
      let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      saveAs(data, fileName + " - " + moment(new Date()).format("Do MMMM YYYY") + EXCEL_EXTENSION);
    });
  };
  console.log(selectedLocation);

  return (
    <div className="card">
      <div className="flex justify-content-between">
        <div className="flex justify-content-end mt-3">
          <Button loading={excelLoading} label="Dışa Aktar" type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success" data-pr-tooltip="Ürün Raporu" />
          <Button
            className="ml-2 p-button-warning"
            label=""
            icon="pi pi-filter"
            onClick={() => {
              setSidebarVisible(true);
              setPage(0);
              // setSize(50);
            }}
          />
        </div>
        <Button label="Yeni" icon="pi pi-plus" className="p-button-success" onClick={showModal} />
      </div>

      <Modal header={selectedProduct?.id ? "Ürün Güncelle" : "Yeni Ürün Ükle"} visible={visible} onHide={hideModal} onPress={selectedProduct?.id ? handleUpdateProduct : handleSaveProduct} label={selectedProduct?.id && "Güncelle"}>
        <div className="card">
          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="location" label="Bölge" value={selectedLocation} onChange={(e)=> setSelectedLocation(e.target.value)} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="subLocation" label="Lokasyon" maxLength={4} keyfilter="num" value={selectedSubLocation} onChange={(e)=> setSelectedSubLocation(e.target.value)} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="productBarcode" label="Barkod" maxLength={4} keyfilter="num" value={selectedProductBarcode} onChange={"onChangeProductBarcode"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="productArea" label="Departman" value={selectedProductArea} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="productGroup" label="Ürün Adı" value={selectedProductGroup} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="productSubGroup" label="Kullanım Amacı" value={selectedSubProductGroup} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="productSubGroupDetail" label="Hammadde" value={selectedSubProductDetail} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="productLastDetail" label="Ölçü/Biçim" value={selectedProductLastDetail} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="colour" label="Renk" value={selectedColour} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="barcodePlace" label="Barkod Yer" value={selectedBarcodePlace} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="situation" label="Durum" value={selectedSituation} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="numberPlate" label="Plaka" value={selectedNumberPlate} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="deviceSerialNo" label="Cihaz Seri No" value={selectedDeviceSerialNumber} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="brand" label="Marka" value={selectedBrand} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="model" label="Model" value={selectedModel} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="capacity" label="Kapasite/Güç" value={selectedCapacity} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="screenSize" label="Boyut" value={selectedScreenSize} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="worker" label="Kullanıcı" value={selectedOperator} onChange={"onChangeLocation"} />
          </div>

          <div className="py-3">
            <DatePicker name="warrantyStartDate" label="Garanti Başlangıç Süresi" placeholder="Garanti Başlangıç Süresi" value={new Date(selectedWarrantyStartDate)} onChange={(e) => onChangeWarrantyStartDate(e)} input={true} />
          </div>

          <div className="py-3">
            <DatePicker label="Garanti Bitiş Süresi" placeholder="Garanti Bitiş Süresi" value={new Date(selectedWarrantyEndDate)} onChange={(e) => onChangeWarrantyEndDate(e)} input={true} />
          </div>

          <div className="py-3">
            <DatePicker name="firstPeriodicMaintenanceDate" label="İlk Periyodik Bakım" placeholder="İlk Periyodik Bakım" value={new Date(selectedFirstPeriodicMaintenanceDate)} onChange={(e) => onChangeFirstPeriodicMaintenance(e)} input={true} />
          </div>

          <div className="py-3">
            <Input onKeyPress={onKeyPress} name="descriptions" label="Açıklama" value={selectedDescriptions} onChange={"onChangeLocation"} />
          </div>
        </div>
      </Modal>

      <DataTable data={allProduct} sortOrder={-1} scrollHeight="600px" responsiveLayout="scroll">
        <Column body={(item) => actionsTemplate(item)} />
        <Column field="location" sortable header="Bölge" />
        <Column field="subLocation" sortable header="Lokasyon" />
        <Column field="productBarcode" sortable header="Barkod" />
        <Column field="productArea" sortable header="Departman" />
        <Column field="productGroup" sortable header="Ürün Adı" />
        <Column field="productSubGroup" sortable header="Kullanım Amacı" />
        <Column field="productSubGroupDetail" sortable header="Hammadde" />
        <Column field="productLastDetail" sortable header="Ölçü/Biçim" />
        <Column field="colour" sortable header="Renk" />
        <Column field="barcodePlace" sortable header="Barkod Yer" />
        <Column field="situation" sortable header="Durum" />
        <Column header="Kalibrasyon Var Mı ? " body={(item) => (item?.calibration ? "Evet" : "Hayır")} />
        <Column header="Kalibrasyon Tarihi" body={(item) => (item?.calibrationDate ? moment(item?.calibrationDate).format("Do MMMM YYYY, HH:mm:ss") : "-")} />
        <Column field="numberPlate" sortable header="Plaka" />
        <Column field="deviceSerialNo" sortable header="Cihaz Seri No" />
        <Column field="brand" sortable header="Marka" />
        <Column field="model" sortable header="Model" />
        <Column field="power" sortable header="Kapasite/Güç" />
        <Column field="screenSize" sortable header="Boyut" />
        <Column field="worker" sortable header="Kullanıcı" />
        <Column header="Garanti Başlangıç Tarihi" body={(item) => (item?.warrantyStartDate ? moment(item?.warrantyStartDate).format("Do MMMM YYYY, HH:mm:ss") : "-")} />
        <Column header="Garanti Bitiş Tarihi" body={(item) => (item?.warrantyEndDate ? moment(item?.warrantyEndDate).format("Do MMMM YYYY, HH:mm:ss") : "-")} />
        <Column header="İlk Periyodik Bakım Tarihi" body={(item) => (item?.firstPeriodicMaintenanceDate ? moment(item?.firstPeriodicMaintenanceDate).format("Do MMMM YYYY, HH:mm:ss") : "-")} />
        <Column field="descriptions" sortable header="Açıklama" />
      </DataTable>

      <Paginator leftContent={() => <span> Toplam Ürün Sayısı: {totalRecords} </span>} first={page} rows={size} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 100]} onPageChange={onPageChange}></Paginator>

      <Sidebar visible={sidebarVisible} position="right" className="p-sidebar-sm" onHide={() => setSidebarVisible(false)}>
        <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="locationDto.name" placeholder="Bölge" value={filterLocation} onChange={(e) => setFilterLocation(e?.target?.value)} />
        </div>

        <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="locations" placeholder="Lokasyon" value={filterLocations} onChange={(e) => setFilterLocations(e?.target?.value)} />
        </div>

        <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="productBarcode" placeholder="Barkod" value={filterProductBarcode} onChange={(e) => setFilterProductBarcode(e?.target?.value)} />
        </div>

        <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="productArea" placeholder="Departman" value={filterProductArea} onChange={(e) => setFilterProductArea(e?.target?.value)} />
        </div>

        <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="productGroup" placeholder="Ürün Adı" value={filterProductGroup} onChange={(e) => setFilterProductGroup(e?.target?.value)} />
        </div>

        <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="productSubGroup" placeholder="Kullanım Amacı" value={filterSubProductGroup} onChange={(e) => setFilterSubProductGroup(e?.target?.value)} />
        </div>

        <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="productSubGroupDetail" placeholder="Hammadde" value={filterSubProductDetail} onChange={(e) => setFilterSubProductDetail(e?.target?.value)} />
        </div>

        <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="productLastDetail" placeholder="Ölçü/Biçim" value={filterProductLastDetail} onChange={(e) => setFilterProductLastDetail(e?.target?.value)} />
        </div>

        <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="colour" placeholder="Renk" value={filterColour} onChange={(e) => setFilterColour(e?.target?.value)} />
        </div>

        <div className="py-2 px-2 flex justify-content-end">
          <Button type="button" icon="pi pi-filter-slash" label="Temizle" className="p-button-outlined" onClick={clearFilter} />
        </div>
      </Sidebar>
    </div>
  );
}
