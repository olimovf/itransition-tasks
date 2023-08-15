import { ExportToCsv } from "export-to-csv";
import { alphabet, MAX_RANDOM_VALUE } from "./constants";

export const exportToCSV = (data) => {
  const csvExporter = new ExportToCsv({
    fieldSeparator: ",",
    filename: "Random users",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  });
  csvExporter.generateCsv(
    data.map((record, i) => ({
      "№": i + 1,
      "Random ID": record.randomID,
      "Full Name": record.fullName,
      Address: record.address,
      "Phone Number": record.phoneNumber,
    }))
  );
};

export const getRandomValue = () => {
  return Math.floor(Math.random() * MAX_RANDOM_VALUE);
};

const makeError = (region, input, rate, type) => {
  if (rate <= 0) return input;

  const errors = ["delete", "add", "swap"];
  let errorIndex = 0;
  const modified = [...input];

  while (rate--) {
    const selectedError = errors[errorIndex++ % errors.length];
    const i = Math.floor(Math.random() * input.length); // random index to introduce error

    if (selectedError === "delete") {
      modified.splice(i, 1);
    } else if (selectedError === "add") {
      if (type === "number") {
        modified.splice(i, 0, Math.floor(Math.random() * 10));
      } else {
        const randomChar =
          alphabet[region][Math.floor(Math.random() * alphabet[region].length)];
        modified.splice(i, 0, randomChar);
      }
    } else if (selectedError === "swap") {
      if (i < modified.length - 1) {
        [modified[i], modified[i + 1]] = [modified[i + 1], modified[i]];
      } else {
        [modified[i], modified[i - 1]] = [modified[i - 1], modified[i]];
      }
    }
  }

  return modified.join("");
};

export const generateDataWithErrors = (data, region, errorRate) => {
  const intPart = Math.floor(errorRate);
  const fracPart = Math.floor((errorRate - intPart) * 100);
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  const [p, r] = [100 / gcd(100, fracPart), fracPart / gcd(100, fracPart)];

  return data.map(({ randomID, fullName, address, phoneNumber }, ind) => ({
    randomID,
    fullName: makeError(region, fullName, intPart + (ind % p < r), "string"),
    address: makeError(region, address, intPart + (ind % p < r), "string"),
    phoneNumber: makeError(
      region,
      phoneNumber,
      intPart + (ind % p < r),
      "number"
    ),
  }));
};
