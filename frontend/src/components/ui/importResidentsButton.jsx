
import React, { useState, useEffect } from 'react';
import { importResidentData } from "../../services/apiService"; // Import the API method

function ImportResidentButton() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await importResidentData();
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
      <button onClick={fetchData}>Import Data to Database</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <p>Data: {JSON.stringify(data)}</p>
      ) : null}
    </div>
  );
}

export default ImportResidentButton;