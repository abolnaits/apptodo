import './App.css';
import React from 'react';
class App extends React.Component{
  //Set the state
  constructor(props){
    super(props);
    this.state = {
      todoList:[],
      activeItem:{
        id:null,
        title: '',
        completed:false
      },
      editing:false,

    }
    //Biding the method ??
    this.fetchTask = this.fetchTask.bind(this);
  };

  //Life cycle method
  componentWillMount(){
    this.fetchTask();
    
  }
  //Fetch data from API
  fetchTask(){
    console.log('Fetching ==>');
    fetch('http://localhost:8000/api/task-list/')
    .then(resp => resp.json())
    .then(data =>{
      this.setState({
        todoList:data
      });
    });
  }
    ///Where the main app exists
    render(){
      var tasks = this.state.todoList;

      return(
        <div className="container main">
          <h1 className="text-center">Todo list React App</h1>
          <div id="task-container">
            <div id="form-wrapper">
            <form id="form">
              <div className="form-group">
                  <label htmlFor="title">Email address</label>
                  <input type="text" className="form-control" id="title" aria-describedby="titleHelp"></input>
                  <small id="titleHelp" className="form-text text-muted">The title of the task.</small>
              </div>
              
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
            <div id="list-wrapper">
              { tasks.map(function(task,index){
                return( 
                  <div key={index} className="task-wrapper">
                    <span>{ task.title }</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );   
    }
}

export default App;
