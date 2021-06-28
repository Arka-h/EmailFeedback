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
            {/* {surveys} */}
        </>
    )
}

export default Surveylist