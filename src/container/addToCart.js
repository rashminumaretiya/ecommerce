import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/actions/cart";

const AddToCart = () => {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState({});
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartItem")) || []
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!data.length) {
      axios
        .get("https://dummyjson.com/products")
        .then((res) => {
          if (res.status === 200) {
            setData(res.data.products);
            setLoading(false);
          }
        })
        .catch((error) => console.log("error", error));
    }
  }, []);

  const qtyCount = (id, stock, decrease = false) => {
    const filter = data.find((item) => item.id === id);
    if (filter) {
      const currentQty = quantity[id] || 1;
      const updatedQty = decrease
        ? Math.max(currentQty - 1, 1)
        : Math.min(currentQty + 1, stock);
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [id]: updatedQty,
      }));
    }
  };

  const addToCart = (item) => {
    const filterData = cartData?.findIndex((data) => data?.id === item?.id);

    const updatedItem = {
      id: item?.id,
      title: item?.title,
      price: item?.price,
      qty: quantity[item.id] || 1,
      priceTotal:
        item?.price * (quantity[item.id] || 1) -
        (item?.price / 100) * item.discountPercentage,
      stock: item?.stock,
      discountPercentage: item?.discountPercentage,
    };

    if (filterData !== -1) {
      const updatedCartData = cartData?.map((data, index) => {
        if (index === filterData) {
          return {
            ...data,
            qty: quantity[item.id] || 1,
            priceTotal:
              item?.price * (quantity[item.id] || 1) -
              (item?.price / 100) * item.discountPercentage,
          };
        }
        return data;
      });
      setCartData(updatedCartData);
      localStorage.setItem("cartItem", JSON.stringify(updatedCartData));
      return;
    }

    const updatedData = [...cartData, updatedItem];
    setCartData(updatedData);
    dispatch(cartAction(updatedData));
    localStorage.setItem("cartItem", JSON.stringify(updatedData));
  };

  return {
    cartData,
    setCartData,
    quantity,
    setQuantity,
    data,
    setData,
    loading,
    setLoading,
    qtyCount,
    addToCart,
  };
};

export default AddToCart;
