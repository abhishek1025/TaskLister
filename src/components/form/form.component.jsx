import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllTasks } from "../store/tasks/task.reducer";
import { selectTasks } from "../store/tasks/task.selector";
import { selectCurrentUser } from "../store/user/user.selector";
import { storeDataInFirebase } from "../utils/firebase/firebase.utils";


const Form = ({ setShowForm, task = {}, operationType }) => {

    const dispatch = new useDispatch();

    const { allTasks } = useSelector(selectTasks);

    const currentUser = useSelector(selectCurrentUser)

    const [newTask, setNewTask] = useState(task);

    const { taskName = '', taskDesc = '', dueDate = '', projectName = '' } = newTask;

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setNewTask({ ...newTask, [name]: value });
    }

    const formSubmitHandler = (e) => {

        e.preventDefault();

        // Add and Edit Task Features
        if (operationType === 'Add Task') {
            dispatch(setAllTasks([...allTasks, { ...newTask, id: allTasks.length + 1 }]));
            storeDataInFirebase(currentUser.uid, [...allTasks, { ...newTask, id: allTasks.length + 1 }]);
        }
        else if (operationType === 'Edit Task') {

            const updatedTasks = allTasks.map((task) => {
                if (task.id === newTask.id) {
                    return newTask;
                }
                else {
                    return task;
                }
            })


            dispatch(setAllTasks([...updatedTasks]));
            storeDataInFirebase(currentUser.uid, [...updatedTasks]);
        }


        setShowForm(false);
    }

    const hideForm = () => {
        setShowForm(false);
    }

    return (
        <form className="border border-solid border-gray-400  rounded-lg m-6" onSubmit={formSubmitHandler}>
            <div className="px-2 py-3">
                <div>
                    <input className="p-0 border-0 focus:outline-0 text-sm w-full" type='text' name="taskName" placeholder="Task Name" required onChange={changeHandler} value={taskName} />
                </div>
                <div>
                    <input className="p-0 border-0 focus:outline-0 my-2 text-sm  w-full" type='text' name="taskDesc" placeholder="Task Description" onChange={changeHandler} value={taskDesc} />
                </div>
                <div className="my-5">
                    <input className="p-1 mr-5" type='date' name="dueDate" onChange={changeHandler} value={dueDate} />
                    <input className="p-1" type='text' name="projectName" placeholder="Project Name" onChange={changeHandler} value={projectName} />
                </div>
            </div>

            <div className="border-t border-x-0 border-b-0 border-solid border-gray-400 px-2 py-3 rounded-sm">
                <button type="reset" onClick={hideForm} className="py-1 w-28 cursor-pointer">Cancel</button>
                <button type="submit" className="py-1 w-28 ml-5 cursor-pointer">Add</button>
            </div>
        </form>
    )
}

export default Form;