import { useState, useEffect } from "react";
import { generateDataWithErrors } from "../utils";
import { faker } from "../utils/constants";

const useGenerateData = (region, seed, errorRate) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomData = (num, seedValue) => {
    const newData = [];

    const pageSeed = seedValue + page;
    faker[region].seed(pageSeed);

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

    setData((prevData) => {
      if (!prevData) return newData;
      const combined = [...prevData, ...newData];
      localStorage.setItem("data", JSON.stringify(combined));
      return combined;
    });
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

  useEffect(() => {
    const newDataWithErrors = generateDataWithErrors(
      JSON.parse(localStorage.getItem("data")),
      region,
      errorRate
    );
    setData(newDataWithErrors);
  }, [errorRate]);

  useEffect(() => {
    generateRandomData(10, seed);
  }, [page]);

  useEffect(() => {
    setPage(1);
    setData([]);
    generateRandomData(20, seed);
  }, [region, seed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { data, isLoading };
};

export default useGenerateData;
