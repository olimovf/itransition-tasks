import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useGenerateData from "../hooks/useGenerateUser";
import { exportToCSV, getRandomValue } from "../utils";

const UserDataTable = () => {
  const [region, setRegion] = useState("ru");
  const [seed, setSeed] = useState(() => getRandomValue());
  const [errorRate, setErrorRate] = useState(0);

  const debouncedErrorRate = useDebounce(errorRate, 300);
  const { data, isLoading } = useGenerateData(region, seed, debouncedErrorRate);

  const handleErrorChange = (e) => {
    setErrorRate(Math.min(Number(e.target.value), Number(e.target.max)));
  };

  useEffect(() => {
    setErrorRate(0);
  }, [seed]);

  return (
    <div className="container-xl my-4">
      <div className="row mb-3">
        <div className="col col-12 col-md-6 col-lg-4 col-xl-2 my-2">
          <label htmlFor="region" className="form-label fw-medium">
            Select Region:
          </label>
          <select
            id="region"
            className="form-select"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="ru">Russia</option>
            <option value="pl">Poland</option>
            <option value="tr">Turkey</option>
          </select>
        </div>
        <div className="col col-12 col-md-6 col-lg-4 col-xl-3 my-2">
          <label htmlFor="seed" className="form-label fw-medium">
            Seed Value:
          </label>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary w-100"
              onClick={() => setSeed(getRandomValue())}
            >
              Random Seed
            </button>
            <input
              type="number"
              className="form-control"
              id="seed"
              min={0}
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="col col-12 col-md-9 col-lg-4 col-xl-5 my-2">
          <label htmlFor="slider" className="form-label fw-medium">
            Error Range
          </label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="range"
              className="form-range"
              id="slider"
              min={0}
              max={10}
              step={0.25}
              value={errorRate}
              onChange={(e) => setErrorRate(Number(e.target.value))}
            />
            <input
              type="number"
              className="form-control"
              min={0}
              step={0.25}
              max={1000}
              value={errorRate}
              onChange={handleErrorChange}
            />
          </div>
        </div>
        <div className="col col-12 col-md-3 col-lg-4 col-xl-2 my-2">
          <label htmlFor="export-btn" className="form-label fw-medium">
            Export
          </label>
          <button
            id="export-btn"
            className="btn btn-primary w-100"
            onClick={() => exportToCSV(data)}
          >
            Export to CSV
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th className="border border-primary border-2">Index</th>
              <th className="border border-primary border-2">
                Random Identifier
              </th>
              <th className="border border-primary border-2">Name</th>
              <th className="border border-primary border-2">Address</th>
              <th className="border border-primary border-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record, index) => (
              <tr key={record.randomID}>
                <td className="border border-primary border-2">{index + 1}</td>
                <td className="border border-primary border-2">
                  {record.randomID}
                </td>
                <td className="border border-primary border-2">
                  {record.fullName}
                </td>
                <td className="border border-primary border-2">
                  {record.address}
                </td>
                <td className="border border-primary border-2">
                  {record.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && (
          <div className="d-flex gap-2">
            {Array.from(Array(3)).map((_, ind) => (
              <div
                key={ind}
                className="spinner-grow spinner-grow-sm text-primary my-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDataTable;
