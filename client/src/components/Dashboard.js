import { Link } from "react-router-dom"
const Dashboard = () => <><h1 align="center">Dashboard</h1>
    <div className="fixed-action-btn">
        <Link className="btn-floating btn-large red" to="/surveys/new">
            <i className="large material-icons">add</i>
        </Link>
        <ul>       </ul>
    </div></>
export default Dashboard