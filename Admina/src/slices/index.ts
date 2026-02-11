import { combineReducers } from '@reduxjs/toolkit';

const dummyReducer = (state = {}) => state;

const rootReducer = combineReducers({
    app: dummyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
