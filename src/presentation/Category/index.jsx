import Card from "react-bootstrap/Card";
import CustomButton from "../../shared/CustomButton";
import Quantity from "../../shared/Quantity";
import Spinner from "react-bootstrap/esm/Spinner";
import AddToCart from "../../container/addToCart";
import CategoryContainer from "../../container/categoryContainer";
import Badge from "react-bootstrap/esm/Badge";
import Form from "react-bootstrap/Form";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const brand = [
  "Apple",
  "Samsung",
  "OPPO",
  "Huawei",
  "Microsoft Surface",
  "Infinix",
];

const Category = () => {
  const { quantity, loading, data, setData, setLoading, qtyCount, addToCart } =
    AddToCart();
  const {
    categoryData,
    handleChangeCategory,
    handleChange,
    handleBrandChange,
    brandData,
    filteredArr,
    handleFilterClear,
    handleRangeChange,
  } = CategoryContainer({
    setLoading,
    data,
    setData,
  });
  return (
    <>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-3">
            <div className="widget mb-3">
              <h5>Search</h5>
              <input
                className="form-control"
                placeholder="Search"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="widget mb-3">
              <h5>Category</h5>
              <ul className="category">
                {categoryData.map((item, i) => {
                  return (
                    <li onClick={() => handleChangeCategory(item.slug)} key={i}>
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="widget mb-3">
              <h5 className="mb-4">Price Range</h5>
              <Slider
                range
                min={0}
                max={2000}
                defaultValue={[100, 1800]}
                onChange={handleRangeChange}
                pushable={300}
              />
            </div>
            <div className="widget">
              {filteredArr.length ? (
                <span className="float-end" onClick={handleFilterClear}>
                  Clear
                </span>
              ) : null}
              <h5>Brand</h5>
              <div className="ms-1">
                {brand?.map((item, i) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      id={`default-${i}`}
                      label={`${item}`}
                      value={`${item}`}
                      checked={
                        filteredArr.length !== 0 ? filteredArr[item] : false
                      }
                      onChange={handleBrandChange}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              {loading ? (
                <Spinner animation="border" className="mx-auto" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : data.length || brandData.length ? (
                (brandData.length ? brandData : data)?.map((item, i) => {
                  return (
                    <div className="col-md-4" key={i}>
                      <Card className="mb-4">
                        <Card.Img variant="top" src={item.thumbnail} />
                        <Badge className="discount">
                          {item.discountPercentage}%
                        </Badge>
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
                              handlePlusClick={() =>
                                qtyCount(item?.id, item.stock)
                              }
                              value={quantity[item.id] || 1}
                            />
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })
              ) : (
                <p className="text-center">No Data Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Category;
