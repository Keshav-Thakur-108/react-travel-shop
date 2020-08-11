import React, { useState } from "react";
import { Input } from "antd";
import { set } from "mongoose";

const { Search } = Input;

const SearchFeautre = (props) => {
  const [SearchTerms, setSearchTerms] = useState("");

  const onChangeSearch = (event) => {
    setSearchTerms(event.currentTarget.value);
    props.refreshFunction(event.currentTarget.value);
  };
  return (
    <div>
      <Search
        value={SearchTerms}
        onChange={onChangeSearch}
        placeholder="Search by Typing..."
      />
    </div>
  );
};

export default SearchFeautre;
