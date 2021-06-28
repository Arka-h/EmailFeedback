/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSurveys } from '../../actions'
const Surveylist = (props) => {
    const dispatch = useDispatch()
    const surveys = useSelector(({ surveys }) => surveys)
    useEffect(() => {
        dispatch(fetchSurveys())
    }, [])
    return (
        <>
            <div className="flex-container">
                {surveys.reverse().map(({ body, title, subject, dateSent, response }) => <>
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card ">
                                <div className="card-content">
                                    <span className="card-title"><b><h5>{subject}</h5></b></span>
                                    <b>{title}</b>
                                    <p>{body}</p>
                                    <small className="right">
                                        Sent On: {new Date(dateSent).toLocaleDateString()}
                                    </small>
                                </div>
                                <div className="card-action" >
                                    {response ? Object.entries(response).map(([key, val]) => <a>{key}: {val}</a>): null}
                                </div>
                            </div>
                        </div>
                    </div>
                </>)}
            </div>
        </>
    )
}

export default Surveylist