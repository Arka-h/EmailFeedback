const SurveyField = ({ input, label, meta: { error, touched } }) => { // {meta} field contains the error object
    return <div>
        <label htmlFor={label}>{label}</label>
        <input {...input} />
        <div className="red-text" style={{ marginBottom: '20px' }}><small>{touched && error}</small></div>
    </div>
}

export default SurveyField