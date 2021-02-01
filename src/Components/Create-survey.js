import React, { useState,useEffect} from 'react';
import MultiSclect from './multi-sclect';
import SingleSlt from './single-seclect';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams,useLocation, useHistory } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function  CreateSurvey(){
  const  { surveyID } = useParams ();
  const query  = useLocation().search;
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownText, setDropdownText] = useState("Select Question Type");
  
  useEffect(() => {
    if(query ==='?clear=true'){
        setDropdownText("Select Question Type");
        history.push('/create/'+ surveyID);
    }
  }, [query,history,surveyID]);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <>
    <p>Survey ID: <b>{surveyID}</b></p>
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {dropdownText}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick ={()=> setDropdownText("Multi Select Question")} >Multi Select Question</DropdownItem>
        <DropdownItem onClick ={()=> setDropdownText("Single Select Question")}> Single Select Question </DropdownItem>
      </DropdownMenu>
    </Dropdown>
     {dropdownText === "Single Select Question" ? <SingleSlt /> : null}
     {dropdownText === "Multi Select Question" ? <MultiSclect /> : null}
     </>
  );
}

export default CreateSurvey;