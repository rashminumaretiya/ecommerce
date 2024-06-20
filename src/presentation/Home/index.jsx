import React from "react";
import CustomButton from "../../shared/CustomButton";
import Card from "react-bootstrap/Card";
import Quantity from "../../shared/Quantity";
import Spinner from "react-bootstrap/Spinner";
import AddToCart from "../../container/addToCart";
import Badge from "react-bootstrap/esm/Badge";

const Home = () => {
  const { quantity, data, loading, qtyCount, addToCart } = AddToCart();

  return (
    <div className="container py-4">
      <div className="row">
        {loading ? (
          <Spinner animation="border" className="mx-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          data?.map((item, i) => {
            return (
              <div className="col-md-3" key={i}>
                <Card key={i} className="mb-4">
                  <Card.Img variant="top" src={item.thumbnail} />
                  <Badge className="discount">{item.discountPercentage}%</Badge>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <div className="d-flex justify-content-between">
                      <p className="mb-0">
                        Price: <b>${item.price}</b>
                      </p>
                      <p className="mb-0">
                        Stock: <b>{item.stock}</b>
                      </p>
                    </div>
                    <hr />
                    <Card.Text>{item.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <CustomButton
                        variant="primary"
                        onClick={() => addToCart(item)}
                      >
                        Add to cart
                      </CustomButton>
                      <Quantity
                        handleMinusClick={() =>
                          qtyCount(item?.id, item.stock, true)
                        }
                        handlePlusClick={() => qtyCount(item?.id, item.stock)}
                        value={quantity[item.id] || 1}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
