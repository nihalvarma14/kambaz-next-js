import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./(Kambaz)/Courses/reducer";
import modulesReducer from "./(Kambaz)/Courses/[cid]/Modules/reducer";
import accountReducer from "./(Kambaz)/Account/reducer";
import assignmentsReducer from "./(Kambaz)/Courses/[cid]/Assignments/reducer";
import enrollmentsReducer from "./(Kambaz)/Enrollments/reducer";
// Add Redux examples reducers - Labs is a sibling folder
import addReducer from "./Labs/Lab4/ReduxExamples/AddRedux/addReducer";
import counterReducer from "./Labs/Lab4/ReduxExamples/CounterRedux/counterReducer";
import helloReducer from "./Labs/Lab4/ReduxExamples/HelloRedux/helloReducer";
import todosReducer from "./Labs/Lab4/ReduxExamples/todos/todosReducer";

const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    addReducer,
    counterReducer,
    helloReducer,
    todosReducer,
  },
});

export default store;