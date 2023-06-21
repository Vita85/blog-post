import { useState } from "react";
import postsData from "./postsData";

function App() {
  const [posts, setPosts] = useState();

  const [postInfo, setPostInfo] = useState({
    title: "",
    description: "",
    // date: getDate(),
  });

  //---------Дата------------
  // const getDate = () => {
  //   let d = new Date();
  //   let date = d.getDate();
  //   let month = d.getMonth();
  //   let year = d.getFullYear();
  //   let zeroFormatMonth;

  //   if (String(month).length === 1) {
  //     zeroFormatMonth = "0" + (month + 1);
  //   } else {
  //     zeroFormatMonth = month + 1;
  //   }
  //   return `${date}.${zeroFormatMonth}.${year}`;
  // };
  // console.log(getDate());

  const onChangeSetPostInfo = (event) => {
    setPostInfo((prevPost) => {
      return {
        ...prevPost,
        [event.target.name]: event.target.value,
      };
    });
  };

  const addPost = () => {
    const newPost =  {
      id: 4,
      title: postInfo.title,
      description: postInfo.description,
      // createAdd: getDate(),
    }

  }
  return (
    <div className="container">

      <div className="posts">
        <h1 className="header-title">IT-спеціальності</h1>
        {postsData.map((post) => {
          return (
            <div key={post.id}className="post-item">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <span>Створено: {post.createAdd}</span>
            </div>
          );
        })}
      </div>

      <div className="create-post">
        <h1>Створити пост</h1>
        <div className="create-box">
          <label htmlFor="title">Заголовок</label>
          <input
            type="text"
            id="title"
            value={postInfo.title}
            onChange={onChangeSetPostInfo}
            name="title"
          />

          <label htmlFor="text">Опис</label>
          <textarea
            id="text"
            cols="20"
            rows="10"
            value={postInfo.description}
            onChange={onChangeSetPostInfo}
            name="description"
          ></textarea>
        </div>
        <button className="add-post" >
          Додати новий пост
        </button>
      </div>
    </div>
  );
}

export default App;
