import './App.css';
import { useState } from 'react';

function App() {

  let logo = 'ReactBlog';

  let [post, setPost] = useState(['Biological thoughts', 'Creative thoughts', 'Apple-like things']);

  let [like, setLike] = useState([0, 0, 0]);

  let [modal, setModal] = useState(false);

  let [title, setTitle] = useState(0);

  let [inputValue, setInputValue] = useState('');

  return (
    <div className="App">

      <div className="black-nav">
        <h4>{logo}</h4>
      </div>
      <button onClick={()=>{
        let copyOfPostArray = [...post];

        let copiedArray = copyOfPostArray.sort();

        setPost(copiedArray)
      }}>Sort in Order</button>
      
      {
        post.map(function(a, i){
          return (      
          <div className="list" key={i}>
            <h4 onClick={()=>{
              setModal(!modal);
              setTitle(i)
            }}> {a}  
            <span onClick={(e)=>{
              e.stopPropagation();
              setLike(()=>{
                let likeArray = [...like];
                likeArray[i] += 1;
                return likeArray;
              })
              }}>👍</span> {like[i]} </h4>
            <p>2월 14일 발행</p>
            <button onClick={()=>{
              let updatedPost = [...post];
              updatedPost.splice(i, 1);
              setPost(updatedPost);
            }}>Delete</button>
          </div>
          )
        })
      }

      <input onChange={(e)=>{
        setInputValue(e.target.value);
        }}/>
      <button onClick={()=>{
        setPost((prevPost)=>{
          return [...prevPost, inputValue];
        })
      }}>Post</button>

      {
        modal == true ? <PostModal post={post} title={title}/> : null
      }

    </div>
  );
}

function PostModal(props){
  return (
    <div className="modal">
      <h4>{props.post[props.title]}</h4>
      <p>Date</p>
      <p>Detail</p>
    </div>
  )
}

export default App;