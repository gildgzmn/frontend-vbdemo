import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Fetch all municipalities
export const fetchAllMunicipalities = async () => {
  try {
    const response = await apiClient.get('/import/muni');
    return response.data;
  } catch (error) {
    console.error('Error fetching municipalities:', error);
    throw error;
  }
};

// Fetch all barangays
export const fetchAllBarangays = async () => {
  try {
    const response = await apiClient.get('/import/brgy');
    return response.data;
  } catch (error) {
    console.error('Error fetching barangays:', error);
    throw error;
  }
};

// Fetch all residents
export const fetchAllResidents = async () => {
  try {
    const response = await apiClient.get('/import/resident');
    return response.data;
  } catch (error) {
    console.error('Error fetching residents:', error);
    throw error;
  }
};

// Import municipality data
export const importMunicipalityData = async (data) => {
  try {
    const response = await apiClient.post('/import', data);
    return response.data;
  } catch (error) {
    console.error('Error importing municipality data:', error);
    throw error;
  }
};

// Import barangay data
export const importBarangayData = async (data) => {
  try {
    const response = await apiClient.post('/import/brgy', data);
    return response.data;
  } catch (error) {
    console.error('Error importing barangay data:', error);
    throw error;
  }
};

// Import resident data
export const importResidentData = async (data) => {
  try {
    const response = await apiClient.post('/import/resident', data);
    return response.data;
  } catch (error) {
    console.error('Error importing resident data:', error);
    throw error;
  }
};

// Fetch residents by barangay code
export const fetchResidentsByBarangay = async (brgyCode) => {
  try {
    const response = await apiClient.get(`/resident/${brgyCode}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching residents for barangay ${brgyCode}:`, error);
    throw error;
  }
};

// Fetch vaccination stats for barangay
export const fetchVaccinationStatsByBarangay = async (brgyCode) => {
  try {
    const response = await apiClient.get(`/resident/vb/${brgyCode}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vaccination stats for barangay ${brgyCode}:`, error);
    throw error;
  }
};

// Fetch residents by municipality code
export const fetchResidentsByMunicipality = async (muniCode) => {
  try {
    const response = await apiClient.get(`/resident/muni/${muniCode}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching residents for municipality ${muniCode}:`, error);
    throw error;
  }
};

// Fetch residents by municipality code and export to excel
export const exportBrgyResidentToExcelBulk = async (muniCode) => {
  try {
    const response = await apiClient.post(`export/resident/muni/${muniCode}/brgy/bulk`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching residents for municipality ${muniCode}:`, error);
    throw error;
  }
};

export const updateResident = async (residentData) => {
  try {
    const response = await apiClient.put('/resident/update', residentData);
    return response.data;
  } catch (error) {
    console.error('Error updating resident:', error);
    throw error;
  }
};

export const createResident = async (residentData) => {
  try {
    const response = await apiClient.post('/resident/create', residentData);
    return response.data;
  } catch (error) {
    console.error('Error creating resident:', error);
    throw error;
  }
};


export default apiClient;
