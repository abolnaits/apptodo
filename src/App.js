import './App.css';
import React from 'react';

class App extends React.Component{

    //Constructor
    //Props 
    constructor(props){
        //Propiedades del componente
        super(props);
        //Aqui definimos los estados o variables
        this.state={
            todoList : [],
            activeItem : {
                id : null,
                title:'',
                completed:false
            },
            editing : false
        };
        //Bind this to the method
        this.getList = this.fetchTaks.bind(this);
    }

    //Life cycle methos
    componentWillMount(){
        this.getList();
    }

    fetchTaks(){
        console.log('Fetching data ==>');
        fetch('http://localhost:8000/api/task-list/').then((res)=>{
            console.log('Resp ==> ',res);
            return res.json();
        }).then((data)=>{
            console.log('Data ==>',data);
            //Actualizo el estado
            this.setState({
                todoList:data
            });
        });
    }

    changeHandler(e){
        console.log(e);
    }
    render(){
        var tasks = this.state.todoList;
        return(
            <div id="task-container" className="container">
                <h1 className="text-center">Todo Task List</h1>
                <div id="form-wrapper">
                <form id="form">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="titleHelp" name="title" />
                            <small id="titleHelp" className="form-text text-muted">Add the title for the task.</small>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                </form>       
                </div>
                
                <div id="list-wrapper">
                    {tasks.map(function(task,index){
                        return(
                            <div key={index} className="task-wrapper" id={"data-row-"+index}>
                                <div className="task-info one">
                                    <span className="task-title">{task.title}</span>    
                                </div>
                                <div className="task-info two">
                                    <button className="btn btn-warning edit"> Edit</button>    
                                </div>
                                <div className="task-info three">
                                    <button className="btn btn-danger delete"> Delete</button>    
                                </div>  
                            </div>

                        )
                    })}
                </div>
            </div>
        )
    }
}

export default App;