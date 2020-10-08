import React from 'react';
import './Style.css';
import axios from 'axios';
import PostCard from './PostCard';
import Todo from './Todo';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      header:'Post',
      userdata:null,
      error:null,
      postOrTodo:false
    };
    this.togglePostTodo = this.togglePostTodo.bind(this);
  }
  
  getUserData(){
    const url="https://localhost:5001/api/User/SingleUser/1";
    return axios.get(url)
    .then(response=>this.setState({
      userdata:response.data,
      header:response.data.name,
    }))
    .catch(error=>this.setState({
      error,
    }));
  }
  componentDidMount(){
    this.getUserData();
  }
  
  togglePostTodo = () =>{
    this.setState({
      postOrTodo:true
    });
  }

  render(){
    return (
      <div className="Container">
        <div className="App-header">
            <h1>Learn React</h1>
            <h2 className="App-header">{this.state.header}</h2>
            <button className="todos" onClick={this.togglePostTodo} data-testid="todobutton">TODOS</button>
            <br/>
            <hr/>
            {this.state.postOrTodo?<Todo/>:<PostCard/>}     
        </div>   
      </div>
    );
  }
  
}

export default App;
