const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const folderPath = "data";
const email = "myemail@gmail.com"; // replace it with your real email address

const calculateSHA3_256 = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return crypto.createHash("sha3-256").update(fileData).digest("hex");
};

const getAllFiles = (folderPath) => {
  const files = fs.readdirSync(folderPath);
  return files.map((file) => path.join(folderPath, file));
};

const resultStr = () => {
  let res = "";
  const filesInFolder = getAllFiles(folderPath);

  res =
    filesInFolder
      .map((file) => calculateSHA3_256(file))
      .sort()
      .join("") + email.toLowerCase();

  return crypto.createHash("sha3-256").update(res).digest("hex");
};

console.log(resultStr());
