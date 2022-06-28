import { Button, ButtonGroup, Card, CardMedia, Grid } from "@mui/material";
import { User } from "../../models/User";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <Grid item key={user.id} xs={4} md={4} lg={2.8}>
      <Card className="product">
        <div>
          <h4>{user.id}</h4>
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
          <h3>{user.address}</h3>
          <h3>{user.email}</h3>
          <h3>{user.role}</h3>
        </div>
        <ButtonGroup>
          <Button>Update</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </Card>
    </Grid>
  );
};

export default UserCard;
