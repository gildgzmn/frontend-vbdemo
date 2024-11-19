import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode } from "primereact/api";
import {
  fetchAllResidents,
  fetchAllMunicipalities,
  fetchAllBarangays,
} from "../services/apiService";
import "../css/DataPage.css";

const DataPage = () => {
  const navigate = useNavigate();

  // State to hold fetched residents' data
  const [residentsData, setResidentsData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    middleName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    mobileNum: { value: null, matchMode: FilterMatchMode.CONTAINS },
    isVoter: { value: null, matchMode: FilterMatchMode.EQUALS },
    vbFlag: { value: null, matchMode: FilterMatchMode.EQUALS },
    brgyCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
    muniCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [municipalityMap, setMunicipalityMap] = useState({});
  const [barangays, setBarangays] = useState([]);
  const [selectedBarangay, setSelectedBarangay] = useState(null);

  // Fetch residents' data on component mount
  useEffect(() => {
    const fetchResidentsData = async () => {
      try {
        const data = await fetchAllResidents();
        setResidentsData(data);
      } catch (error) {
        console.error("Error fetching residents data:", error);
      }
    };

    const fetchMunicipalitiesData = async () => {
      try {
        const data = await fetchAllMunicipalities();
        setMunicipalities(data);

        const municipalityMap = data.reduce((acc, muni) => {
          acc[muni.citymunCode] = muni;
          return acc;
        }, {});
        setMunicipalityMap(municipalityMap);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
      }
    };

    fetchMunicipalitiesData();
    fetchResidentsData();
  }, []);

  useEffect(() => {
    if (selectedMunicipality) {
      const fetchBarangaysData = async () => {
        try {
          const data = await fetchAllBarangays();
          const filteredBarangays = data.filter(
            (brgy) => brgy.cityCode === selectedMunicipality
          );
          setBarangays(filteredBarangays);
        } catch (error) {
          console.error("Error fetching barangays:", error);
        }
      };

      fetchBarangaysData();
    } else {
      // Clear the barangay dropdown when municipality is reset
      setBarangays([]);
      setSelectedBarangay(null);
    }
  }, [selectedMunicipality]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      global: { ...prevFilters.global, value },
    }));
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    <div>
      <h1 className="text-center text-5xl font-bold mb-6 mt-4">RESIDENTS DATA TABLE</h1>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Global Search may bug pa yung mga search"
          className="small-search"
        />
      </span>
      <Dropdown
        value={selectedMunicipality}
        options={municipalities.map((m) => ({
          label: m.citymunDesc,
          value: m.citymunCode,
        }))}
        onChange={(e) => setSelectedMunicipality(e.value)}
        placeholder="Select Municipality"
        className="mun-dropdown mun-dropdown-panel mun-dropdown-item"
        showClear
      />

      <Dropdown
        value={selectedBarangay}
        options={barangays.map((b) => ({
          label: b.brgyDesc,
          value: b.brgyCode,
        }))}
        onChange={(e) => setSelectedBarangay(e.value)}
        placeholder="Select Barangay"
        className="mun-dropdown mun-dropdown-panel mun-dropdown-item"
        showClear
        emptyMessage="Please select a Municipality first"
      />
    </div>
  );

  const statusTemplate = (status) => (
    <Tag
      value={status ? "Registered" : "Not Yet"}
      severity={status ? "success" : "warning"}
    />
  );

  const voteBoughtTemplate = (status) => (
    <Tag
      value={status ? "Paid" : "Not Yet"}
      severity={status ? "danger" : "info"}
    />
  );

  const voterStatusFilterTemplate = (options) => (
    <Dropdown
      value={options.value}
      options={[
        { label: "Registered", value: true },
        { label: "Not Yet", value: false },
      ]}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Select Status"
      className="p-column-filter small-dropdown"
      showClear
    />
  );

  const voteBoughtFilterTemplate = (options) => (
    <Dropdown
      value={options.value}
      options={[
        { label: "Paid", value: true },
        { label: "Not Yet", value: false },
      ]}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Select Status"
      className="p-column-filter small-dropdown"
      showClear
    />
  );

  const handleRowClick = (rowData) => {
    navigate(`/profile/${rowData.id}`, { state: { user: rowData } });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card table-container overflow-x-auto">
        <DataTable
          value={residentsData}
          paginator
          rows={20}
          header={renderHeader()}
          filters={filters}
          filterDisplay="row"
          globalFilterFields={[
            "firstName",
            "lastName",
            "middleName",
            "mobileNum",
            "brgyCode",
            "muniCode",
          ]}
          emptyMessage="No records found."
          scrollable
          scrollHeight="flex"
          onRowClick={(e) => handleRowClick(e.data)}
        >
          <Column
            header="Name"
            body={(rowData) =>
              `${rowData.firstName} ${rowData.middleName} ${rowData.lastName}`
            }
            filter
            filterPlaceholder="Search by name"
            filterField="firstName"
            filterMenuStyle={{ width: "12rem" }}
            showFilterMenu={false}
          />
          <Column
            header="Address"
            body={(rowData) => {
              const municipality = municipalityMap[rowData.muniCode];
              return municipality
                ? `${rowData.brgyCode}, ${municipality.citymunDesc}, ${municipality.provDesc}`
                : "Unknown";
            }}
            filter
            filterPlaceholder="Search by address"
            filterField="brgyCode"
            filterMenuStyle={{ width: "12rem" }}
            showFilterMenu={false}
          />
          <Column field="mobileNum" header="Mobile Number" />
          <Column field="age" header="Age" />
          <Column field="gender" header="Gender" />
          <Column
            field="isVoter"
            header="Registration Status"
            body={(rowData) => statusTemplate(rowData.isVoter)}
            filter
            filterElement={voterStatusFilterTemplate}
            showFilterMenu={false}
          />
          <Column
            field="vbFlag"
            header="Payment Status"
            body={(rowData) => voteBoughtTemplate(rowData.vbFlag)}
            filter
            filterElement={voteBoughtFilterTemplate}
            showFilterMenu={false}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default DataPage;
