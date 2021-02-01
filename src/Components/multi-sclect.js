import { useState } from 'react';
import {useParams,useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { surveySlice } from "../store/surveySlice";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

export default function MultiSclect() {
    const  { surveyID } = useParams ();
    const dispatch = useDispatch();
    let history = useHistory();
    const [options, setoption] = useState([""]);
    const [Question, setQuestion] = useState("");

    const addQuestionClickAction = () => {
        const payload = {
          options,
          Question,
          surveyID,
          type: "multiple",
        };
        dispatch(surveySlice.actions.addQuestion(payload));
        history.push("/create/" + surveyID + '?clear=true' );
      };


    const addOption = (optionidx) => {
        if (options.length < 4) {
            const newOption = [...options, ""]
            const newOptionidx = optionidx + 1;
            let currentNewOptionIndex = newOption.length - 1;
            while (newOptionidx !== currentNewOptionIndex) {
                newOption[currentNewOptionIndex] = newOption[currentNewOptionIndex - 1];
                currentNewOptionIndex--;
                newOption[currentNewOptionIndex] = "";
            }
            setoption(newOption);
        }
    }

    const removeOption = (optionidx) => {
        console.log("jadsf");
        if (options.length > 1) {
            options.splice(optionidx, 1);
            setoption([...options]);
        }
    }

    const setoptionInArray = (value, optionidx) => {
        options[optionidx] = value;
        setoption([...options]);
    }

    const isQuestionAddPublishDisabled = () => Question.trim() ===''||options.find((opt) => opt.trim()==='') !== undefined ;

return (
    <div className="Question-container">
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <InputGroupText>?</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Your Question" onChange={(e) => setQuestion(e.target.value)} value={Question} />
        </InputGroup>
        <p className="option-text">Options</p>
        {
            options.map((option, optionidx) => (
                <InputGroup className="input-grp" key={optionidx}>
                    <Input placeholder={`option${optionidx + 1}`} value={option}
                        onChange={(e) => setoptionInArray(e.target.value, optionidx)} />

                    <InputGroupAddon addonType="append">
                        <Button onClick={() => addOption(optionidx)} disabled={options.length === 4}>+</Button>
                        <Button onClick={() => removeOption(optionidx)} disabled={options.length === 1}>-</Button>
                    </InputGroupAddon>
                </InputGroup >
            ))
        }
        { options.length === 4 ? (
            <div className="question-button">
                <Button className="survey-main-btn"
                    disabled={ isQuestionAddPublishDisabled()} onClick={addQuestionClickAction}
                >Add-Question</Button>
                <Button className="survey-main-btn"  disabled={ isQuestionAddPublishDisabled()}>Publish</Button>
            </div>
        ) : null}
    </div>
)
}
