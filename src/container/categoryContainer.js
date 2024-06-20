import React, { useEffect, useState } from "react";
import axios from "axios";
import debounce from "../utils/debounce";

const CategoryContainer = ({ setLoading, data, setData }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const [filteredArr, setFilteredArr] = useState({ brand: [], price: [] });

  useEffect(() => {
    setLoading(true);
    if (!categoryData?.length) {
      axios
        .get("https://dummyjson.com/products/categories")
        .then((response) => setCategoryData(response.data))
        .catch((error) => error);
    }
  }, []);

  const handleChangeCategory = (item) => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/category/${item}`)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.products);
          setLoading(false);
        }
      })
      .catch((error) => error);
  };

  const handleChange = debounce((e) => {
    setLoading(true);
    let value = e.target.value;

    axios
      .get(`https://dummyjson.com/products/search?q=${value.toLowerCase()}`)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.products);
          setLoading(false);
        }
      })
      .catch((error) => error);
  }, 800);

  const handleBrandChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFilteredArr((prev) => ({
        ...prev,
        brand: [...filteredArr?.brand, value],
      }));
    } else {
      setFilteredArr((prev) => ({
        ...prev,
        brand: [...filteredArr?.brand?.filter((val) => val !== value)],
      }));
    }
  };
  const handleRangeChange = (e) => {
    const [max, min] = e;
    setFilteredArr((prev) => ({
      ...prev,
      price: [min, max],
    }));
  };

  const handleFilterClear = () => {
    setBrandData([]);
    setFilteredArr([]);
  };
  useEffect(() => {
    const newData = [...data];
    let brand = newData.filter((item) =>
      filteredArr?.brand?.includes(item.brand)
    );
    brand = (brand.length ? brand : newData).filter(
      (item) =>
        item.price > filteredArr?.price?.[1] &&
        item.price < filteredArr?.price?.[0]
    );

    setBrandData(brand);
  }, [filteredArr, data]);

  return {
    categoryData,
    setCategoryData,
    handleChangeCategory,
    handleChange,
    handleBrandChange,
    handleFilterClear,
    brandData,
    filteredArr,
    handleRangeChange,
  };
};

export default CategoryContainer;
