import { useEffect, useState } from "react";
import postsData from "./postsData";
import getDate from "./getData";

function App() {
  //---------Дата------------
  //винесли в окремий компонент фун-ю, яка генерує дату.
  //якщо не використовувати import postsData from "./postsData" - так, ніби ми ще не створювали пости,то потрібно в useState([])- передати пустий масив
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const p = localStorage.getItem("posts"); //тут ми змінній const р прописали значення яке ми отримуємо в localStorage
    const localPosts = JSON.parse(p);
    if (localPosts) {
      setPosts(JSON.parse(p));
    }
    //і setPosts це значення передали в форматі JS. викликали в useEffect, щоб відобразилися пости при завантаженні сторінки
  }, []);

  //витягуємо інф-ю з інпутів
  const [postInfo, setPostInfo] = useState({
    title: "",
    description: "",
  });

  //видалення поста
  const deletePost = (id) => {
    let deletePosts = posts.filter((post) => post.id !== id);
    setPosts(deletePosts);
    localStorage.setItem("posts", JSON.stringify(deletePosts)); //в  localStorage добавили ключ "posts" і його значення JSON.stringify(newPosts)
    //якщо відразу в localStorage подивитися на posts, то побачимо пустий масив, бо не встигає обновляти дані
  };

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
    });
  };

  const addPost = () => {
    //перевірка інпутів на вміст
    if (postInfo.description.length === 0 || postInfo.title.length === 0) {
      alert("Введіть текст");
      return;
    }
    let newAddPosts = [
      //створюємо нову змінну з масивом на основі старого,який був створений в setPosts нижче. Тобто, той масив що повертали в setPosts просто виносимо в окрему змінну
      ...posts, //деструктуризуємо старий пост
      {
        //і додаємо новий об'єкт. а в setPosts передаємо вже нову змінну(newAddPosts) і в localStorage теж передаємо цю нову фун-ю: localStorage.setItem("posts", JSON.stringify(newAddPosts));
        id: posts.length + 1,
        title: postInfo.title,
        description: postInfo.description,
        createAdd: getDate(),
      },
    ];
    //зміна стейту, щоб змінився UI
    setPosts(newAddPosts); //вже нова змінна в setPosts з масивом зі старим значенням і новим об'єктом
    // return [
    //   //спредимо старі пости
    //   ...prevPost,
    //   //додаємо новий пост
    //   {
    //     id: posts.length + 1,
    //     title: postInfo.title,
    //     description: postInfo.description,
    //     createAdd: getDate(),
    //   },
    // ]; //звідси ми все забираємо і вище створюємо нову змінну let newPosts, в неї спредимо старе значення + новий об'єкт
    localStorage.setItem("posts", JSON.stringify(newAddPosts)); // для   localStorage також передаємо цю нову змінну. І ці зміни не тільки відобразяться на екрані, а пост відразу попаде ще й в localStorage і коли ми оновимо сторінку, то всерівно все збережеться.
    onClear();
  };
  console.log(posts);
  return (
    <div className="container">
      <div className="posts">
        <h1 className="header-title">IT-спеціальності</h1>
        {posts.map((post) => {
          return (
            <div key={post.id} className="post-item">
              <button
                className="delete-btn"
                onClick={() => deletePost(post.id)}
              ></button>
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
