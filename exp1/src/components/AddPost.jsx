import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postSlice";

function AddPost() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (title === "") return;

    dispatch(
      addPost({
        id: Date.now(),
        title,
      })
    );

    setTitle("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={handleAdd}>
        Add Post
      </button>
    </div>
  );
}

export default AddPost;