import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from "react-router"
import formFields from "./formFields"
import { submitSurvey } from "../../actions"

const SurveyReview = ({ onCancel, history }) => {
    const dispatch = useDispatch()
    const formValues = useSelector((state) => state.form.surveyForm.values)
    return <>
        <h5>Please confirm your entries</h5>
        {
            formFields.map(({ label, name }) => (<>
                <label htmlFor={label}>{label}</label>
                <div>{formValues[name]}</div>
            </>)
            )}
        <button
            className="orange btn-flat white-text"
            onClick={onCancel}>
            Back
        </button>
        <button
            onClick={() => { dispatch(submitSurvey(formValues, history)) }} //submitSurvey is an action
            className="green btn-flat right white-text"
        >
            Send Survey
            <i className="material-icons right">email</i>
        </button>
    </>
}

export default withRouter(SurveyReview)