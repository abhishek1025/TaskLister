import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../form/form.component";
import { setAllTasks } from "../store/tasks/task.reducer";
import { selectCurrentUser } from "../store/user/user.selector";
import Task from "../task/task.compoent";
import { storeDataInFirebase } from "../utils/firebase/firebase.utils";

const Tasks = ({ heading, allTasks }) => {

    const currentUser = useSelector(selectCurrentUser);


    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);

    const deleteTask = (taskID) => {
        const newTasks = allTasks.filter((task) => task.id !== taskID);
        dispatch(setAllTasks([...newTasks]));
        storeDataInFirebase(currentUser.uid, [...newTasks])
    }

    const updateTheTaskStatus = (taskID, checked) => {
        const task = allTasks.find((task) => task.id === taskID);
        const newTasks = allTasks.filter((task) => task.id !== taskID);

        if (checked) {
            dispatch(setAllTasks([...newTasks, { ...task, isCompleted: true }]));
            storeDataInFirebase(currentUser.uid, [...newTasks, { ...task, isCompleted: true }])

        }
        else {
            dispatch(setAllTasks([...newTasks, { ...task, isCompleted: false }]));
            storeDataInFirebase(currentUser.uid, [...newTasks, { ...task, isCompleted: false }])
        }

    }

    return (
        <div className="py-6 w-4/5 m-auto ">

            <h1 style={{ color: '#DB4C3F' }} className="mt-0">{heading}</h1>

            <div className="px-6 flex flex-wrap justify-between">
                {
                    allTasks.map((task, index) => {
                        return (
                            <Task task={task} heading={heading} key={index} deleteTask={deleteTask} updateTheTaskStatus={updateTheTaskStatus} />
                        )
                    })
                }
            </div>

            {
                showForm
                    ?
                    <Form setShowForm={setShowForm} operationType="Add Task" />
                    :
                    <div className="px-6">
                        <button className="border-0 bg-white mt-6 text-lg cursor-pointer hover:text-red-500" onClick={() => setShowForm(true)}>
                            <span className="mr-2"><i className="fa-solid fa-circle-plus "></i> </span> Add Task
                        </button>
                    </div>
            }

        </div>
    )

}


export default Tasks;