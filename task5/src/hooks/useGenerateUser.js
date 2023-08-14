import { useState, useEffect } from "react";
import { fakerRU, fakerPL, fakerTR } from "@faker-js/faker";

const faker = {
  ru: fakerRU,
  pl: fakerPL,
  tr: fakerTR,
};

const useGenerateData = (region, seed) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const generateRandomData = () => {
    const newData = [];
    const numRecordsPerPage = isInitialLoad ? 20 : 10;

    for (let i = 0; i < numRecordsPerPage; i++) {
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
    setIsInitialLoad(false);
    setIsLoading(false);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition + windowHeight >= documentHeight && !isLoading) {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    generateRandomData();
  }, [region, seed, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { data, isLoading };
};

export default useGenerateData;
