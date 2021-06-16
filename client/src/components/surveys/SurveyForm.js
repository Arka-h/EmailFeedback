/* eslint-disable array-callback-return */
import { reduxForm, Field } from "redux-form"
import SurveyField from './SurveyField'
import { Link } from 'react-router-dom'
import { validateEmails } from "../../utils/validateHelper"
import formFields from "./formFields"

/* Name is the key against which the value is stored in the redux store */
const SurveyForm = (props) => {
    // console.log(props)
    return <>
        <h1>New Survey</h1>
        <form onSubmit={props.handleSubmit(props.onSurveySubmit)}>
            {
                formFields.map(({ label, name }) =>
                    <Field
                        label={label}
                        type="text"
                        name={name}
                        component={SurveyField}
                    />)
            }
            <Link to="/surveys" className="red btn-flat white-text">
                Cancel
                <i className="material-icons right">cancel</i>
            </Link>
            <button type="submit" className="teal btn btn-flat right white-text">
                Next
                <i className="material-icons right">done</i>
            </button>
        </form>
    </>
}
const validate = (values) => { // values as we get access to inside of handleSubmit()
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '')
    formFields.map(({ name }) => {
        if (!values[name]) errors[name] = `* required`
    })
    return errors
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm)