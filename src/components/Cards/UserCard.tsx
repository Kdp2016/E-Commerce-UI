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

  return (
    <Grid item key={user.id} xs={4} md={4} lg={2.8}>
      <Card className="product">
        <div>
          <h4>{user.id}</h4>
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
          <h3>{user.email}</h3>
          <h3>{user.role}</h3>
        </div>
        <ButtonGroup>
          <Button onClick={() => setShow(true)}>Update</Button>
          <Button>Delete</Button>
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

            <Button onClick={updateUser}>Update</Button>
          </Box>
        </div>
      </Card>
    </Grid>
  );
};

export default UserCard;
