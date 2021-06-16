// This one has wizard in it, so the two pages together
import { useState } from 'react'
import SurveyForm from './SurveyForm'
import { reduxForm } from "redux-form"
import SurveyFormReview from './SurveyFormReview'
const SurveyNew = () => {
    const [showReview, setReview] = useState(false)
    return showReview ? <SurveyFormReview onCancel={() => { setReview(false) }} />
        : <SurveyForm onSurveySubmit={() => setReview(true)} />
} // Suvey Form
export default reduxForm({
    form: 'surveyForm',
})(SurveyNew)
