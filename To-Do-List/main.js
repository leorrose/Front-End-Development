'use strict';

/**
 * A component that renders a to do list, includes all app functionality.
 */
class ToDoListApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            /* The tasks in the to do list */
            tasks: []
        }
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }
    render(){
        return (
            <React.Fragment>
                <ToDoListTitle />
                <main>
                    <ToDoListAddItem addTask={this.addTask}/>
                    {this.state.tasks.map(x => (<ToDoListItem key={this.state.tasks.indexOf(x)} name={x} removeFunc={this.removeTask}/>))}
                </main>
                <PageFooter />
            </React.Fragment>
        );
    }
    addTask(taskName){
        /**
         * Add taskName to to do list.
         * @param {string} taskName
         */
        if(taskName == ""){
            window.alert("Task name cant be empty!");
            return;
        }
        if (this.state.tasks.indexOf(taskName)!= -1){
            window.alert("Task name already exist!");
            return;
        }
        this.setState({tasks: this.state.tasks.concat(taskName)});
    }
    removeTask(taskName){
        /**
         * Remove taskName from to do list.
         * @param {string} taskName
         */
        let temp = [...this.state.tasks]
        temp = temp.filter(x => x!=taskName);
        this.setState({tasks: temp})
    }
}


/**
 * A component that renders a Title for to do list page.
 */
class ToDoListTitle extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <header>
                <h1>To Do List</h1>
            </header>
        );
    }
}


/**
 * A component that renders a input option for to do list tasks, includes a text field and button to submit.
 */
class ToDoListAddItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            /* The task name to be inserted */ 
            taskName : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    render(){
        return(
            <form className="add-task-form"onSubmit={this.onSubmit}> 
                <input className="task-name-tf" type="text" placeholder="New Task" value={this.state.taskName} onChange={this.handleChange} />
                <button type="submit" className="add-task-bt"> + </button>
            </form>
        );
    }
    onSubmit(e){
        /**
         * Form submit event for submitting task, adds task to list and resets form. 
         * @param {Event} e
         */
        e.preventDefault();
        this.addTask();
        e.target.reset();
    }
    handleChange(e){
        /**
         * Let the text field value change the taskName in state.
         * @param {Event} e
         */
        this.setState({taskName: e.target.value});
    }
    addTask(){
        /**
         * Add the task in state to to list with the addTask function passed to this component.
         */
        this.props.addTask(this.state.taskName);
    }
}

ToDoListAddItem.propTypes = { addTask: PropTypes.func.isRequired };


/**
 * A component that renders a to do list tasks, includes task text, checkbox and button to remove task.
 */
class ToDoListItem extends React.Component{
    constructor(props){
        super(props);
        this.remove = this.remove.bind(this);
    }
    render(){
        return (
            <div className="task-wrapper">
                <p><span className="task-check-box" onClick={this.check}></span>{this.props.name}</p>
                <button className="task-delete-bt" onClick={this.remove}>X</button>
            </div>
        );
    }
    remove(e){
        /**
         * Remove task from to do list with the removeFunc function passed to this component. 
         * @param {Event} e
         */
        this.props.removeFunc(e.target.parentElement.firstChild.textContent.replace("✓",""));
    }
    check(e){
        /**
         * Check task as done, adds a line through text and a ✓ next to text.
         * @param {Event} e
         */
        if(e.target.className.includes("checked")){
            e.target.className = e.target.className.replace("checked", "");
            e.target.innerHTML = "";
            e.target.parentElement.className = e.target.parentElement.parentElement.firstChild.className.replace("done-task", "");
        }
        else{
            e.target.className = e.target.className.trim();
            e.target.className += " checked";
            e.target.innerHTML = "&#10003;";
            e.target.parentElement.className += " done-task";
        }
    }
}

ToDoListItem.propTypes = { removeFunc: PropTypes.func.isRequired };

/**
 * A component that renders footer for page, includes author name and github link.
 */
class PageFooter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <footer>
                <p> <strong>©</strong> Leor Ariel Rose </p>
                <a href="https://github.com/leorrose" target="_blank">
                    <img className="github-logo" src="resources/githubLogo.png" alt="git Hub Profile" ></img>
                </a>
            </footer>
        );
    }
}

/* Render app to html */
ReactDOM.render(<ToDoListApp /> ,document.getElementById("root"));