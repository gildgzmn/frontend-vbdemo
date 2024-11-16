import React, { useState } from "react";
import { motion } from "framer-motion";
import Capitol from "../assets/Capitol_Batangas3.jpg";
import Logo from "../assets/Seal_of_Batangas.png";
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

// Temporary sample data from DataPage
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
    voterStatus: true, // Registered
    voteBought: false, // Not Yet Paid
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
    voterStatus: true, // Registered
    voteBought: true, // Paid
  },
];

// Data summary
const getSummaryData = (data) => {
  const totalVoters = data.filter((item) => item.voterStatus).length;
  const totalPaidVotes = data.filter((item) => item.voteBought).length;
  const totalNotVoters = data.filter((item) => !item.voterStatus).length;
  const totalNotPaidVotes = data.filter((item) => !item.voteBought).length;

  return {
    totalVoters,
    totalPaidVotes,
    totalNotVoters,
    totalNotPaidVotes,
  };
};

// Group data by address
const groupDataByAddress = (data) => {
  const groupedData = {};
  data.forEach((item) => {
    const address = `${item.brgyCode} ${item.muniCode}`;
    if (!groupedData[address]) {
      groupedData[address] = { voters: 0, paidVotes: 0, notPaidVotes: 0 };
    }
    if (item.voterStatus) {
      groupedData[address].voters += 1;
    }
    if (item.voteBought) {
      groupedData[address].paidVotes += 1;
    } else {
      groupedData[address].notPaidVotes += 1;
    }
  });
  return groupedData;
};

const LandingPage = () => {
  const { totalVoters, totalPaidVotes, totalNotVoters, totalNotPaidVotes } = getSummaryData(dataFromDataPage);
  const [selectedAddress, setSelectedAddress] = useState("");
  const groupedData = groupDataByAddress(dataFromDataPage);
  const filteredData = selectedAddress ? { [selectedAddress]: groupedData[selectedAddress] } : groupedData;
  const graphData = Object.keys(filteredData).map((address) => ({
    name: address,
    voters: filteredData[address].voters,
    paidVotes: filteredData[address].paidVotes,
    notPaidVotes: filteredData[address].notPaidVotes,
  }));

  const barGraphDataRegistered = [
    { name: "Registered", value: totalVoters },
    { name: "Non-Registered", value: totalNotVoters },
  ];

  const barGraphDataPaidStatus = [
    { name: "Paid", value: totalPaidVotes },
    { name: "Not Paid", value: totalNotPaidVotes },
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
            PROVINCIAL GOVERNMENT <br />OF BATANGAS
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
          <motion.div className="bg-gray-900 p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold">Total Registered Residents</h3>
            <p className="text-xl">{totalVoters}</p>
          </motion.div>
          <motion.div className="bg-gray-900 p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold">Total Paid Residents</h3>
            <p className="text-xl">{totalPaidVotes}</p>
          </motion.div>
          <motion.div className="bg-gray-900 p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold">Total Non-Registered Residents</h3>
            <p className="text-xl">{totalNotVoters}</p>
          </motion.div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Line Chart */}
          <motion.div className="bg-white p-4 rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
            <h3 className="text-xl font-semibold mb-4 text-center">Registered and Paid Residents per Address</h3>
            <div className="mb-4 text-center">
              <select
                className="border p-2 rounded"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                <option value="">All Addresses</option>
                {Object.keys(groupedData).map((address) => (
                  <option key={address} value={address}>
                    {address}
                  </option>
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
                <Line
                  type="monotone"
                  dataKey="voters"
                  stroke="#4CAF50"
                  activeDot={{ r: 8 }}
                  name="Registered Residents"
                />
                <Line
                  type="monotone"
                  dataKey="paidVotes"
                  stroke="#17a2b8"
                  activeDot={{ r: 8 }}
                  name="Paid Residents"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart for Registered vs Non */}
          <motion.div className="bg-white p-4 rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
            <h3 className="text-xl font-semibold mb-4 text-center">Registered vs Non-Registered</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barGraphDataRegistered}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis dataKey="name" stroke="#3a3b3c" />
                <YAxis stroke="#3a3b3c" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#214252FF" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart for Paid vs Not Paid */}
          <motion.div className="bg-white p-4 rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
            <h3 className="text-xl font-semibold mb-4 text-center">Paid Residents Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barGraphDataPaidStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#dc3545" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
