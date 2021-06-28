import { Link } from "react-router-dom"
import SurveyList from './surveys/SurveyList'
const Dashboard = () => <><h1 align="center">List of Your Surveys</h1>
    <SurveyList/>
    <div className="fixed-action-btn">
        <Link className="btn-floating btn-large red" to="/surveys/new">
            <i className="large material-icons">add</i>
        </Link>
        <ul>       </ul>
    </div></>
export default Dashboard