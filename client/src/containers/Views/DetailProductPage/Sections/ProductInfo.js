import React, { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";

const ProductInfo = (props) => {
  const [Product, setProduct] = useState({});
  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  const addToCardhandler = () => {
    props.addToCart(props.detail._id);
  };

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price"> {Product.price}</Descriptions.Item>
        <Descriptions.Item label="Sold"> {Product.sold}</Descriptions.Item>
        <Descriptions.Item label="View"> {Product.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {Product.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={addToCardhandler}
          size="large"
          shape="round"
          type="danger"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
