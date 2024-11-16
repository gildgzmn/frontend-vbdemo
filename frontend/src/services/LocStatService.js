import axios from 'axios';

class LocStatService {

  static baseUrl = 'http://localhost:8080/stats';

  static async getOverAllStats() {
    try {
      const response = await axios.get(`${this.baseUrl}/overall`);
      return response;
    } catch (error) {
      console.error('Error fetching loc stat data:', error);
      throw error;
    }
  }

  static async getStatsByMuni(muniCode) {
    try {
      const response = await axios.get(`${this.baseUrl}/muni/${muniCode}`);
      return response;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
 
// getOverAllStats = async () => {
//     const response = await axios.get(`${baseUrl}/overall`);
//     return response.data;
// };

// getStatsByMuni = async (muniCode) => {
//     const response = await axios.get(`${baseUrl}/muni/${muniCode}`);
//     return response.data;
// };


// getStatsByBrgy = async (brgyCode) => {
//     const response = await axios.get(`${baseUrl}/overall/${brgyCode}`);
//     return response.data;
// };
}

export default LocStatService;

