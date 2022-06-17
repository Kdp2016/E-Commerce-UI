import { Navigate } from "react-router-dom";
import { UserInterface } from "../models/user";

interface IDashboardProps {
    currentUser: UserInterface | undefined
}

function Dashboard(props: IDashboardProps) {
     return (
        !props.currentUser ? <Navigate to="/login" /> :
        <>
            <h1>Welcome, {props.currentUser.firstName}!</h1>
        </>
    );
}

export default Dashboard;