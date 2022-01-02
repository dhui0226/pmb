import TasksToDo from './TasksToDo'
import TasksInProgress from './TasksInProgress'
import TasksCompleted from './TasksCompleted'


const MyTasks = () => {
    return (
        <div>
            <h1>Tasks</h1>
            <TasksToDo />
            <TasksInProgress />
            <TasksCompleted />
        </div>
    )
}

export default MyTasks