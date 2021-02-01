import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createSurvey = createAsyncThunk(
    'surveys/createSurvey',
        async (_, thunkAPI) => {
            //console.log(thunkAPI.getState());
            const newSurveyId = String(thunkAPI.getState().surveys.length+1);
            return newSurveyId;
    });

export const surveySlice = createSlice({
    name: "surveys",
    initialState: [],
    reducers: {
        addQuestion: (state, action) => {
            const { surveyID, type,Question, options } = action.payload;
            console.log("question",Question);
           // console.log(state.find((s) => s.surveyId === surveyID).questions);
            const q = state.find((s) => s.surveyId === surveyID).questions;
            const qId = String(q.length + 1);
            q.push({
              qId,
              type,
              Question,
              options,
            });
          },
          markPublished : (state,action) =>{
            const {surveyID} =action.payload;
            state.find((s)=>s.surveyId === surveyID).isPublished =true;
          }
    },
    extraReducers: {
        [createSurvey.fulfilled]: (state, action) => {
          state.push({
            questions: [],
            surveyId: action.payload,
            isPublished: false,
          });
        },
    }
});

