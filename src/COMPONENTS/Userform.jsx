import { useState } from "react";
import { submitUserData } from "../SERVICES/Api.js";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", socialHandle: "" });
  const [files, setFiles] = useState([null]); // Initially one file input
  const [fileCount, setFileCount] = useState(1); // Keep track of the number of inputs
  const [loading, setLoading] = useState(false); // Loading state for submit button

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0]; // Update the selected file for the given input
    setFiles(newFiles);
  };

  const handleAddFileInput = () => {
    if (fileCount < 10) {
      setFileCount(fileCount + 1); // Add a new file input
      setFiles([...files, null]); // Add a new null value for the new file input
    }
  };

  const handleRemoveFileInput = (index) => {
    const newFiles = files.filter((_, i) => i !== index); // Remove the file at the specified index
    setFiles(newFiles);
    setFileCount(fileCount - 1); // Decrement the file count
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    // Create a FormData object to send data to the backend
    const data = new FormData();
    data.append("name", formData.name);
    data.append("socialHandle", formData.socialHandle);

    // Loop through the files and append them to FormData
    files.forEach((file) => {
      if (file) data.append("images", file); // Only append if file is selected
    });

    try {
      const res = await submitUserData(data); // Call the API
      alert(res.data.message);
      setFormData({ name: "", socialHandle: "" }); // Reset input fields
     setFiles([null]); // Reset file inputs to the initial state
     setFileCount(1);
      
    } catch (error) {
      console.error(error);
      alert("Error submitting user data.");
      setFormData({ name: "", socialHandle: "" }); // Reset input fields
      setFiles([null]); // Reset file inputs to the initial state
      setFileCount(1);
      
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 mt-0 sm:mt-10"
    >
      <h2 className="text-2xl font-bold text-gray-800">Submit User Data</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="socialHandle" className="block text-sm font-medium text-gray-700 mb-1">
          Social Handle
        </label>
        <input
          id="socialHandle"
          type="text"
          placeholder="Enter your social handle"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.socialHandle}
          onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Images
        </label>

        {files.map((file, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <input
              type="file"
              onChange={(e) => handleFileChange(e, index)} // Handle file selection
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveFileInput(index)} // Remove file input
                className="text-red-500 font-bold text-sm hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
        ))}

        {/* Add More Button */}
        {fileCount < 10 && (
          <button
            type="button"
            onClick={handleAddFileInput}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add More
          </button>
        )}
      </div>

      <button
        type="submit"
        className={`${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-500"
        } text-white px-6 py-3 rounded-md flex items-center justify-center`}
        disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : null}
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default UserForm;
