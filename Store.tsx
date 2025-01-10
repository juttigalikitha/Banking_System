import { configureStore } from "@reduxjs/toolkit";
import Sentencereducer from './Typetestslice';

export const store = configureStore ({
    reducer: {
        Sentence : Sentencereducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;