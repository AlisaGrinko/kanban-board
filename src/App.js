import React, {useState} from 'react';
import Column from "./Column";
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const initialTasks = [
    {id: uuidv4(), name: 'Create F1', priority: 10, status: 'todo'},
    {id: uuidv4(), name: 'Create F2', priority: 20, status: 'review'},
    {id: uuidv4(), name: 'Create F3', priority: 20, status: 'todo'},
    {id: uuidv4(), name: 'Create F4', priority: 30, status: 'done'},
    {id: uuidv4(), name: 'Create F4', priority: 30, status: 'progress'},
    {id: uuidv4(), name: 'Create F4', priority: 30, status: 'done'},

]
function App() {
    const [tasks, setTasks] = useState(initialTasks)
    const [isOpenCreateTaskForm, setIsOpenCreateTaskForm] = useState(false)
    const [taskInput, setTaskInput] = useState('')
    const [isActiveButtonTaskCreate, setIsActiveButtonTaskCreate] = useState(false)

    const openCreateTaskForm = () => {
        setIsOpenCreateTaskForm(true)
    }

    const onTaskChange = (e) => {
        setIsActiveButtonTaskCreate(e.target.value.length > 4)
        setTaskInput(e.target.value);
    }

    const taskSubmit = (e) => {
        // e.preventDefault();
        // console.log(taskInput);
        // taskReset();
        e.preventDefault();
        const newTask = {
            id: uuidv4(),
            name: taskInput,
            priority: 20,
            status: 'todo'
        };
        setTasks([...tasks, newTask])
        taskReset();
    };

    const taskReset = () => {
        setTaskInput('');
        setIsOpenCreateTaskForm(false);
        setIsActiveButtonTaskCreate(false);
    };

    const changeStatus = ({id, direction}) => {
       console.log(id, direction)
        const statuses = ['todo', 'progress', 'review', 'done']
        const updatedTasks = tasks.map(el => {
            if(el.id === id){
               if(direction === 'left' ){
                   el.status = statuses[statuses.indexOf(el.status) - 1];
               }
                if(direction === 'right'){
                    el.status = statuses[statuses.indexOf(el.status) + 1];
                }
               return el;
            } else return el;
        });
       setTasks(updatedTasks);
    };


    return (
        <div>

            <div className="container">
                <h1>Kanban</h1>

                {!isOpenCreateTaskForm &&
                <button className="btn btn-primary"
                        onClick={openCreateTaskForm}>Create Task</button>
                }
                {isOpenCreateTaskForm &&
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Task</label>
                        <input type="text" className="form-control"
                               value={taskInput}
                               onChange={onTaskChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary"
                            onClick={taskSubmit}
                            disabled={!isActiveButtonTaskCreate}>Submit
                    </button>
                    <button className="btn btn-secondary"
                            onClick={taskReset}>Cancel
                    </button>
                </form>
                }

                <div className="row">
                    <div className="col-sm">
                        To do
                        <Column tasks={tasks} status='todo' changeStatus={changeStatus}/>
                    </div>
                    <div className="col-sm">
                        In progress
                        <Column tasks={tasks} status='progress' changeStatus={changeStatus}/>
                    </div>
                    <div className="col-sm">
                        Review
                        <Column tasks={tasks} status='review' changeStatus={changeStatus}/>
                    </div>
                    <div className="col-sm">
                        Done
                        <Column tasks={tasks} status='done' changeStatus={changeStatus}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
