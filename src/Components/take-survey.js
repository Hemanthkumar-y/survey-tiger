import React from 'react'
import {  useSelector } from 'react-redux';
import { Button } from 'reactstrap';

export default function TakeSurvey() {
    const surveyIDs = useSelector((globalStore) => globalStore.surveys.filter((s) =>s.isPublished).map((s)=> s.surveyID));

    return (
        <>
           {surveyIDs.map((surveyID)=>(
           <Button className="survey-main-btn" key={surveyID} >
               Take-survey{surveyID}
            </Button>))
           } 
        </>
    );
}
