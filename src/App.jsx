import { useState } from "react";
import postsData from "./postsData";
import getDate from "./getData";

function App() {
  //---------Дата------------
  //винесли в окремий компонент фун-ю, яка генерує дату.

  const [posts, setPosts] = useState(postsData);
  //витягуємо інф-ю з інпутів
  const [postInfo, setPostInfo] = useState({
    title: "",
    description: "",
  });

  const onChangeSetPostInfo = (event) => {
    setPostInfo((prevPost) => {
      return {
        ...prevPost,
        [event.target.name]: event.target.value,
      };
    });
  };

  const addPost = () => {
    //перевірка інпутів на вміст
    if(postInfo.description.length === 0 || postInfo.title.length === 0) {
      alert("Введіть текст")
      return;
    }
    //зміна стейту, щоб змінився UI
    setPosts((prevPost) => {
      return [
        //спредимо старі пости
        ...prevPost,
        //додаємо новий пост
        {
          id: posts.length + 1,
          title: postInfo.title,
          description: postInfo.description,
          createAdd: getDate(),
        },
      ];
    });
  };
  return (
    <div className="container">
      <div className="posts">
        <h1 className="header-title">IT-спеціальності</h1>
        {posts.map((post) => {
          return (
            <div key={post.id} className="post-item">
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
        <button className="add-post" onClick={addPost}>Додати новий пост</button>
      </div>
    </div>
  );
}

export default App;
