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

  //localhost:8080/stats/percent-per-muni
  static async getStatsMain() {
    try {
      const response = await axios.get(`${this.baseUrl}/percent-per-muni`);
      return response;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
 

}

export default LocStatService;

