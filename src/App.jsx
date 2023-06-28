import { useState } from "react";
import postsData from "./postsData";
import getDate from "./getData";

function App() {
  //---------Дата------------
  //винесли в окремий компонент фун-ю, яка генерує дату.
  //якщо не використовувати import postsData from "./postsData" - так, ніби ми ще не створювали пости,то потрібно в useState([])- передати пустий масив
  const [posts, setPosts] = useState([]);

  //витягуємо інф-ю з інпутів
  const [postInfo, setPostInfo] = useState({
    title: "",
    description: "",
  });

  //видалення поста
  const deletePost = (id) => {
    let newPosts = posts.filter(post => post.id!==id)
    setPosts(newPosts)
  }

//управляємо формою вводу
  const onChangeSetPostInfo = (event) => {
    setPostInfo((prevPost) => {
      return {
        ...prevPost,
        [event.target.name]: event.target.value,
      };
    });
  };

  //очищення форми
  const onClear = () => {
    setPostInfo({
      title: "",
      description: "",
    })
  };


  const addPost = () => {
    //перевірка інпутів на вміст
    if (postInfo.description.length === 0 || postInfo.title.length === 0) {
      alert("Введіть текст");
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
          // index: posts.index,
        },
      ];
    });
    onClear();
  };

  return (
    <div className="container">
      <div className="posts">
        <h1 className="header-title">IT-спеціальності</h1>
        {posts.map((post) => {
          return (
            <div key={post.id} className="post-item">
              <button className="delete-btn" onClick={() => deletePost(post.id)}></button>
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
        <button className="add-post" onClick={addPost}>
          Додати новий пост
        </button>
        {/* <button className="clear-post" onClick={onClear}>Очистити</button>  */}
      </div>
    </div>
  );
}

export default App;
