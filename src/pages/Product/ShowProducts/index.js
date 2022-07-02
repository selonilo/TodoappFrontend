import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { api } from "../../../services";
import { DataTable, Modal, Input, Toast } from "../../../components";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { ProductGroupDropdown, ProductLastDetailsDropdown, SubProductDetailDropdown, SubProductGroupDropdown, ProductAreaDropdown, ColourDropdown, SituationDropdown } from "../components";
import { LocationDropdown, SubLocationDropdown, SubLocationDetailDropdown } from "../../Location/components";
import { saveAs } from "file-saver";
import moment from "moment";
import { Sidebar } from "primereact/sidebar";
import { Paginator } from "primereact/paginator";
import DatePicker from "../../../components/DatePicker";
import { Checkbox } from "primereact/checkbox";
import EmployeeDropdown from "../../Employee/components/EmployeeDropdown";
import NumberPlateDropdown from "../components/NumberPlateDropdown";
import BarcodePlaceDropdown from "../components/BarcodePlaceDropdown";
import { MultiSelect } from "primereact/multiselect";
import { useLocation } from "react-router-dom";

export default function ShowProducts() {
  const user = localStorage.getItem("loginName");
  const { state } = useLocation();

  const [allProduct, setAllProduct] = useState([]);

  const [productGroup, setProductGroup] = useState("");
  const [allProductGroup, setAllProductGroup] = useState([]);
  const [allProductArea, setAllProductArea] = useState([]);
  const [allProductAreaPopUp, setAllProductAreaPopUp] = useState([]);
  const [productGroupPopUp, setProductGroupPopUp] = useState("");
  const [SubProductGroupPopUp, setSubProductGroupPopUp] = useState("");
  const [SubProductDetailPopUp, setSubProductDetailPopUp] = useState("");
  const [productLastDetailPopUp, setProductLastDetailPopUp] = useState("");

  const [visible, setVisible] = useState(state?.isShow || false);
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const [visiblePopUpSubProductGroup, setVisiblePopUpSubProductGroup] = useState(false);
  const [visiblePopUpSubProductDetail, setVisiblePopUpSubProductDetail] = useState(false);
  const [visiblePopUpProductLastDetail, setVisiblePopUpProductLastDetail] = useState(false);
  const [visiblePopUpEmployee, setVisiblePopUpEmployee] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [submittedPopUp, setSubmittedPopUp] = useState(false);
  const [submittedPopUpSubProductGroup, setSubmittedPopUpSubProductGroup] = useState(false);
  const [submittedPopUpSubProductDetail, setSubmittedPopUpSubProductDetail] = useState(false);
  const [submittedPopUpProductLastDetail, setSubmittedPopUpProductLastDetail] = useState(false);
  const [submittedPopUpEmployee, setSubmittedEmployee] = useState(false);
  const [submittedPopUpEmployeeSurname, setSubmittedEmployeeSurname] = useState(false);

  const [excelLoading, setExcelLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductGroup, setSelectedProductGroup] = useState({});
  const [selectedSubProductGroup, setSelectedSubProductGroup] = useState({});
  const [selectedSubProductDetail, setSelectedSubProductDetail] = useState({});
  const [selectedColour, setSelectedColour] = useState({ id: 349, name: "beyaz" });
  const [selectedSituation, setSelectedSituation] = useState({ id: "Sahada Yeni", name: "Sahada Yeni" });
  const [selectedBarcodePlace, setSelectedBarcodePlace] = useState({ id: "Sol Ön Üst", name: "Sol Ön Üst" });
  const [selectedProductLastDetail, setSelectedProductLastDetail] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({ id: null, name: null });

  const [selectedSubLocation, setSelectedSubLocation] = useState({
    id: null,
    name: null,
    locationDto: {},
  });

  const [selectedProductArea, setSelectedProductArea] = useState({});
  // const [selectedSubLocationDetail, setSelectedSubLocationDetail] = useState({});
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
  // const [filterSubLocationDetail, setFilterSubLocationDetail] = useState();
  const [filterEmployeeName, setFilterEmployeeName] = useState();
  const [filterProductBarcode, setFilterProductBarcode] = useState();
  const [filterProductSapcode, setFilterProductSapcode] = useState();
  const [filterProductOldBarcode, setFilterProductOldBarcode] = useState();

  const [selectedLocations, setSelectedLocations] = useState("");
  const [selectedDeviceSerialNumber, setSelectedDeviceSerialNumber] = useState("");
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedModel, setSelectedModel] = useState();
  const [selectedPower, setSelectedPower] = useState();
  const [selectedBatteryChangeDate, setSelectedBatteryChangeDate] = useState(undefined);
  const [selectedWarranty, setSelectedWarranty] = useState();
  const [selectedWarrantyStartDate, setSelectedWarrantyStartDate] = useState(undefined);
  const [selectedWarrantyEndDate, setSelectedWarrantyEndDate] = useState(undefined);
  const [selectedPeriodicMaintenance, setSelectedPeriodicMaintenance] = useState();
  const [selectedFirstPeriodicMaintenanceDate, setSelectedFirstPeriodicMaintenanceDate] = useState(undefined);
  const [selectedTechnicalService, setSelectedTechnicalService] = useState();
  const [selectedOperator, setSelectedOperator] = useState();
  const [selectedCalibrationDate, setSelectedCalibrationDate] = useState();
  const [selectedDescriptions, setSelectedDescriptions] = useState();
  const [selectedResponsiblePerson, setSelectedResponsiblePerson] = useState();
  const [selectedWarrantyPeriod, setSelectedWarrantyPeriod] = useState();
  const [selectedScreenSize, setSelectedScreenSize] = useState();
  const [selectedCapacity, setSelectedCapacity] = useState();
  const [selectedFillingDate, setSelectedFillingDate] = useState();
  const [calibration, setCalibration] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedNumberPlate, setSelectedNumberPlate] = useState({});
  const [calibrationPopUp, setCalibrationPopUp] = useState(false);
  const [selectedProductAreaPopUp, setSelectedProductAreaPopUp] = useState([]);
  const [selectedProductGroupPopUp, setSelectedProductGroupPopUp] = useState("");
  const [selectedSubProductGroupPopUp, setSelectedSubProductGroupPopUp] = useState("");
  const [selectedSubProductDetailPopUp, setSelectedSubProductDetailPopUp] = useState("");
  const [selectedProductLastDetailPopUp, setSelectedProductLastDetailPopUp] = useState("");
  const [selectedEmployeeNamePopUp, setSelectedEmployeeNamePopUp] = useState("");
  const [selectedEmployeeSurnamePopUp, setSelectedEmployeeSurnamePopUp] = useState("");

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

    if (_selectedProduct?.id) {
      setSelectedProductGroup({ id: _selectedProduct?.productGroupId, name: _selectedProduct?.productGroupName });
      setSelectedSubProductGroup({ id: _selectedProduct?.productSubGroupId, name: _selectedProduct?.productSubGroupName });
      setSelectedSubProductDetail({
        id: _selectedProduct?.productSubGroupDetailId,
        name: _selectedProduct?.productSubGroupDetailName,
      });
      setSelectedProductLastDetail({ id: _selectedProduct?.productLastDetailId, name: _selectedProduct?.productLastDetailName });
      setSelectedLocation({ id: _selectedProduct?.locationId, name: _selectedProduct?.locationName });
      setSelectedSubLocation({ id: _selectedProduct?.subLocationId, name: _selectedProduct?.subLocationName });
      // setSelectedSubLocationDetail({ id: _selectedProduct?.subLocationDetailId, name: _selectedProduct?.subLocationDetailName });
      setSelectedEmployee({ id: _selectedProduct?.workerId, name: _selectedProduct?.workerName });
      setSelectedProductArea({ id: _selectedProduct?.productAreaId, name: _selectedProduct?.productArea });
      setCalibration(_selectedProduct?.calibration);
      setSelectedLocations(_selectedProduct?.locations);
      setSelectedCalibrationDate(_selectedProduct?.calibrationDate ? _selectedProduct?.calibrationDate : undefined);
      setSelectedDeviceSerialNumber(_selectedProduct?.deviceSerialNo);
      setSelectedBrand(_selectedProduct?.brand);
      setSelectedModel(_selectedProduct?.model);
      setSelectedPower(_selectedProduct?.capacity);
      setSelectedScreenSize(_selectedProduct?.screenSize);
      setSelectedOperator(_selectedProduct?.operator);
      setSelectedWarrantyStartDate(_selectedProduct?.warrantyStartDate ? _selectedProduct?.warrantyStartDate : undefined);
      setSelectedWarrantyEndDate(_selectedProduct?.warrantyEndDate ? _selectedProduct?.warrantyEndDate : undefined);
      setSelectedFirstPeriodicMaintenanceDate(_selectedProduct?.firstPeriodicMaintenanceDate ? _selectedProduct?.firstPeriodicMaintenanceDate : undefined);
      setSelectedDescriptions(_selectedProduct?.descriptions);
      setChecked(_selectedProduct?.isOptional);
      setSelectedNumberPlate({ id: _selectedProduct?.numberPlateId, name: _selectedProduct?.numberPlate });
      setSelectedColour({ id: _selectedProduct?.colourId, name: _selectedProduct?.colour });
      setSelectedSituation({ id: _selectedProduct?.situation, name: _selectedProduct?.situation });
      setSelectedBarcodePlace({ id: _selectedProduct?.barcodePlace, name: _selectedProduct?.barcodePlace });
    }

    setVisible(true);
  };

  const hideModal = () => {
    setSelectedProductGroup({});
    setSelectedSubProductGroup({});
    setSelectedSubProductDetail({});
    setSelectedProduct({});
    setSelectedLocation({});
    setSelectedSubLocation({});
    // setSelectedSubLocationDetail({});
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

  const showPopUp = (_selectedProductGroup) => {
    if (!selectedProductArea?.id) return Toast.warning("Lütfen Departman Seçiniz");
    setVisiblePopUp(true);
  };

  const showPopUpSubProductGroup = (_selectedProductGroup) => {
    if (!selectedProductGroup?.id) return Toast.warning("Lütfen Ürün Adı Seçiniz");
    setVisiblePopUpSubProductGroup(true);
  };

  const showPopUpSubProductDetail = (_selectedProductGroup) => {
    if (!selectedSubProductGroup?.id) return Toast.warning("Lütfen Kullanım Amacı Seçiniz");
    setVisiblePopUpSubProductDetail(true);
  };

  const showPopUpProductLastDetail = (_selectedProductGroup) => {
    if (!selectedSubProductDetail?.id) return Toast.warning("Lütfen Hammadde Seçiniz");
    setVisiblePopUpProductLastDetail(true);
  };

  const showPopUpEmployee = (_selectedProductGroup) => {
    setVisiblePopUpEmployee(true);
  };

  const hidePopUp = () => {
    setProductGroupPopUp("");
    setSelectedProductGroupPopUp([]);
    setCalibrationPopUp(false);
    setSubmittedPopUp(false);
    setVisiblePopUp(false);
  };

  const hidePopUpSubProductGroup = () => {
    setSubProductGroupPopUp("");
    setSelectedSubProductGroupPopUp([]);
    setSubmittedPopUp(false);
    setVisiblePopUpSubProductGroup(false);
  };

  const hidePopUpSubProductDetail = () => {
    setSubProductDetailPopUp("");
    setSelectedSubProductDetailPopUp([]);
    setSubmittedPopUpSubProductDetail(false);
    setVisiblePopUpSubProductDetail(false);
  };

  const hidePopUpProductLastDetail = () => {
    setProductLastDetailPopUp("");
    setSelectedProductLastDetailPopUp([]);
    setSubmittedPopUpProductLastDetail(false);
    setVisiblePopUpProductLastDetail(false);
  };

  const hidePopUpEmployee = () => {
    setSelectedEmployeeNamePopUp("");
    setSelectedEmployeeSurnamePopUp("");
    setVisiblePopUpEmployee(false);
  };

  const onChangeProductGroupPopUp = (e) => {
    setProductGroup(e?.target?.value);
  };

  const imageBodyTemplate = (item) => {
    if (!item?.dynamicPath) return;
    return <Image src={`https://api-sayim.cmvteknoloji.com/api/public/product/image?dynamicPath=${item?.dynamicPath}`} width="80" preview />;
  };

  const onChangeProductGroup = (e) => {
    setSelectedProductGroup(e?.value);
  };

  const onChangeSubProductGroup = (e) => {
    setSelectedSubProductGroup(e.value);
  };

  const onChangeSubProductDetail = (e) => {
    setSelectedSubProductDetail(e?.value);
  };

  const onChangeProductLastDetail = (e) => {
    setSelectedProductLastDetail(e?.value);
  };

  const onChangeColour = (e) => {
    setSelectedColour(e?.value);
  };

  const onChangeLocation = (e) => {
    setSelectedLocation(e?.value);
  };

  const onChangeLocations = (e) => {
    setSelectedLocations(e?.target.value);
  };

  const onChangeSubLocation = (e) => {
    setSelectedSubLocation(e?.value);
  };

  const onChangeProductArea = (e) => {
    setSelectedProductArea(e?.value);
  };

  // const onChangeSubLocationDetail = (e) => {
  //   setSelectedSubLocationDetail(e.value);
  // };

  const onChangeSituation = (e) => {
    setSelectedSituation(e?.value);
  };

  const onChangeDeviceSerialNumber = (e) => {
    setSelectedDeviceSerialNumber(e?.target.value);
  };

  const onChangeBrand = (e) => {
    setSelectedBrand(e?.target.value);
  };

  const onChangeModel = (e) => {
    setSelectedModel(e?.target.value);
  };

  const onChangePower = (e) => {
    setSelectedPower(e?.target.value);
  };

  const onChangeBatteryChangeDate = (e) => {
    setSelectedBatteryChangeDate(e?._d);
  };

  const onChangeWarranty = (e) => {
    setSelectedWarranty(e?.target.value);
  };

  const onChangeWarrantyStartDate = (e) => {
    setSelectedWarrantyStartDate(e?._d);
  };

  const onChangeWarrantyEndDate = (e) => {
    setSelectedWarrantyEndDate(e?._d);
  };

  const onChangePeriodicMaintenance = (e) => {
    setSelectedPeriodicMaintenance(e?.target.value);
  };

  const onChangeFirstPeriodicMaintenance = (e) => {
    setSelectedFirstPeriodicMaintenanceDate(e?._d);
  };

  const onChangeTechnicalService = (e) => {
    setSelectedTechnicalService(e?.target.value);
  };

  const onChangeOperator = (e) => {
    setSelectedOperator(e?.target.value);
  };

  const onChangeCalibrationDate = (e) => {
    setSelectedCalibrationDate(e?._d);
  };

  const onChangeDescriptions = (e) => {
    setSelectedDescriptions(e?.target.value);
  };

  const onChangeResponsiblePerson = (e) => {
    setSelectedResponsiblePerson(e?.target.value);
  };

  const onChangeWarrantyPeriod = (e) => {
    setSelectedWarrantyPeriod(e?.target.value);
  };

  const onChangeScreenSize = (e) => {
    setSelectedScreenSize(e?.target.value);
  };

  const onChangeCapacity = (e) => {
    setSelectedCapacity(e?.target.value);
  };

  const onChangeFillingDate = (e) => {
    setSelectedFillingDate(e?._d);
  };

  const onChangeNumberPlate = (e) => {
    setSelectedNumberPlate(e?.value);
  };

  const onChangeBarcodePlace = (e) => {
    setSelectedBarcodePlace(e?.value);
  };

  const onChangeProductBarcode = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setProductBarcode({ ...productBarcode, [e.target.name]: e.target.value });
    }
  };

  const onChangeEmployee = (e) => {
    setSelectedEmployee(e?.value);
  };

  const pageableProduct = async () => {
    const { data = [], error } = await api.product.pageableProduct(page, size, {
      location: filterLocation,
      // subLocation: filterSubLocation,
      productArea: filterProductArea,
      productGroup: filterProductGroup,
      productSubGroup: filterSubProductGroup,
      productSubGroupDetail: filterSubProductDetail,
      productLastDetail: filterProductLastDetail,
      // subLocationDetail: filterSubLocationDetail,
      worker: filterEmployeeName,
      productBarcode: filterProductBarcode,
      sapCode: filterProductSapcode,
      oldBarcode: filterProductOldBarcode,
      locations: filterLocations,
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
  }, [
    page,
    size,
    filterProductGroup,
    filterSubProductGroup,
    filterSubProductDetail,
    filterProductLastDetail,
    filterLocation,
    filterLocations,
    // filterSubLocation,
    // filterSubLocationDetail,
    filterEmployeeName,
    filterProductOldBarcode,
    filterProductBarcode,
    filterProductSapcode,
    filterProductArea,
  ]);

  const clearFilter = () => {
    setFilterProductGroup("");
    setFilterSubProductGroup("");
    setFilterSubProductDetail("");
    setFilterProductLastDetail("");
    setFilterLocation("");
    setFilterLocations("");
    setFilterSubLocation("");
    // setFilterSubLocationDetail("");
    setFilterEmployeeName("");
    setFilterProductOldBarcode("");
    setFilterProductBarcode("");
    setFilterProductSapcode("");
  };

  const handleSaveProduct = async () => {
    setSubmitted(true);

    if (!productBarcode.productBarcode) return;

    // if (Number(productBarcode.productBarcode) < 100000 || Number(productBarcode.productBarcode) > 300000) {
    //   if (Number(productBarcode.productBarcode) < 500000 || Number(productBarcode.productBarcode) > 530000) {
    //     return Toast.warning("Barkod 100000 - 300000 arasında yada 500000 - 519999 olmalıdır");
    //   }
    // }

    const params = {
      productBarcode: productBarcode?.productBarcode,
      locationId: selectedLocation?.id,
      locations: selectedLocations,
      productGroupId: selectedProductGroup?.id,
      productSubGroupId: selectedSubProductGroup?.id,
      productSubGroupDetailId: selectedSubProductDetail?.id,
      productLastDetailId: selectedProductLastDetail?.id,
      createUser: user,
      updateUser: user,
      productAreaId: selectedProductArea?.id,
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
      // subLocationId: selectedSubLocation?.id,
      // sapCode: productBarcode?.sapCode,
      // oldBarcode: productBarcode?.oldBarcode,
      // subLocationDetailId: selectedSubLocationDetail?.id,
      // workerId: selectedEmployee?.id,
      // batteryChangeDate: selectedBatteryChangeDate,
      // warranty: selectedWarranty,
      // periodicMaintenance: selectedPeriodicMaintenance,
      // technicalService: selectedTechnicalService,
    };

    // eslint-disable-next-line
    const { data = [], error } = await api.product.saveProduct({ ...params });
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
      // subLocationId: selectedSubLocation?.id,
      // subLocationDetailId: selectedSubLocationDetail?.id,
      // workerId: selectedEmployee?.id,
      // oldBarcode: productBarcode?.oldBarcode,
      // sapCode: productBarcode?.sapCode,
      // batteryChangeDate: selectedBatteryChangeDate,
      // warranty: selectedWarranty,
      // periodicMaintenance: selectedPeriodicMaintenance,
      // technicalService: selectedTechnicalService,
    };

    // eslint-disable-next-line
    const { data = [], error } = await api.product.updateProduct({ ...params });
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
        const { data = [], error } = await api.product.deleteProduct(item?.id);
        if (error) return Toast.error(error);
        pageableProduct();

        Toast.success("İşlem Başarılı");
      },
    });
  };

  const pageableProductGroup = async () => {
    const { data = [], error } = await api.productGroup.pageableProductGroup(page, size, {
      name: filterProductGroup,
    });
    if (error) {
      Toast.error(error);
    }

    setAllProductGroup(data?.content);
    setTotalRecords(data?.totalElements);
  };

  const handleSaveProductGroup = async () => {
    setSubmittedPopUp(true);

    if (!selectedProductGroupPopUp) return;

    const params = {
      name: selectedProductGroupPopUp,
      createUser: user,
      updateUser: user,
      productAreaList: [selectedProductArea?.id],
      calibration: calibrationPopUp,
    };

    const { data = {}, error } = await api.productGroup.saveProductGroup({ ...params });
    if (error) return Toast.error(error);

    Toast.success("İşlem Başarılı");
    hidePopUp();
  };

  const handleSaveSubProductGroup = async () => {
    setSubmittedPopUpSubProductGroup(true);

    if (!selectedSubProductGroupPopUp) return;

    const params = {
      productGroupId: selectedProductGroup?.id,
      name: selectedSubProductGroupPopUp,
      createUser: user,
      updateUser: user,
    };

    const { data = {}, error } = await api.subProductGroup.saveSubProductGroup({ ...params });
    if (error) return Toast.error(error);

    Toast.success("İşlem Başarılı");
    hidePopUpSubProductGroup();
  };

  const handleSaveSubProductDetail = async () => {
    setSubmittedPopUpSubProductDetail(true);

    if (!selectedSubProductDetailPopUp) return;

    const params = {
      productSubGroupId: selectedSubProductGroup?.id,
      name: selectedSubProductDetailPopUp,
      createUser: user,
      updateUser: user,
    };

    const { data = {}, error } = await api.subProductDetail.saveSubProductDetail({ ...params });
    if (error) return Toast.error(error);

    Toast.success("İşlem Başarılı");
    hidePopUpSubProductDetail();
  };

  const handleSaveProductLastDetail = async () => {
    setSubmittedPopUpProductLastDetail(true);

    if (!selectedProductLastDetailPopUp) return;

    const params = {
      productSubGroupDetailId: selectedSubProductDetail?.id,
      name: selectedProductLastDetailPopUp,
      createUser: user,
      updateUser: user,
    };

    const { data = {}, error } = await api.productLastDetail.saveProductLastDetail({ ...params });
    if (error) return Toast.error(error);

    Toast.success("İşlem Başarılı");
    hidePopUpProductLastDetail();
  };

  const handleSaveEmployee = async () => {
    if (!selectedEmployeeNamePopUp || !selectedEmployeeSurnamePopUp) return Toast.warning("Lütfen Çalışan Adı ve Soyadını Kontrol Edin");

    const params = {
      name: selectedEmployeeNamePopUp?.toUpperCase(),
      surname: selectedEmployeeSurnamePopUp?.toUpperCase(),
      createUser: user,
    };
    const { data = [], error } = await api.employee.saveEmployee({ ...params });
    if (error) return Toast.error(error);

    Toast.success("İşlem Başarılı");
    hidePopUpEmployee();
  };

  const getAllProductArea = async () => {
    const { data = [], error } = await api.defineProductArea.getAllProductArea();
    setAllProductAreaPopUp(data);
  };

  useEffect(() => {
    getAllProductArea();
  }, []);

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

    const { data = {}, error } = await api.product.getAllProduct();
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

          // "Alt Lokasyon Detay": item?.subLocationDetailDto?.name,
          // "Çalışan Adı": item?.workerDto?.name,
          // "Eski Barkod": item?.oldBarcode,
          // "Sap Kod": item?.sapCode,
          // "Akü Değişim Tarihi": item?.batteryChangeDate,
          // "Lokasyon Türü": item?.locationTip,
          // Garanti: item?.warranty,
          // "Periyodik Bakım": item?.periodicMaintenance,
          // "Teknik Servis": item?.technicalService,
          // Durum: item?.situation,
          // "Kullanan Kişi": item?.technicalService,
          // "Kalibrasyon Tarihi": item?.calibrationDate,
          // "Sorumlu Kişi": item?.responsiblePerson,
          // "Garanti Süresi": item?.warrantyPeriod,
          // "Ekran Boyutu": item?.screenSize,
          // Kapasite: item?.capacity,
          // "Dolum Tarihi": item?.fillingDate,
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

  return (
    <div className="card">
      <Modal
        responsiveLayout="scroll"
        header={selectedProduct?.id ? "Ürün Güncelle" : "Yeni Ürün Ükle"}
        visible={visible}
        onHide={hideModal}
        onPress={selectedProduct?.id ? handleUpdateProduct : handleSaveProduct}
        label={selectedProduct?.id && "Güncelle"}
      >
        <div className="card">
          <LocationDropdown selectedLocation={selectedLocation} onChangeLocation={onChangeLocation} errorText={submitted && !selectedLocation?.id && "Lütfen bölge seçiniz"} />

          <Input onKeyPress={onKeyPress} maxLength={4} keyfilter="num" name="locations" label="Lokasyon" value={selectedLocations} onChange={onChangeLocations} />
          <div className="py-1">
            <Input
              onKeyPress={onKeyPress}
              name="productBarcode"
              label="Barkod"
              maxLength={6}
              keyfilter="num"
              errorText={submitted && !productBarcode?.productBarcode && "Lütfen  Barkod Numarasını Giriniz!"}
              value={productBarcode?.productBarcode}
              onChange={onChangeProductBarcode}
            />
          </div>
          <ProductAreaDropdown
            selectedProductArea={selectedProductArea}
            onChangeProductArea={onChangeProductArea}
            // errorText={submitted && !selectedLocation?.id && !selectedSubLocation?.id && "Lütfen departman seçiniz"}
          />

          {/* <SubLocationDropdown
            selectedSubLocation={selectedSubLocation}
            locationId={selectedLocation?.id}
            onChangeSubLocation={onChangeSubLocation}
            errorText={submitted && !selectedLocation?.id && !selectedSubLocation?.id && "Lütfen  lokasyon seçiniz"}
          /> */}

          {/* <SubLocationDetailDropdown
            selectedSubLocationDetail={selectedSubLocationDetail}
            subLocationId={selectedSubLocation?.id}
            onChangeSubLocationDetail={onChangeSubLocationDetail}
            errorText={submitted && !selectedLocation?.id && !selectedSubLocation?.id && !selectedSubLocationDetail && "Lütfen alt lokasyon  seçiniz"}
          /> */}

          {/* <EmployeeDropdown selectedEmployee={selectedEmployee} onChangeEmployee={onChangeEmployee} errorText={submitted && !selectedEmployee && "Lütfen Çalışan Seçiniz"} /> */}
        </div>
        <div className="card">
          <ProductGroupDropdown
            visible={visiblePopUp}
            selectedProductArea={selectedProductArea}
            selectedProductGroup={selectedProductGroup}
            onChangeProductGroup={onChangeProductGroup}
            errorText={submitted && !selectedProductGroup?.id && "Lütfen ürün adı seçiniz"}
            onClick={showPopUp}
          />

          <SubProductGroupDropdown
            visible={visiblePopUpSubProductGroup}
            productGroupId={selectedProductGroup?.id}
            selectedSubProductGroup={selectedSubProductGroup}
            onChangeSubProductGroup={onChangeSubProductGroup}
            onClick={showPopUpSubProductGroup}
          />

          <SubProductDetailDropdown
            visible={visiblePopUpSubProductDetail}
            subProductGroupId={selectedSubProductGroup?.id}
            selectedSubProductDetail={selectedSubProductDetail}
            onChangeSubProductDetail={onChangeSubProductDetail}
            onClick={showPopUpSubProductDetail}
          />

          <ProductLastDetailsDropdown
            visible={visiblePopUpProductLastDetail}
            subProductDetailId={selectedSubProductDetail?.id}
            selectedProductLastDetail={selectedProductLastDetail}
            onChangeProductLastDetail={onChangeProductLastDetail}
            onClick={showPopUpProductLastDetail}
          />

          <ColourDropdown onChangeColour={onChangeColour} selectedColour={selectedColour} />
          <BarcodePlaceDropdown onChangeBarcodePlace={onChangeBarcodePlace} selectedBarcodePlace={selectedBarcodePlace} />
          <SituationDropdown onChangeSituation={onChangeSituation} selectedSituation={selectedSituation} />
        </div>

        <div className="card">
          <Checkbox inputId="binary" checked={calibration} onChange={(e) => setCalibration(e.checked)} />
          <label style={{ marginLeft: 6 }} htmlFor="binary">
            Kalibrasyon yapılacak mı ?
          </label>
          {calibration && (
            <div className="py-3">
              <DatePicker name="calibrationDate" label="Kalibrasyon Tarihi" value={new Date(selectedCalibrationDate)} placeholder="KalibrasyonTarihi" onChange={(e) => onChangeCalibrationDate(e)} input={true} />
            </div>
          )}
        </div>
        <div className="card">
          <Checkbox inputId="binary" checked={checked} onChange={(e) => setChecked(e.checked)} />
          <label onClick={() => {}} style={{ marginLeft: 6 }} htmlFor="binary">
            Ekstra veri girilecek mi ?
          </label>
          {checked && (
            <>
              <div className="pt-3">
                <NumberPlateDropdown selectedNumberPlate={selectedNumberPlate} onChangeNumberPlate={onChangeNumberPlate} />
              </div>

              <div className="py-3">
                <Input onKeyPress={onKeyPress} name="deviceSerialNumber" label="Cihaz Seri Numarası" value={selectedDeviceSerialNumber} onChange={onChangeDeviceSerialNumber} />
              </div>

              <div className="py-3">
                <Input onKeyPress={onKeyPress} name="brand" label="Marka" value={selectedBrand} onChange={onChangeBrand} />
              </div>

              <div className="py-3">
                <Input onKeyPress={onKeyPress} name="model" label="Model" value={selectedModel} onChange={onChangeModel} />
              </div>

              <div className="py-3">
                <Input onKeyPress={onKeyPress} name="power" label="Kapasite/Güç" value={selectedPower} onChange={onChangePower} />
              </div>

              <div className="py-3">
                <Input onKeyPress={onKeyPress} name="screenSize" label="Boyut" value={selectedScreenSize} onChange={onChangeScreenSize} />
              </div>

              <div className="pt-3">
                <EmployeeDropdown selectedEmployee={selectedEmployee} onChangeEmployee={onChangeEmployee} errorText={submitted && !selectedEmployee && "Lütfen Çalışan Seçiniz"} onClick={showPopUpEmployee} />
              </div>

              {/* <div className="py-3">
                <Input onKeyPress={onKeyPress} name="operator" label="Kullanıcı" value={selectedOperator} onChange={onChangeOperator} />
              </div> */}

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
                <Input onKeyPress={onKeyPress} name="descriptions" label="Açıklama" value={selectedDescriptions} onChange={onChangeDescriptions} />
              </div>

              {/* <Input
              onKeyPress={onKeyPress}
              name="oldBarcode"
              label="Eski Barkod"
              // errorText={submitted && !productBarcode?.oldBarcode && "Lütfen Eski Barkod Numarasını Giriniz!"}
              value={productBarcode?.oldBarcode}
              onChange={onChangeProductBarcode}
            /> */}

              {/* <div className="py-3">
            <Input onKeyPress={onKeyPress} name="sapCode" label="Sapcode" errorText={submitted && !productBarcode?.sapCode && "Lütfen Sapcode Numarasını Giriniz!"} value={productBarcode?.sapCode} onChange={onChangeProductBarcode} />
          </div> */}

              {/* <div className="py-3">
            <DatePicker onKeyPress={onKeyPress}  label="Akü Değişim Tarihi" placeholder="Akü Değişim Tarihi" value={new Date(selectedBatteryChangeDate)} onChange={onChangeBatteryChangeDate} />
          </div> */}

              {/* <div className="py-3">
            <Input
              onKeyPress={onKeyPress}
              name="warranty"
              label="Garanti"
              // errorText={submitted && !productBarcode?.sapCode && "Lütfen Sapcode Numarasını Giriniz!"}
              value={selectedWarranty}
              onChange={(e) => onChangeWarranty(e)}
              input={true}
            />
          </div> */}

              {/* <div className="py-3">
            <Input
              onKeyPress={onKeyPress}
              name="periodicMaintenance"
              label="Periyodik Bakım"
              // errorText={submitted && !productBarcode?.sapCode && "Lütfen Sapcode Numarasını Giriniz!"}
              value={selectedPeriodicMaintenance}
              onChange={onChangePeriodicMaintenance}
            />
          </div> */}

              {/* <div className="py-3">
            <Input
              onKeyPress={onKeyPress}
              name="periodicMaintenance"
              label="Periyodik Bakım"
              // errorText={submitted && !productBarcode?.sapCode && "Lütfen Sapcode Numarasını Giriniz!"}
              value={selectedPeriodicMaintenance}
              onChange={onChangePeriodicMaintenance}
            />
          </div> */}

              {/* <div className="py-3">
            <Input
              onKeyPress={onKeyPress}
              name="technicalService"
              label="Teknik Servis"
              // errorText={submitted && !productBarcode?.sapCode && "Lütfen Sapcode Numarasını Giriniz!"}
              value={selectedTechnicalService}
              onChange={onChangeTechnicalService}
            />
          </div> */}

              {/* <div className="py-3">
            <Input
              onKeyPress={onKeyPress}
              name="responsiblePerson"
              label="Sorumlu Kişi"
              // errorText={submitted && !productBarcode?.sapCode && "Lütfen Sapcode Numarasını Giriniz!"}
              value={selectedResponsiblePerson}
              onChange={onChangeResponsiblePerson}
            />
          </div> */}

              {/* <div className="py-3">
            <Input
              onKeyPress={onKeyPress}
              name="warrantyPeriod"
              label="Garanti Süresi"
              // errorText={submitted && !productBarcode?.sapCode && "Lütfen Sapcode Numarasını Giriniz!"}
              value={selectedWarrantyPeriod}
              onChange={onChangeWarrantyPeriod}
            />
          </div> */}

              {/* <div className="py-3">
            <Input
              onKeyPress={onKeyPress}
              name="capacity"
              label="Kapasite"
              // errorText={submitted && !productBarcode?.sapCode && "Lütfen Sapcode Numarasını Giriniz!"}
              value={selectedCapacity}
              onChange={onChangeCapacity}
            />
          </div> */}

              {/* <div className="py-3">
            <DatePicker name="fillingDate" label="Dolum Tarihi" placeholder="Dolum Tarihi" value={new Date(selectedFillingDate)} onChange={(e) => onChangeFillingDate(e)} input={true} />
          </div> */}
            </>
          )}
        </div>
      </Modal>

      <>
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

        <Modal header={selectedProductGroup?.id && "Ürün Adı Ekle"} visible={visiblePopUp} onHide={hidePopUp} onPress={handleSaveProductGroup} label={selectedProductGroup?.id && "Güncelle"}>
          {/* <MultiSelect style={{ width: "100%" }} value={selectedProductAreaPopUp} options={allProductAreaPopUp} onChange={(e) => setSelectedProductAreaPopUp(e.value)} optionLabel="name" placeholder="Departman Seç" maxSelectedLabels={3} /> */}
          <Input label="Ürün Grubu Adı" errorText={submittedPopUp && !selectedProductGroupPopUp && "Lütfen Ürün Grubu giriniz"} value={selectedProductGroupPopUp} onChange={(e) => setSelectedProductGroupPopUp(e.target.value)} />
          <div className="card mt-3">
            <Checkbox inputId="binary" checked={calibrationPopUp} onChange={(e) => setCalibrationPopUp(e.checked)} />

            <label style={{ marginLeft: 6 }} htmlFor="binary">
              Kalibrasyon yapılacak mı ?
            </label>
          </div>
        </Modal>

        <Modal header={selectedSubProductGroup?.id && "Kullanım Amacı Ekle"} visible={visiblePopUpSubProductGroup} onHide={hidePopUpSubProductGroup} onPress={handleSaveSubProductGroup} label={selectedSubProductGroup?.id && "Güncelle"}>
          <Input
            label="Kullanım Amacı Adı"
            errorText={submittedPopUpSubProductGroup && !selectedSubProductGroupPopUp && "Lütfen Kullanım Amacı giriniz"}
            value={selectedSubProductGroupPopUp}
            onChange={(e) => setSelectedSubProductGroupPopUp(e.target.value)}
          />
        </Modal>

        <Modal header={selectedSubProductDetail?.id && "Hammadde Ekle"} visible={visiblePopUpSubProductDetail} onHide={hidePopUpSubProductDetail} onPress={handleSaveSubProductDetail} label={selectedSubProductDetail?.id && "Güncelle"}>
          <Input
            label="Hammadde Adı"
            errorText={submittedPopUpSubProductDetail && !selectedSubProductDetailPopUp && "Lütfen Hammadde giriniz"}
            value={selectedSubProductDetailPopUp}
            onChange={(e) => setSelectedSubProductDetailPopUp(e.target.value)}
          />
        </Modal>

        <Modal header={selectedProductLastDetail?.id && "Ölçü/Birim Ekle"} visible={visiblePopUpProductLastDetail} onHide={hidePopUpProductLastDetail} onPress={handleSaveProductLastDetail} label={selectedProductLastDetail?.id && "Güncelle"}>
          <Input
            label="Ölçü/Birim"
            errorText={submittedPopUpProductLastDetail && !selectedProductLastDetailPopUp && "Lütfen Hammadde giriniz"}
            value={selectedProductLastDetailPopUp}
            onChange={(e) => setSelectedProductLastDetailPopUp(e.target.value)}
          />
        </Modal>

        <Modal header={selectedEmployee?.id && "Çalışan Ekle"} visible={visiblePopUpEmployee} onHide={hidePopUpEmployee} onPress={handleSaveEmployee} label={selectedEmployee?.id && "Güncelle"}>
          <Input autoFocus label="Çalışan Adı" errorText={submittedPopUpEmployee && !selectedEmployeeNamePopUp && "Lütfen Çalışan Adı giriniz"} value={selectedEmployeeNamePopUp} onChange={(e) => setSelectedEmployeeNamePopUp(e.target.value)} />
          <div className="py-3">
            <Input
              label="Çalışan Soyadı"
              errorText={submittedPopUpEmployeeSurname && !selectedEmployeeSurnamePopUp && "Lütfen Çalışan Soyadı giriniz"}
              value={selectedEmployeeSurnamePopUp}
              onChange={(e) => setSelectedEmployeeSurnamePopUp(e.target.value)}
            />
          </div>
        </Modal>

        <DataTable data={allProduct} sortOrder={-1} scrollHeight="600px" responsiveLayout="scroll">
          <Column body={(item) => actionsTemplate(item)} />
          <Column header="Ürün Fotoğrafı" body={imageBodyTemplate} />
          <Column field="locationName" sortable header="Bölge" />
          <Column field="locations" sortable header="Lokasyon" />
          <Column field="productBarcode" sortable header="Barkod" />
          <Column field="productAreaName" sortable header="Departman" />
          <Column field="productGroupName" sortable header="Ürün Adı" />
          <Column field="productSubGroupName" sortable header="Kullanım Amacı" />
          <Column field="productSubGroupDetailName" sortable header="Hammadde" />
          <Column field="productLastDetailName" sortable header="Ölçü/Biçim" />
          <Column field="colour" sortable header="Renk" />
          <Column field="barcodePlace" sortable header="Barkod Yer" />
          <Column field="situation" sortable header="Durum" />
          <Column header="Kalibrasyon Var Mı ? " body={(item) => (item?.calibration ? "Evet" : "Hayır")} />
          <Column header="Kalibrasyon Tarihi" body={(item) => (item?.calibrationDate ? moment(item?.calibrationDate).format("Do MMMM YYYY, HH:mm:ss") : "-")} />
          <Column field="numberPlate" sortable header="Plaka" />
          <Column field="deviceSerialNo" sortable header="Cihaz Seri No" />
          <Column field="brand" sortable header="Marka" />
          <Column field="model" sortable header="Model" />
          <Column field="capacity" sortable header="Kapasite/Güç" />
          <Column field="screenSize" sortable header="Boyut" />
          <Column body={(item) => (item?.workerName ? item?.workerName + " " + item?.workerSurname : "-")} sortable header="Kullanıcı" />
          <Column header="Garanti Başlangıç Tarihi" body={(item) => (item?.warrantyStartDate ? moment(item?.warrantyStartDate).format("Do MMMM YYYY, HH:mm:ss") : "-")} />
          <Column header="Garanti Bitiş Tarihi" body={(item) => (item?.warrantyEndDate ? moment(item?.warrantyEndDate).format("Do MMMM YYYY, HH:mm:ss") : "-")} />
          <Column header="İlk Periyodik Bakım Tarihi" body={(item) => (item?.firstPeriodicMaintenanceDate ? moment(item?.firstPeriodicMaintenanceDate).format("Do MMMM YYYY, HH:mm:ss") : "-")} />
          <Column field="descriptions" sortable header="Açıklama" />
          {/* <Column field="subLocationDetailName" sortable header="Lokasyon Detay" /> */}
          {/* <Column field="oldBarcode" header="Eski Barkod" /> */}
          {/* <Column field="sapCode" header="Sapkod" /> */}
          {/* <Column field="workerName" sortable header="Çalışan Adı" /> */}
          {/* <Column header="Akü Değişim Tarihi" body={(item) => (item?.batteryChangeDate ? moment(item?.batteryChangeDate).format("Do MMMM YYYY, HH:mm:ss") : "-")} /> */}
          {/* <Column field="locationTip" sortable header="Lokasyon Türü" /> */}
          {/* <Column header="Garanti" body={(item) => (item?.warranty ? "Evet" : "Hayır")} /> */}
          {/* <Column header="Periyodik Bakım" body={(item) => (item?.periodicMaintenance ? "Evet" : "Hayır")} /> */}
          {/* <Column field="technicalService" sortable header="Teknik Servis" /> */}
          {/* <Column field="responsiblePerson" sortable header="Sorumlu Kişi" /> */}
          {/* <Column field="warrantyPeriod" sortable header="Garanti Süresi" /> */}
          {/* <Column field="capacity" sortable header="Kapasite" /> */}
          {/* <Column header="Dolum Tarihi" body={(item) => (item?.fillingDate ? moment(item?.fillingDate).format("Do MMMM YYYY, HH:mm:ss") : "-")} /> */}
        </DataTable>

        <Paginator leftContent={() => <span> Toplam Ürün Sayısı: {totalRecords} </span>} first={page} rows={size} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 100]} onPageChange={onPageChange}></Paginator>

        <Sidebar visible={sidebarVisible} position="right" className="p-sidebar-sm" onHide={() => setSidebarVisible(false)}>
          <div className="py-2 px-2">
            {/* <LocationDropdown
            selectedLocation={selectedLocation}
            onChangeLocation={onChangeLocation}
            errorText={submitted && !selectedLocation?.id && "Lütfen lokasyon seçiniz"}
          /> */}

            <Input onKeyPress={onKeyPress} name="locationDto.name" placeholder="Bölge" value={filterLocation} onChange={(e) => setFilterLocation(e?.target?.value)} />
          </div>

          <div className="py-2 px-2">
            <Input onKeyPress={onKeyPress} name="locations" placeholder="Lokasyon" value={filterLocations} onChange={(e) => setFilterLocations(e?.target?.value)} />
          </div>

          {/* <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="subLocationDetailDto.name" placeholder="Alt Lokasyon" value={filterSubLocationDetail} onChange={(e) => setFilterSubLocationDetail(e?.target?.value)} />
        </div> */}

          <div className="py-2 px-2">
            <Input onKeyPress={onKeyPress} name="productBarcode" placeholder="Barkod" value={filterProductBarcode} onChange={(e) => setFilterProductBarcode(e?.target?.value)} />
          </div>

          <div className="py-2 px-2">
            <Input onKeyPress={onKeyPress} name="productAreaName" placeholder="Departman" value={filterProductArea} onChange={(e) => setFilterProductArea(e?.target?.value)} />
          </div>

          <div className="py-2 px-2">
            <Input onKeyPress={onKeyPress} name="productGroupDto.name" placeholder="Ürün Adı" value={filterProductGroup} onChange={(e) => setFilterProductGroup(e?.target?.value)} />
          </div>

          <div className="py-2 px-2">
            <Input onKeyPress={onKeyPress} name="productSubGroupDto.name" placeholder="Kullanım Amacı" value={filterSubProductGroup} onChange={(e) => setFilterSubProductGroup(e?.target?.value)} />
          </div>

          <div className="py-2 px-2">
            <Input onKeyPress={onKeyPress} name="productSubGroupDetailDto.name" placeholder="Hammadde" value={filterSubProductDetail} onChange={(e) => setFilterSubProductDetail(e?.target?.value)} />
          </div>

          <div className="py-2 px-2">
            <Input onKeyPress={onKeyPress} name="productLastDetailDto.name" placeholder="Ölçü/Biçim" value={filterProductLastDetail} onChange={(e) => setFilterProductLastDetail(e?.target?.value)} />
          </div>

          {/* <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="workerDto.name" placeholder="Çalışan Adı" value={filterEmployeeName} onChange={(e) => setFilterEmployeeName(e?.target?.value)} />
        </div> */}

          {/* <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="oldBarcod" placeholder="Eski Barkod" value={filterProductOldBarcode} onChange={(e) => setFilterProductOldBarcode(e?.target?.value)} />
        </div> */}

          {/* <div className="py-2 px-2">
          <Input onKeyPress={onKeyPress} name="sapCode" placeholder="Sapkod" value={filterProductSapcode} onChange={(e) => setFilterProductSapcode(e?.target?.value)} />
        </div> */}

          <div className="py-2 px-2 flex justify-content-end">
            <Button type="button" icon="pi pi-filter-slash" label="Temizle" className="p-button-outlined" onClick={clearFilter} />
          </div>
        </Sidebar>
      </>
    </div>
  );
}
