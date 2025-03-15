import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import Form from "./Form";

const Posts = () => {
  const [post, setPost] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPosts = async () => {
    const post = await getPost();
    console.log(post.data);
    setPost(post.data);
  };

  //   function to delete a post

  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        console.log(res);
        const updatedPosts = post.filter((post) => post.id !== id);
        setPost(updatedPosts);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // function to update a post
  const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <section className="section-form">
        <Form
          post={post}
          setPost={setPost}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="section-post">
        <ol>
          {post.map((curEle) => {
            const { id, title, body } = curEle;
            return (
              <li key={id}>
                <p>{title}</p>
                <p>{body}</p>
                <button onClick={() => handleUpdatePost(curEle)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};

export default Posts;
