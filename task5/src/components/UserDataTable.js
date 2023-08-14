import { useState } from "react";
import useGenerateData from "../hooks/useGenerateUser";

// const alphabet = {
//   ru: "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя",
//   pl: "AaĄąBbCćDdEęĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż",
//   tr: "AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz",
// };

const MAX_RANDOM_VALUE = 1e6;

const UserDataTable = () => {
  const [region, setRegion] = useState("ru");
  const [seed, setSeed] = useState(
    Math.floor(Math.random() * MAX_RANDOM_VALUE)
  );
  const [errorRate, setErrorRate] = useState(0);
  const { data, isLoading } = useGenerateData(region, seed);

  const handleRandomClick = () => {
    const randomValue = Math.floor(Math.random() * MAX_RANDOM_VALUE);
    setSeed(randomValue);
  };

  // const introduceErrors = (input, rate) => {
  //   if (rate <= 0) return input;
  //   rate = parseInt(rate);

  //   const errors = ["delete", "add", "swap"];
  //   const modified = [...input];

  //   while (rate--) {
  //     const selectedError = errors[Math.floor(Math.random() * errors.length)];
  //     const i = Math.floor(Math.random() * input.length); // random index to introduce error

  //     if (selectedError === "delete") {
  //       modified.splice(i, 1);
  //     } else if (selectedError === "add") {
  //       const randomChar =
  //         alphabet[region][Math.floor(Math.random() * alphabet[region].length)];
  //       modified.splice(i, 0, randomChar);
  //     } else if (selectedError === "swap") {
  //       if (i < input.length - 1) {
  //         [modified[i], modified[i + 1]] = [modified[i + 1], modified[i]];
  //       } else {
  //         [modified[i], modified[i - 1]] = [modified[i - 1], modified[i]];
  //       }
  //     }
  //   }

  //   return modified.join("");
  // };

  return (
    <div className="container-xl my-5">
      <div className="row">
        <div className="col col-12 col-md-4">
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
              <option value="ru">Russia</option>
              <option value="pl">Poland</option>
              <option value="tr">Turkey</option>
            </select>
          </div>
        </div>
        <div className="col col-12 col-md-4">
          <div className="mb-3">
            <label htmlFor="seed" className="form-label">
              Seed Value:
            </label>
            <div className="d-flex gap-2">
              <input
                type="number"
                className="form-control"
                id="seed"
                min={0}
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
              />
              <button
                className="form-control btn btn-primary"
                onClick={handleRandomClick}
              >
                Random
              </button>
            </div>
          </div>
        </div>
        <div className="col col-12 col-md-4">
          <div className="mb-3">
            <label htmlFor="slider" className="form-label">
              Error range
            </label>
            <div className="d-flex align-items-center gap-2">
              <input
                type="range"
                className="form-range"
                id="slider"
                min={0}
                max={10}
                step={0.01}
                value={errorRate}
                onChange={(e) => setErrorRate(Number(e.target.value))}
              />
              <input
                type="number"
                className="form-control"
                min={0}
                max={1000}
                value={errorRate}
                onChange={(e) => setErrorRate(Number(e.target.value))}
              />
            </div>
          </div>
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
            {data.map((record, index) => (
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
