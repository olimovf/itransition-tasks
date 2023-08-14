import { useState, useEffect } from "react";
import { fakerRU, fakerPL, fakerTR } from "@faker-js/faker";

const faker = {
  ru: fakerRU,
  pl: fakerPL,
  tr: fakerTR,
};
const alphabet = {
  ru: "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя",
  pl: "AaĄąBbCćDdEęĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż",
  tr: "AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz",
};

const useGenerateData = (region, seed, errorRate) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const makeError = (input, rate) => {
    if (rate <= 0) return input;
    rate = parseInt(rate);

    const errors = ["delete", "add", "swap"];
    let errorIndex = 0;
    const modified = [...input];

    while (rate--) {
      const selectedError = errors[errorIndex++ % errors.length];
      const i = Math.floor(Math.random() * input.length); // random index to introduce error

      if (selectedError === "delete") {
        modified.splice(i, 1);
      } else if (selectedError === "add") {
        if (/\d|\+|\(|\)|\-/.test(modified[i])) {
          modified.splice(i, 0, Math.floor(Math.random() * 10));
        } else {
          const randomChar =
            alphabet[region][
              Math.floor(Math.random() * alphabet[region].length)
            ];
          modified.splice(i, 0, randomChar);
        }
      } else if (selectedError === "swap") {
        if (i < input.length - 1) {
          [modified[i], modified[i + 1]] = [modified[i + 1], modified[i]];
        } else {
          [modified[i], modified[i - 1]] = [modified[i - 1], modified[i]];
        }
      }
    }

    return modified.join("");
  };

  const generateRandomData = (num) => {
    const newData = [];

    for (let i = 0; i < num; i++) {
      const randomID = faker[region].string.uuid();
      const fullName = faker[region].person.fullName();
      const address = faker[region].location.streetAddress();
      const phoneNumber = faker[region].phone.number();

      newData.push({
        randomID,
        fullName,
        address,
        phoneNumber,
      });
    }

    setData((prevData) => [...prevData, ...newData]);
    setIsLoading(false);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition + windowHeight >= documentHeight - 50 && !isLoading) {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const generateDataWithErrors = (data, errorRate) => {
    // example: errorRate = 6.25
    const intPart = Math.floor(errorRate); // 6
    const fracPart = Math.floor((errorRate - intPart) * 100); // 25
    const p = Math.floor(100 / fracPart); // 4 => one of every 4 users should have 6 + 1 = 7 errors

    return data.map(({ randomID, fullName, address, phoneNumber }, ind) => ({
      randomID,
      fullName: makeError(fullName, errorRate + (ind % p === 0)),
      address: makeError(address, errorRate + (ind % p === 0)),
      phoneNumber: makeError(phoneNumber, errorRate + (ind % p === 0)),
    }));
  };

  useEffect(() => {
    const newDataWithErrors = generateDataWithErrors(data, errorRate);
    setData(newDataWithErrors);
  }, [errorRate]);

  useEffect(() => {
    generateRandomData(10);
  }, [page]);

  useEffect(() => {
    setData([]);
    generateRandomData(20);
  }, [region]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { data, isLoading };
};

export default useGenerateData;
