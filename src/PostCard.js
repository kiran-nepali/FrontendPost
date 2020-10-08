import React,{useState,useEffect} from 'react';
import axios from 'axios';

export default function PostCard(){
    const [post,setPost] = useState([]);
    const [error,setError] = useState('');

    useEffect(()=>{
        const postapi="https://jsonplaceholder.typicode.com/posts";
        axios.get(postapi)
        .then(response=>setPost(response.data))
        .catch(error=>setError(error));
    })
    return(
        <div className="cardlist">
            {post.filter(posts=>posts.id<=30).map(posts=>(
                <div className="card" key={posts.id}>
                    <h3 className="cardTitle">{posts.id}</h3>
                    <p><small>TITLE : {posts.title}</small></p>
                    <p><small>BODY : {posts.body}</small></p>
                </div>  
            ))}
        </div>
        
    )
}
