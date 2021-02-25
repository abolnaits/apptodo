import './App.css';
import React from 'react';

class App extends React.Component{


    render(){
        return(
            <div id="task-container" className="container">
                <h1 className="text-center">Todo Task List</h1>
                <div id="form-wrapper">
                <form id="form">
                        <div className="form-group">
                            <label for="title">Title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="titleHelp" name="title" />
                            <small id="titleHelp" className="form-text text-muted">Add the title for the task.</small>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                </form>       
                </div>
                
                <div id="list-wrapper">

                </div>
            </div>
        )
    }
}

export default App;