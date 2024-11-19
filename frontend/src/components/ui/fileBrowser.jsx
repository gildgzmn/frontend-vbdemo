import React, { useState } from 'react';

const FileBrowser = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    console.log(event.target)
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    // Handle file upload logic here
    // You can access the selected file using `selectedFile`
    console.log(selectedFile);
  };

  const handleFileRead   
  = () => {
     if (selectedFile) {
       const reader = new FileReader();
       reader.onload = (e) => {
         const fileContent = e.target.result;
         // Process the file content here (e.g., display, save, send to backend)
         console.log(fileContent);
       };
       reader.readAsText(selectedFile);
     }
   };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileBrowser;