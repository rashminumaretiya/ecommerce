import React from "react";
import Table from "react-bootstrap/Table";
import Quantity from "../../shared/Quantity";
import CartContainer from "../../container/cartContainer";

const Cart = () => {
  const { cartData, updateTotal, qtyCount, handleDeleteProduct } =
    CartContainer();

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-12">
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartData?.map((data, index) => {
                return (
                  <tr key={data.id}>
                    <td className="text-center">
                      <span onClick={() => handleDeleteProduct(data.id)}>
                        X
                      </span>
                    </td>
                    <td>{data.title}</td>
                    <td>{data.price}</td>
                    <td>
                      <Quantity
                        value={data.qty}
                        handleMinusClick={() =>
                          qtyCount(index, data, data?.stock, true)
                        }
                        handlePlusClick={() => qtyCount(index, data)}
                      />
                    </td>
                    <td>
                      {(
                        data.price * data.qty -
                        (data.price / 100) * data.discountPercentage
                      ).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}>
                  Total: <b>{updateTotal}</b>
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
