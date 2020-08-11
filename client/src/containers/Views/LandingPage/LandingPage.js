import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../../components/Utilities/ImageSlider";
import Checkbox from "../LandingPage/Sections/checkbox";
import RadioBox from "./Sections/RadioBox";
import { continents, price } from "./Sections/Datas";
import SearchFeautre from "./Sections/SearchFeature";
import { VerticalRightOutlined } from "@ant-design/icons";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(2);
  const [postSize, setPostSize] = useState();
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    axios.post("/api/product/getProducts", variables).then((res) => {
      if (res.data.success) {
        if (variables.loadMore) {
          setProducts([...products, ...res.data.products]);
        } else {
          setProducts(res.data.products);
        }
        console.log(res.data.postSize);
        setPostSize(res.data.postSize);
      }

      console.log(res.data.products);
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
    };
    getProducts(variables);
    setSkip(skip);
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getProducts(variables);
    setSkip(0);
  };
  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValue = handlePrice(filters);
      newFilters[category] = priceValue;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(variables);
  };

  return (
    <div
      style={{
        width: "75%",
        margin: "3rem auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2>Let's Travel Anywhere</h2>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <Checkbox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>

      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "1rem" }}
      >
        <SearchFeautre refreshFunction={updateSearchTerms} />
      </div>

      {products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />
      {postSize >= Limit && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={onLoadMore}>Load more</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
