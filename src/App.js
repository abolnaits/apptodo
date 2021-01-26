import './App.css';
import React from 'react';
class App extends React.Component{
    ///Where the main app exists
    render(){
      return(
        <div className="container main">
          <h1 className="text-center">Todo list React App</h1>
          <div id="task-container">
            <div id="form-wrapper">
            <form id="form">
              <div className="form-group">
                  <label for="title">Email address</label>
                  <input type="text" className="form-control" id="title" aria-describedby="titleHelp"></input>
                  <small id="titleHelp" className="form-text text-muted">The title of the task.</small>
              </div>
              
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
            <div id="list-wrapper">

            </div>
          </div>
        </div>
      );   
    }
}

export default App;
