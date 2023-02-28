import { useState } from "react";
import './task.styles.scss';
import Form from "../form/form.component";


const Task = ({ task, deleteTask, heading, updateTheTaskStatus }) => {

    const [showForm, setShowForm] = useState(false)

    const { taskName, taskDesc, projectName, id, isCompleted } = task;

    const dueDate = new Date() > new Date(task.dueDate) ? 'Overdue' : task.dueDate;

    const handleCheckbox = (e) => {
        updateTheTaskStatus(id, e.target.checked);
    }

    return (
        <div className="task w-96">
            {
                !showForm &&
                <div className="border border-solid border-gray-400 rounded-lg py-5 shadow-md my-4">

                    {heading !== projectName && <h2 className="text-center mt-0 mb-5 tracking-wide">{projectName}</h2>}

                    <div className="m-auto task-content">

                        <p className="mb-2">

                            <input type="checkbox" className="cursor-pointer mr-2 ml-0 my-0" onChange={handleCheckbox} checked={isCompleted ? true : ''} />
                            {
                                isCompleted ? <del>{taskName}</del> : taskName
                            }
                        </p>

                        <div className="px-7 text-sm text-gray-500">
                            <p className="m-0">{taskDesc}</p>
                        </div>

                        <div className="mt-5 flex justify-between items-center">

                            <div>
                                <p className="m-0 flex items-center text-sm" style={{ color: '#D0453A' }}>
                                    {dueDate ?
                                        <>
                                            <i className="fa-solid fa-calendar-days"></i>
                                            <span className="ml-3">{dueDate}</span>
                                        </>

                                        :
                                        <>No Due Date</>
                                    }
                                </p>
                            </div>

                            <div>
                                <button className="task-btn cursor-pointer text-sm text-red-600" onClick={() => { deleteTask(id) }}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>

                                <button className="task-btn cursor-pointer text-sm text-green-800" onClick={() => setShowForm(true)}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            }

            {
                showForm && <Form setShowForm={setShowForm} task={task} operationType="Edit Task" />

            }
        </div>
    )
}

export default Task;
