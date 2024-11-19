import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DataPage from './pages/DataPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from "./pages/ProfilePage";
import Navbar from './components/ui/navbar';
import Footer from './components/ui/footer';
import UtilitiesPage from './pages/UtilitiesPage';

function App() {
  
  const data = [
    { id: 1, firstName: "John", middleName: "D.", lastName: "Doe", mobileNum: "123-4567", age: 25, gender: "Male", brgyCode: "1", muniCode: "A", voterStatus: true, voteBought: false },
    { id: 2, firstName: "Jane", middleName: "M.", lastName: "Smith", mobileNum: "987-6543", age: 30, gender: "Female", brgyCode: "2", muniCode: "B", voterStatus: true, voteBought: true },

  ];

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/profile/:id" element={<ProfilePage data={data} />} />
        <Route path="/utilities" element={<UtilitiesPage/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
