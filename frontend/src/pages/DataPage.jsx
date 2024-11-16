import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode } from "primereact/api";
import "../css/DataPage.css";

const DataPage = () => {
  const navigate = useNavigate();

  //temp
  const [data] = useState([
    {
      id: 1,
      firstName: "John",
      middleName: "D.",
      lastName: "Doe",
      mobileNum: "123-4567",
      age: 25,
      gender: "Male",
      brgyCode: "Brgy 1",
      muniCode: "Muni A",
      voterStatus: true,
      voteBought: false,
    },
    {
      id: 2,
      firstName: "Jane",
      middleName: "M.",
      lastName: "Smith",
      mobileNum: "987-6543",
      age: 30,
      gender: "Female",
      brgyCode: "Brgy 2",
      muniCode: "Muni B",
      voterStatus: true,
      voteBought: true,
    },
  ]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    middleName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    mobileNum: { value: null, matchMode: FilterMatchMode.CONTAINS },
    voterStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
    voteBought: { value: null, matchMode: FilterMatchMode.EQUALS },
    brgyCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
    muniCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      global: { ...prevFilters.global, value },
    }));
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    <div className="flex justify-content-end">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          className="small-search"
        />
      </span>
    </div>
  );

  const statusTemplate = (status) => (
    <Tag
      value={status ? "Voter" : "Not Yet"}
      severity={status ? "success" : "warning"}
    />
  );

  const voteBoughtTemplate = (status) => (
    <Tag
      value={status ? "Bought" : "Not Yet"}
      severity={status ? "danger" : "info"}
    />
  );

  const voterStatusFilterTemplate = (options) => (
    <Dropdown
      value={options.value}
      options={[
        { label: "Voter", value: true },
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
        { label: "Bought", value: true },
        { label: "Not Yet", value: false },
      ]}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Select Status"
      className="p-column-filter small-dropdown"
      showClear
    />
  );

  const handleRowClick = (rowData) => {
    navigate(`/profile/${rowData.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card table-container overflow-x-auto">
        <DataTable
          value={data}
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
            body={(rowData) => `${rowData.brgyCode} ${rowData.muniCode}`}
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
            field="voterStatus"
            header="Voter Status"
            body={(rowData) => statusTemplate(rowData.voterStatus)}
            filter
            filterElement={voterStatusFilterTemplate}
            showFilterMenu={false}
          />
          <Column
            field="voteBought"
            header="Vote Bought"
            body={(rowData) => voteBoughtTemplate(rowData.voteBought)}
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