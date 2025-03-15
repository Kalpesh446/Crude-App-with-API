import React, { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/PostApi";

const Form = ({ post, setPost, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  // get the updated data and add into input field
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

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
      setPost([...post, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  // update post method
  const updatePostData = async () => {
    try {
      const res = await updatePost(updateDataApi.id, addData);
      console.log(res);
      if (res.status === 200) {
        setPost((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });
        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };
  // form submit method
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
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
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default Form;
