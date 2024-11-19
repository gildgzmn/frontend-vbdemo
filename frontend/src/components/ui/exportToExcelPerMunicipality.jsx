
import React, { useState, useEffect } from 'react';
import { exportBrgyResidentToExcelBulk} from "../../services/apiService"; // Import the API method

function ExportToExcelMuniBulk() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await exportBrgyResidentToExcelBulk("NASUGBU");
      setData(response.data);
    } catch (error) {
        console.log(error)
      setError('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Export Data to Excel per Municipality</button>
      {isLoading ? (
        <p>Exporting residents list to excel file...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <p>Data: {JSON.stringify(data)}</p>
      ) : null}
    </div>
  );
}

export default ExportToExcelMuniBulk;