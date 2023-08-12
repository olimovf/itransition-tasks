import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

const UserDataTable = () => {
  const [region, setRegion] = useState("Poland");
  const [errors, setErrors] = useState(0);
  const [seed, setSeed] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const generateRandomData = () => {
    const newData = [];
    const numRecordsPerPage = 20;

    for (let i = 0; i < numRecordsPerPage; i++) {
      const randomIdentifier = faker.string.uuid();
      const firstName = faker.person.firstName();
      const middleName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const address = faker.location.streetAddress();
      const phoneNumber = faker.phone.number();

      // Introduce errors based on the 'errors' state
      const errorRate = errors / 10;
      let nameWithError = `${firstName} ${middleName} ${lastName}`;

      for (let j = 0; j < nameWithError.length; j++) {
        if (Math.random() < errorRate) {
          const errorType = Math.floor(Math.random() * 3);

          if (errorType === 0) {
            // Delete character
            nameWithError =
              nameWithError.slice(0, j) + nameWithError.slice(j + 1);
          } else if (errorType === 1) {
            // Add random character
            const randomChar = faker.random.alphaNumeric();
            nameWithError =
              nameWithError.slice(0, j) + randomChar + nameWithError.slice(j);
          } else if (errorType === 2 && j < nameWithError.length - 1) {
            // Swap characters
            nameWithError =
              nameWithError.slice(0, j) +
              nameWithError.charAt(j + 1) +
              nameWithError.charAt(j) +
              nameWithError.slice(j + 2);
            j++; // Skip the next character in the loop
          }
        }
      }

      newData.push({
        randomIdentifier,
        name: nameWithError,
        address,
        phoneNumber,
      });
    }

    setData(newData);
  };

  useEffect(() => {
    generateRandomData();
  }, [region, errors, seed, page]);

  return (
    <div className="container mt-5">
      <h1>Fake User Data Generator</h1>
      <div className="mb-3">
        <label htmlFor="region" className="form-label">
          Select Region:
        </label>
        <select
          id="region"
          className="form-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="Poland">Poland</option>
          <option value="USA">USA</option>
          <option value="Georgia">Georgia</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="errors" className="form-label">
          Number of Errors per Record:
        </label>
        <input
          type="range"
          className="form-range"
          id="errors"
          min="0"
          max="10"
          step="1"
          value={errors}
          onChange={(e) => setErrors(parseInt(e.target.value))}
        />
        <div className="text-center">{errors} errors</div>
      </div>
      <div className="mb-3">
        <label htmlFor="seed" className="form-label">
          Seed Value (or leave empty for random seed):
        </label>
        <input
          type="text"
          className="form-control"
          id="seed"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary mb-3"
        onClick={() => generateRandomData()}
      >
        Randomize Data
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Random Identifier</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={record.randomIdentifier}>
              <td>{index + 1}</td>
              <td>{record.randomIdentifier}</td>
              <td>{record.name}</td>
              <td>{record.address}</td>
              <td>{record.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;
