import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/User";
import UserCard from "./UserCard";

interface IDashboardProps {
  currentUser: User | undefined;
}

function Dashboard(props: IDashboardProps) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/ecommerce/users")
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  return props.currentUser ? (
    <Navigate to="/login" />
  ) : (
    <>
      <Container>
        <h1>Admin Dashboard</h1>
        <h3>Users</h3>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {users.map((user: User) => (
            <UserCard user={user} key={user.id} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
