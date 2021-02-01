import {useState} from 'react';
import {useParams,useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { surveySlice } from '../store/surveySlice';
import { InputGroup, InputGroupAddon, InputGroupText, Input,Button } from 'reactstrap';

export default function SingleSlt() {
    const  { surveyID } = useParams ();
    const dispatch = useDispatch();
    let history = useHistory();
    const [options, setoption] = useState(["",'']);
    const [Question, setQuestion] = useState("");

    const setoptionInArray = (value, optionidx) => {
        options[optionidx] = value;
        setoption([...options]);
    }

    const addQuestionClickAction = () => {
        const payload = {
          options,
          Question,
          surveyID,
          type: "single",
        };
        dispatch(surveySlice.actions.addQuestion(payload));
        history.push("/create/" + surveyID + '?clear=true' );
      };

      const publishQuestion =()=>{
        const payload = {
            options,
            Question,
            surveyID,
            type: "single",
          };
          dispatch(surveySlice.actions.addQuestion(payload));
          history.push("/confirm/" + surveyID);
      }

    const isQuestionAddPublishDisabled = () =>Question.trim() ===''||options.find((opt) => opt.trim()==='') !== undefined 

    return (
        <div className="Question-container">
            <InputGroup className="input-grp">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>?</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Your Question" onChange={(e) => setQuestion(e.target.value)} value={Question} />
            </InputGroup>
            <p className="option-text">Options</p>
            <InputGroup className="input-grp">
                <InputGroupAddon addonType="prepend">
                </InputGroupAddon>
                <Input placeholder="option 1" value={options[0]} onChange={(e)=> setoptionInArray(e.target.value, 0)}/>
                <InputGroupAddon addonType="append">
                    <InputGroupText>+</InputGroupText>
                    <InputGroupText>-</InputGroupText>
                </InputGroupAddon>
            </InputGroup >
            <InputGroup className="input-grp">
                <InputGroupAddon addonType="prepend">
                </InputGroupAddon>
                <Input placeholder="option 2" value={options[1]} onChange={(e)=> setoptionInArray(e.target.value, 1)} />
                <InputGroupAddon addonType="append">
                    <InputGroupText>+</InputGroupText>
                    <InputGroupText>-</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <div className="question-button">
                <Button className="survey-main-btn"disabled={ isQuestionAddPublishDisabled()} 
                onClick={addQuestionClickAction}>Add-Question</Button>
                <Button className="survey-main-btn"  disabled={ isQuestionAddPublishDisabled()} onClick={publishQuestion}>Publish</Button>
            </div>
        </div>
    )
}
