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
        this.checkChange = this.changeHandler.bind(this);
        this.checkSubmit = this.submitHandler.bind(this);
        //this.editHandler = this.editHandler.bind(this);
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
        var name = e.target.name;
        var value = e.target.value;
        console.log('Name ==>',name);
        console.log('Value ==>',value);
        console.log('Active ==>',this.state.activeItem);
        //Actualizo el estado
        this.setState({
            activeItem:{
                id: this.state.activeItem.id,
                //id:null,
                title:value,
                completed:false
            }
        });
        
    }

    submitHandler(e){
        e.preventDefault();
        console.log('Item ==>',this.state.activeItem);
        //Send the URL
        var url = 'http://localhost:8000/api/task-create/';
        //Check if it we are adding or updating
        if(this.state.editing){
            url = 'http://localhost:8000/api/task-update/'+this.state.activeItem.id+'/'
            //Update editing
            
            this.setState({
                editing:false
            });
            
        }
        //alert(url);
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(
                this.state.activeItem
            )
        }).then((resp)=>{
            //Obtengo los datos
            this.getList();
            //Actualizo el estado
            this.setState({
                activeItem:{
                    id : null,
                    title:'',
                    completed:false
                }
                
            });
        }).catch(function(error){
            console.log('Erro ==>',error);
        });

    }

    //Edit an item 
    //Take a parameters , must use an arrow function in the call
    editHandler(task){
        console.log('Edit task==>',task);
        //Pasamos el contexto
        //console.log('this ==>',this);
        this.setState({
            activeItem:task,
            editing:true
        });
        console.log(this.state.activeItem);
    }

    render(){
        var tasks = this.state.todoList;
        var that = this;
        return(
            <div id="task-container" className="container">
                <h1 className="text-center">Todo Task List</h1>
                <div id="form-wrapper">
                <form id="form" onSubmit={this.checkSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="titleHelp" name="title"  onChange={this.checkChange} value={this.state.activeItem.title}/>
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
                                    <button className="btn btn-warning edit" onClick={()=>that.editHandler(task)}> Edit</button>    
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