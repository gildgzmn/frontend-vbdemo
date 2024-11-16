import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Capitol from "../assets/Capitol_Batangas3.jpg";
import Logo from "../assets/Seal_of_Batangas.png";
import LocStatService from "../services/LocStatService";


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

// temporary sample data from DataPage
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

//  data summary
// const getSummaryData = (data) => {
//   const totalVoters = data.filter((item) => item.voterStatus).length;
//   const totalBoughtVotes = data.filter((item) => item.voteBoughtStatus).length;
//   const totalNotVoters = data.filter((item) => !item.voterStatus).length;

//   return {
//     totalVoters,
//     totalBoughtVotes,
//     totalNotVoters,
//   };
// };

// group data by address
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

const LandingPage = () => {
  console.log("new");

  
  const [summaryData, setSummaryData] = useState({
    totalRes: 0,
    totalVb: 0,
    percentage: ""
  });

  const [MuniSummaryData, setMuniSummaryData] = useState({
    totalRes: 0,
    totalVb: 0,
    percentage: ""
  });

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      try {
        const response = await LocStatService.getOverAllStats();
        console.log(response)
        console.log(response.data);
        const { totalRes, totalVb, percentage} = response.data;
        setSummaryData({ totalRes, totalVb, percentage });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      try {
        const response = await LocStatService.getStatsByMuni();
        console.log(response)
        console.log(response.data);
        const { totalRes, totalVb, percentage} = response.data;
        setMuniSummaryData({ totalRes, totalVb, percentage });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //const { totalVoters, totalBoughtVotes, totalNotVoters } = getSummaryData(dataFromDataPage);
  const [selectedAddress, setSelectedAddress] = useState("");
  const groupedData = groupDataByAddress(dataFromDataPage);
  const filteredData = selectedAddress ? { [selectedAddress]: groupedData[selectedAddress] } : groupedData;
  const graphData = Object.keys(filteredData).map((address) => ({
    name: address,
    voters: filteredData[address].voters,
    voteBoughts: filteredData[address].voteBoughts,
  }));



  const barGraphData = [
    { name: "Voters", value: summaryData.totalRes },
    { name: "Non-Voters", value: summaryData.totalVb },
    { name: "Votes Bought", value: summaryData.totalVb },
  ];

  return (
    <div className="relative landing-page">
      {/* Header Section */}
      <div style={{ backgroundImage: `linear-gradient(to top, rgba(38, 39, 43, 0.8), rgba(38, 39, 43, 0.5)), url(${Capitol})`, backgroundSize: "cover", backgroundPosition: "center center", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div className="text-center text-white">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold"
            style={{ paddingBottom: "40px", fontFamily: "Poppins", textShadow: "6px 6px 8px rgba(0, 0, 0, 0.5)" }}
          >
            PROVINCIAL GOVERNMENT <br />OF BATANGAS
          </motion.h1>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            alt="Logo"
            src={Logo}
            style={{ height: "250px", width: "250px", objectFit: "contain", display: "block", margin: "0 auto" }}
          />
        </div>
      </div>

      {/* Data Summary Section */}
      <div className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <motion.div className="bg-gray-900 p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold">Total Voters</h3>
            <p className="text-xl">{summaryData.totalRes}</p>
          </motion.div> 
          <motion.div className="bg-gray-900 p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold">Total Votes Bought</h3>
            <p className="text-xl">{summaryData.totalVb}</p>
          </motion.div>
          <motion.div className="bg-gray-900 p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold">Total Non-Voters</h3>
            <p className="text-xl">{summaryData.percentage}</p>
          </motion.div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Line Chart */}
          <motion.div className="bg-white p-4 rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
            <h3 className="text-xl font-semibold mb-4 text-center">Voters and Vote Boughts per Address</h3>
            <div className="mb-4 text-center">
              <select className="border p-2 rounded" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                <option value="">All Addresses</option>
                {Object.keys(groupedData).map((address) => (
                  <option key={address} value={address}>{address}</option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="voters" stroke="#4CAF50" activeDot={{ r: 8 }} name="Voters" />
                <Line type="monotone" dataKey="voteBoughts" stroke="#17a2b8" activeDot={{ r: 8 }} name="Votes Bought" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart for Voters vs Non-Voters */}
          <motion.div className="bg-white p-4 rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
            <h3 className="text-xl font-semibold mb-4 text-center">Voter vs Non-Voter</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barGraphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis dataKey="name" stroke="3a3b3c" />
                <YAxis stroke="#3a3b3c" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#214252FF" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart for Vote Bought Status */}
          <motion.div className="bg-white p-4 rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
            <h3 className="text-xl font-semibold mb-4 text-center">Overall Recruitment Status</h3>
            <ResponsiveContainer width="100%" height={200}>
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
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
