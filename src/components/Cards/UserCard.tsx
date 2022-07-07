import { Box, Button, ButtonGroup, Card, CardMedia, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { User } from "../../models/User";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  const [role, setRole] = useState(user.role);
  const [show, setShow] = useState(false);

  let updateRole = (e: SyntheticEvent) => {
    setRole((e.target as HTMLInputElement).value);
  }

  let updateUser = () => {
    fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        role: role,
      }),
    }).then((resp) => {
      setShow(false);
      return resp.json();
    });
  }

  let deactivateUser = () => {
    fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/users/delete/?id=${user.id}`, {
      method: "DELETE",
    }).then((resp) => {
      setShow(false);
      return resp.json();
    });
  }

  let activateUser = () => {
    fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/users/activation/?id=${user.id}`, {
      method: "PATCH",
    }).then((resp) => {
      setShow(false);
      return resp.json();
    });
  }

  return (
    <Grid item key={user.id} xs={4} md={4} lg={2.8}>
      <Card className="product">
        <div>
          <h2>USER ID: {user.id}</h2>
          <h4>First Name: {user.firstName}</h4>
          <h4>Last Name: {user.lastName}</h4>
          <h4>Email: {user.email}</h4>
          <h4>Role: {user.role}</h4>
          <h3>Account Status: {user.active ? "Active" : "Inactive"}</h3>
        </div>
        <ButtonGroup>
          <Button onClick={() => setShow(true)} variant="contained" color="error">Update</Button>
          {user.active == true ? <Button onClick={() => deactivateUser()} variant="contained" color="error">Deactivate</Button>
            : <Button onClick={() => activateUser()} variant="contained" color="error">Activate</Button>}
        </ButtonGroup>
        <div style={{ display: show ? "block" : "none" }}>
          <Box>
            <h1>Update Role</h1>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={role}
                label="Role"
                onChange={event => setRole(event.target.value as string)}            >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="BUYER">BUYER</MenuItem>
                <MenuItem value="SELLER">SELLER</MenuItem>
              </Select>
            </FormControl>

            <Button onClick={updateUser} variant="contained" color="error">Update</Button>
          </Box>
        </div>
      </Card>
    </Grid>
  );
};

export default UserCard;
