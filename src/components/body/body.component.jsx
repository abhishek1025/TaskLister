import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTasks } from "../store/tasks/task.selector";
import Tasks from "../tasks/tasks-list.component";

const Body = () => {

    const [heading, setHeading] = useState("Inbox");

    const { allTasks, todayTasks, thisWeekTasks, tasksGroupByProject } = useSelector(selectTasks);

    const displayTasks = (() => {

        switch (heading) {
            case 'Today':
                return todayTasks;
            case 'This Week':
                return thisWeekTasks;
            case 'Inbox':
                return allTasks;

            default:
                const tasksGroupedByProject = tasksGroupByProject.find((project) => project.projectName === heading);

                return tasksGroupedByProject.tasks;
        }

    })();

    const inboxSecHandler = () => {
        setHeading("Inbox");
    }

    const todaySecHandler = () => {
        setHeading("Today");
    }

    return (
        <div className="flex ">
            <div className="bg-gray-50 py-6 px-4 box-border min-h-screen">
                <div>
                    <div>
                        <button className="w-52 text-left px-2 py-3 rounded-md border-0 hover:bg-gray-200 cursor-pointer" onClick={inboxSecHandler}>Inbox</button>
                    </div>

                    <div>
                        <button className="w-52 text-left px-2 py-3 rounded-md border-0 my-3 hover:bg-gray-200 cursor-pointer" onClick={todaySecHandler}>Today</button>
                    </div>

                    <div>
                        <button className="w-52 text-left px-2 py-3 rounded-md border-0 hover:bg-gray-200 cursor-pointer" onClick={() => setHeading("This Week")}>This Week</button>
                    </div>
                </div>

                <div className="my-16">
                    <h2>Projects</h2>
                    <ul className="list-none pl-4">

                        {
                            tasksGroupByProject ?
                                tasksGroupByProject.map((project, index) => {
                                    return (
                                        <li className="w-40 rounded-md p-2 bg-gray-100 hover:bg-gray-200 my-2 cursor-pointer" key={index} onClick={() => setHeading(project.projectName)}>
                                            {project.projectName}
                                        </li>
                                    )
                                })
                                :
                                <p>
                                    No Projects
                                </p>
                        }
                    </ul>
                </div>

            </div>
            {/* absolute left-96 top-18 fixed*/}
            <div className="w-full">
                <Tasks heading={heading} allTasks={displayTasks} />
            </div>


        </div>
    )
}

export default Body;