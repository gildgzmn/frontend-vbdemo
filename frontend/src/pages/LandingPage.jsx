import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Capitol from "../assets/Capitol_Batangas3.jpg";
import Logo from "../assets/Seal_of_Batangas.png";
import LocStatService from "../services/LocStatService";
import MunicipalityDropdown from "../components/ui/MunicipalityDropdown";
import LocationService from "../services/LocationService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import MainDashBoard from "../components/ui/mainDashBoard";

const LandingPage = () => {
  console.log("new");

  const [summaryData, setSummaryData] = useState({
    totalRes: 0,
    totalVb: 0,
    percentage: "",
  });

  const [muniSummaryData, setMuniSummaryData] = useState({
    totalRes: 0,
    totalVb: 0,
    percentage: "",
  });

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      try {
        const response = await LocStatService.getOverAllStats();
        const { totalRes, totalVb, percentage } = response.data;
        setSummaryData({ totalRes, totalVb, percentage });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      try {
        const response = await LocStatService.getStatsByMuni();
        const { totalRes, totalVb, percentage } = response.data;
        setMuniSummaryData({ totalRes, totalVb, percentage });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //getMunicipalityList
  const [municipalities, setMunicipalities] = useState([]);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const response = await LocationService.getAllMunicipality();
        console.log("data");
        console.log(response);
        const data = response.data;
        const options = data.map((municipality) => ({
          value: municipality.citymunCode,
          label: `${municipality.citymunDesc} - ${municipality.provDesc}`,
        }));
        setMunicipalities(options);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
      }
    };

    fetchMunicipalities();
  }, []);

  const [selectedMunicipalityCode, setSelectedMunicipalityCode] =
    useState(null);

  const handleMunicipalityChange = (municipalityCode) => {
    console.log(municipalityCode);
    setSelectedMunicipalityCode(municipalityCode);

    // Fetch data for the selected municipality and update your graph component
    // const graphData = await LocStatService.getStatsByMunicipality(municipalityCode);
    // updateGraphData(graphData); // Update graph component with fetched data (replace with your actual update logic)
  };

  // //const { totalVoters, totalBoughtVotes, totalNotVoters } = getSummaryData(dataFromDataPage);
  // const [selectedAddress, setSelectedAddress] = useState("");
  // const groupedData = groupDataByAddress(dataFromDataPage);
  // const filteredData = selectedAddress ? { [selectedAddress]: groupedData[selectedAddress] } : groupedData;

  const barGraphData = [
    { name: "Residents", value: summaryData.totalRes },
    { name: "Recruited", value: summaryData.totalVb },
  ];

  return (
    <div className="relative landing-page">
      {/* Header Section */}
      <div
        style={{
          backgroundImage: `linear-gradient(to top, rgba(38, 39, 43, 0.8), rgba(38, 39, 43, 0.5)), url(${Capitol})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="text-center text-white">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold"
            style={{
              paddingBottom: "40px",
              fontFamily: "Poppins",
              textShadow: "6px 6px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            PROVINCIAL GOVERNMENT <br />
            OF BATANGAS
          </motion.h1>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            alt="Logo"
            src={Logo}
            style={{
              height: "250px",
              width: "250px",
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      </div>

      {/* Data Summary Section */}
      <div className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold">Total Residents</h3>
            <p className="text-xl">{summaryData.totalRes}</p>
          </motion.div>
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold">Total Recruited</h3>
            <p className="text-xl">{summaryData.totalVb}</p>
          </motion.div>
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold">Recruitment Percentage</h3>
            <p className="text-xl">{summaryData.percentage}</p>
          </motion.div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Bar Chart for Vote Bought Status */}
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              Overall Recruitment Status
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barGraphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#17a2b8" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          {/* Line Chart */}
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              Recruitment Per Municipality
            </h3>
            <div className="mb-4 text-center">
              <MunicipalityDropdown
                onMunicipalityChange={handleMunicipalityChange}
              />
              {/* <select className="border p-2 rounded" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                <option value="">All Addresses</option>
                {Object.keys(groupedData).map((address) => (
                  <option key={address} value={address}>{address}</option>
                ))}
              </select> */}
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              Recruitment Per Municipality
            </h3>
            <div className="mb-4 text-center">
              <MunicipalityDropdown
                onMunicipalityChange={handleMunicipalityChange}
              />
              {/* <select className="border p-2 rounded" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                <option value="">All Addresses</option>
                {Object.keys(groupedData).map((address) => (
                  <option key={address} value={address}>{address}</option>
                ))}
              </select> */}
            </div>
          </motion.div>
        </div>
        {/* {main dashboard section} */}
        <div className="max-w-7xl mx-auto mt-8">
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Recruitment Percentage Per Municipality
            </h3>
            <div
              style={{
                width: "100%",
                height: "280px", // Set a fixed height
                overflowY: "auto", // Enable vertical scrolling
                overflowX: "hidden", // Disable horizontal scrolling
              }}
            >
              <MainDashBoard />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
