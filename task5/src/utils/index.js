import { ExportToCsv } from "export-to-csv";

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

const MAX_RANDOM_VALUE = 1e6;
export const getRandomValue = () => {
  return Math.floor(Math.random() * MAX_RANDOM_VALUE);
};
