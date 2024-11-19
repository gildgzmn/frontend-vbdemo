import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Capitol from "../assets/Capitol_Batangas3.jpg";
import Logo from "../assets/Seal_of_Batangas.png";
import ImportResidentButton from "../components/ui/importResidentsButton";
import ExportToExcelMuniBulk from "../components/ui/exportToExcelPerMunicipality";

const UtilitiesPage = () => {

  return (
    <div>
      {/* Data Summary Section */}
      <div className="bg-gray-800 text-white py-8 px-4 pt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <motion.div className="bg-gray-900 p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <ImportResidentButton />
          </motion.div>
          <motion.div className="bg-gray-900 p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <ExportToExcelMuniBulk/>
          </motion.div>
        </div>
      </div>
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
      </div >
    </div>

  );
};


export default UtilitiesPage;
