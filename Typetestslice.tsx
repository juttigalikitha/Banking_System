import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Sentence {
    Sentence : string[],
    currentsentence : string|null,
    loading : boolean,
    error: string|null,

}

const initialState : Sentence = {
    Sentence : [],
    currentsentence : '',
    loading : false,
    error: null,

}

export const fetchSentences = createAsyncThunk("Sentence/fetchSentences", async () => {
    try {
        const response = await fetch('https://dummyjson.com/quotes');
        if(!response.ok){
            throw new Error('Failed to fetch data');
        }  

        const data = await response.json();
        return data.quotes.map((item: {id:'number', quote:'string', author:'string'})=>item.quote);
    }
    catch(error:any) {
        throw error.message || "unknown message occured"
    }
});

const SentenceSlice = createSlice ({
    name : 'Sentence',
    initialState,
    reducers : {
        setCurrentSentence  (state, action)  {
            state.currentsentence = action.payload;
        },
  },
  extraReducers (builder) {
        builder
        .addCase(fetchSentences.pending,(state) => {
            state.loading = true;
            state.error = null;
        })

            .addCase(fetchSentences.fulfilled, (state, action) => {
                state.loading = false;
                state.Sentence = action.payload;
                state.currentsentence = action.payload[0] || null;

            })

            .addCase(fetchSentences.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
  }
});


export const {setCurrentSentence} = SentenceSlice.actions;
export default SentenceSlice.reducer;