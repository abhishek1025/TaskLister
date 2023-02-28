import { createSlice } from "@reduxjs/toolkit";

const INTITAL_STATE = {
    allTasks: [],
    todayTasks: [],
    thisWeekTasks: [],
    tasksGroupByProject: []
}

const filterTodayTask = (state) => {
    const dateObj = new Date();

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
    const day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();

    const date = `${year}-${month}-${day}`;

    state.todayTasks = state.allTasks.filter((task) => task.dueDate === date);
}

const filterThisWeekTasks = (state) => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    state.thisWeekTasks = state.allTasks.filter(
        (task) => new Date(task.dueDate) > today && new Date(task.dueDate) <= nextWeek
    );
}

const filterTaskByGroup = (state) => {

    const tasksWithProjectName = state.allTasks.filter((task) => task.projectName)

    const tasksGroupedByProject = tasksWithProjectName.reduce((groupedTasks, currentValue) => {
        const projectIndex = groupedTasks.findIndex(
            (project) => project.projectName === currentValue.projectName
        );

        if (projectIndex === -1) {
            groupedTasks.push({
                projectName: currentValue.projectName,
                tasks: [currentValue],
            });
        } else {
            groupedTasks[projectIndex].tasks.push(currentValue);
        }
        return groupedTasks;
    }, []);

    state.tasksGroupByProject = tasksGroupedByProject;
}

const filterAllTasks = (state) => {
    filterTodayTask(state);
    filterThisWeekTasks(state);
    filterTaskByGroup(state);
}


const tasksSlice = createSlice(
    {
        name: 'task',
        initialState: INTITAL_STATE,
        reducers: {
            setAllTasks(state, action) {
                state.allTasks = action.payload;
                filterAllTasks(state);
            }
        }
    }
)

// const { setTodayTasks } = tasksSlice.actions;
export const { setAllTasks, setTodayTasks } = tasksSlice.actions;
export const taskReducer = tasksSlice.reducer;