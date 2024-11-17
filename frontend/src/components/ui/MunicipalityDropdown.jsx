import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import LocationService from '../../services/LocationService';
import LocStatService from '../../services/LocStatService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie
} from "recharts";
import { color } from 'framer-motion';


const MunicipalityDropdown = ({ onMunicipalityChange }) => {
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const dataFromDataPage = [
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
  ];

  const groupDataByAddress = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      if (!groupedData[item.address]) {
        groupedData[item.address] = { voters: 0, voteBoughts: 0 };
      }
      if (item.voterStatus) {
        groupedData[item.address].voters += 1;
      }
      if (item.voteBoughtStatus) {
        groupedData[item.address].voteBoughts += 1;
      }
    });
    return groupedData;
  };

  const groupedData = groupDataByAddress(dataFromDataPage);
  const filteredData = selectedAddress ? { [selectedAddress]: groupedData[selectedAddress] } : groupedData;

  const graphData = Object.keys(filteredData).map((address) => ({
    name: address,
    voters: filteredData[address].voters,
    voteBoughts: filteredData[address].voteBoughts,
  }));

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const response = await LocationService.getAllMunicipality();
        const data = response.data;
        const options = data.map(municipality => ({
          value: municipality.citymunCode,
          label: `${municipality.citymunDesc}`
        }));
        setMunicipalities(options);
        const initialValue = options[0];
        console.log(initialValue);
        setSelectedMunicipality(initialValue);
      } catch (error) {
        console.error('Error fetching municipalities:', error);
      }
    };

    fetchMunicipalities();
  }, []);

  const [graphData2, setGraphData2] = useState([]);

  const handleMunicipalityChange = async (selectedOption) => {
    if (selectedOption) {
      setSelectedMunicipality(selectedOption);

      // Pass the selected municipality code to the parent component
      onMunicipalityChange(selectedOption.value); // Assuming value holds the code
      try {
        const response = await LocStatService.getStatsByMuni(selectedOption.value);
        const { data /* Assuming data structure from service */ } = response.data; // Replace with actual data structure
        console.log(response.data);

        // Process and format data for the graph
        const formattedData = [
          /* Process data from response and create graph data points */
          { name: "Total Residence", value: response.data.totalRes, color: '#8884d8', fill: '#8884d8', payload:'{value: response.data.totalRes}' },
          { name: "Total Recruited", value: response.data.totalVb, color: '#17a2b8', fill: '#17a2b8',  payload:'{value: response.data.totalRes}' },
          // ... more data points
        ];
        setGraphData2(formattedData);
      } catch (error) {
        console.error('Error fetching municipality stats:', error);
      }
    }
  };
  return (
    <div>
      <Select
        options={municipalities}
        placeholder="Select Municipality"
        isClearable
        defaultValue={selectedMunicipality}
        onChange={handleMunicipalityChange} // Handle changes
      />
      <ResponsiveContainer width="100%" height={250}>

        <PieChart>
          <Pie
            data={graphData2}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
          />
          <Tooltip />
          <Legend formatter={(name, entry) => `${name} (${entry.payload.value})`}/>
        </PieChart>
      </ResponsiveContainer>
    </div>



  );
};

export default MunicipalityDropdown;