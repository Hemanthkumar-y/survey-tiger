import log from './log.JPG'
import { Button } from 'reactstrap';
import Createsvy from './Components/Create-survey.js';
import ConfirmSurvey from './Components/confirm-survey';
import './App.css';
import {
  Switch,
  Route,
  Link,
  useHistory 
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { surveySlice,createSurvey } from './store/surveySlice';
import { unwrapResult } from '@reduxjs/toolkit'
import TakeSurvey from './Components/take-survey';



function App() {

  const dispatch = useDispatch();
  let history = useHistory();

  const redirectToNewSurvey =()=> {
    //console.log('action',surveySlice.actions.createSurvey());
    dispatch(createSurvey())
    .then(unwrapResult)
    .then((newSurveyId)=> history.push("/create/" + newSurveyId));
  }

  return (
   
      <div className="App">
      <header className="App-header">
              <img src={log} className="App-logo" alt="logo" />
      </header>
        <Switch>
          <Route path="/create/:surveyID"><Createsvy/></Route>
          <Route path="/confirm/:surveyID"><ConfirmSurvey /></Route>
          <Route path="/take"><TakeSurvey/></Route>
          <Route path="/">
                <Button className="survey-main-btn" onClick={redirectToNewSurvey}>Create-survey</Button>
              <Link to="/take">
              <Button className="survey-main-btn">Take survey</Button>
              </Link>
          </Route>
        </Switch>
      </div>
  );
}

export default App;
