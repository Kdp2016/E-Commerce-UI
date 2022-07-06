import { Button, ButtonGroup, Card, CardMedia, Grid } from "@mui/material";
import { useState } from "react";
import { Order } from "../../models/Order";

type Props = {
    order: Order;
};

const SellerOrderCard = ({ order }: Props) => {
    const [status, setStatus] = useState(order.status);
    const [show, setShow] = useState(false);
  
    let orderDeliver = () => {
      fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/orders`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order.id,
          status: "DELIVERED",
        }),
      }).then((resp) => {
        setShow(false);
        return resp.json();
      });
    }

    let orderCancel = () => {
      fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/orders`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order.id,
          status: "CANCELED",
        }),
      }).then((resp) => {
        setShow(false);
        return resp.json();
      });
    }

    if(order.status == "ORDERED") {

    return (
        <Grid item key={order.id} xs={4} md={4} lg={2.8}>
            <Card className="product">
                <div>
                    <h2>Order: {order.id}</h2>
                    <h4>Customer:</h4>
                    <h4>First Name: {order.buyer.firstName}</h4>
                    <h4>Last Name: {order.buyer.lastName}</h4>
                    <h4>Email: {order.buyer.email}</h4>
                    <h4>Shipping Address: {order.address}</h4>
                    <h4>Total: ${order.total}</h4>
                    <h4>Status: {order.status}</h4>
                </div>
                <ButtonGroup>
                    <Button onClick={() => orderCancel()}>Cancel</Button>
                    <Button onClick={() => orderDeliver()}>Deliver</Button>
                </ButtonGroup>
            </Card>
        </Grid>
    );
    } else {
      return (
        <Grid item key={order.id} xs={4} md={4} lg={2.8}>
            <Card className="product">
                <div>
                    <h2>Order: {order.id}</h2>
                    <h4>Customer:</h4>
                    <h4>First Name: {order.buyer.firstName}</h4>
                    <h4>Last Name: {order.buyer.lastName}</h4>
                    <h4>Email: {order.buyer.email}</h4>
                    <h4>Shipping Address: {order.address}</h4>
                    <h4>Total: ${order.total}</h4>
                    <h4>Status: {order.status}</h4>
                </div>
            </Card>
        </Grid>
    );
    }
};

export default SellerOrderCard;
