import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/actions/cart";

const CartContainer = () => {
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartItem") || [])
  );
  const [updateTotal, setUpdateTotal] = useState(0);

  const totalCartPrice = (arr) => {
    let totalPrice = arr.reduce((acc, val) => acc + val.priceTotal, 0);
    setUpdateTotal(totalPrice.toFixed(2));
  };

  useEffect(() => {
    totalCartPrice(cartData);
  }, []);

  const qtyCount = (index, data, decrease = false) => {
    let temp = [...cartData];
    temp[index].qty = decrease
      ? Math.max(data.qty - 1, 1)
      : Math.min(data.qty + 1, data.stock);
    temp[index].priceTotal = temp[index].qty * data.price;
    setCartData(temp);
    localStorage.setItem("cartItem", JSON.stringify(temp));
    totalCartPrice(temp);
  };

  const handleDeleteProduct = (id) => {
    const deleteProduct = cartData.filter((item) => item.id !== id);
    setCartData(deleteProduct);
    dispatch(cartAction(deleteProduct));
    localStorage.setItem("cartItem", JSON.stringify(deleteProduct));
    totalCartPrice(deleteProduct);
  };
  return {
    cartData,
    setCartData,
    updateTotal,
    qtyCount,
    setUpdateTotal,
    handleDeleteProduct,
  };
};

export default CartContainer;
