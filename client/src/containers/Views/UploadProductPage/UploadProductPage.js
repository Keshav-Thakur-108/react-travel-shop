import React, { useState } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import FileUpload from "../../../components/Utilities/FileUpload";

const { Title } = Typography;
const { TextArea } = Input;

const continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Asia" },
  { key: 3, value: "Australia" },
  { key: 4, value: "Europe" },
  { key: 5, value: "North America" },
  { key: 6, value: "South America" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage() {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [continentValue, setContinentValue] = useState(1);

  const [images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.target.value);
  };
  const onDescriptionChange = (event) => {
    setDescriptionValue(event.target.value);
  };
  const onPriceChange = (event) => {
    setPriceValue(event.target.value);
  };

  const onContinentChange = (event) => {
    setContinentValue(event.target.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  return (
    <div
      style={{
        width: "700px",
        margin: "2rem auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        <Title>Upload Travel Product</Title>
      </div>

      <form>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input
          value={titleValue}
          onChange={(e) => onTitleChange(e)}
          type="text"
        ></Input>
        <br />
        <br />

        <label>Description</label>
        <TextArea
          value={descriptionValue}
          onChange={(e) => onDescriptionChange(e)}
        />
        <br />
        <br />

        <label>Price($)</label>
        <Input
          value={priceValue}
          onChange={(e) => onPriceChange(e)}
          type="text"
        ></Input>
        <br />
        <br />
        <select onChange={(e) => onContinentChange(e)}>
          {continents.map((continent) => (
            <option key={continent.key} value={continent.key}>
              {continent.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default UploadProductPage;
