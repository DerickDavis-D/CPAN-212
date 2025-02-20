import { useState } from "react";
import './App.css';

const App = () => {
  // State Management
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [message, setMessage] = useState("");
  const [multipleUploadFiles, setMultipleUploadFiles] = useState([]);
  const [dogImage, setDogImage] = useState('');

  // Backend URL
  const backendUrl = "http://localhost:8009";

  // Handle Single File Selection
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
      console.log("Selected File:", e.target.files[0]); // Debugging
    }
  };
  
    // Upload Single File
    const handleSubmitSingleFile = async (e) => {
      e.preventDefault();
      if (!singleFile) {
        setMessage("Please select a file before uploading.");
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append("file", singleFile);
  
        const response = await fetch(`${backendUrl}/save/single`, {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || "Image upload failed");
        }
        setMessage("File uploaded successfully!");
      } catch (error) {
        console.error("Error:", error);
      }
    };

  // Handle Multiple File Selection
  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMultipleUploadFiles(files);
    console.log("Selected Files:", files); // Debugging
  };
  

  // Fetch Single Random Image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`${backendUrl}/fetch/single`);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  // Upload Multiple Files
  const handleSubmitMultipleFiles = async (e) => {
    e.preventDefault();
    if (multipleUploadFiles.length === 0) {
      setMessage("Please select files before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      multipleUploadFiles.forEach(file => formData.append("files", file));

      const response = await fetch(`${backendUrl}/save/multiple`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error uploading multiple files:", error);
    }
  };

  // Fetch Multiple Random Images
  const fetchMultipleFiles = async () => {
    try {
      const response = await fetch(`${backendUrl}/fetch/multiple`);
      const filenames = await response.json();
      setMultipleFiles(filenames);
    } catch (error) {
      console.error("Error fetching multiple files:", error);
    }
  };

  // Fetch Random Dog Image
  const fetchDogImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

  // Save Dog Image to Server
  const saveDogImage = async () => {
    if (!dogImage) {
      setMessage("No dog image to save");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/save/dog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: dogImage }),
      });

      if (!response.ok) {
        throw new Error("Failed to save dog image");
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error saving dog image:", error);
    }
  };

  return (
    <div>
      <p>{message}</p>

      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displayImage}
            alt="Display Image"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}

      <h2>Upload Single File</h2>
      <form onSubmit={handleSubmitSingleFile}>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>

      <h2>Upload Multiple Files</h2>
      <form onSubmit={handleSubmitMultipleFiles}>
        <input type="file" onChange={handleMultipleFileChange} multiple />
        <button type="submit">Upload Multiple Files</button>
      </form>

      <h2>Fetch Multiple Random Images</h2>
      <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
      <div className="gallery">
        {multipleFiles.map((file, index) => (
          <img
            key={index}
            src={`${backendUrl}/fetch/file/${file}`}
            alt={`Random ${index}`}
            className="gallery-image"
          />
        ))}
      </div>

      <h2>Random Dog Image</h2>
      <button onClick={fetchDogImage}>Get Random Dog Image</button>
      {dogImage && (
        <div className="dog-image-container">
          <img
            src={dogImage}
            alt="Random Dog"
            className="dog-image"
          />
          <button onClick={saveDogImage}>Save Dog Image</button>
        </div>
      )}
    </div>
  );
};

export default App;
