import axios from 'axios';

class LocStatService {

    static baseUrl = 'http://localhost:8080/import';
  
    static async getAllMunicipality() {
      try {
        const response = await axios.get(`${this.baseUrl}/muni`);
        return response;
      } catch (error) {
        console.error('Error fetching loc stat data:', error);
        throw error;
      }
    }
  
    static async getAllBarangayPerMunicipality(muniCode) {
      try {
        const response = await axios.get(`${this.baseUrl}/muni/${muniCode}/brgy`);
        return response;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    }
   
  
  }
  
  export default LocStatService;