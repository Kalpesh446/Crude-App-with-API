import React, { useState } from "react";
import { createPost } from "../api/PostApi";

const Form = ({ post, setPost }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // simple method
  // const handleInputChange = (e) => {
  //   setAddData({ ...addData, [e.target.name]: e.target.value });
  // };

  const addPostData = async () => {
    const res = await createPost(addData);
    console.log("res", res);

    if (res.status === 201) {
      setAddData([...post, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  // form submit method
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          name="title"
          id="title"
          placeholder="Add title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add Post"
          name="body"
          id="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
