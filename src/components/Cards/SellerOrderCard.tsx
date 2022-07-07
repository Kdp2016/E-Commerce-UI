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
        id: order.orderId,
        status: "DELIVERED",
      }),
    }).then((resp) => {
      setShow(false);
      return resp.json();
    });
  }

  let orderCancel = () => {
    console.log("I've been clicked");
    fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/orders`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: order.orderId,
        status: "CANCELLED",
      }),
    }).then((resp) => {
      setShow(false);
      return resp.json();
    });
  }

  if (order.status == "ORDERED") {

    return (
      <Grid item key={order.orderId} xs={4} md={4} lg={2.8}>
        <Card className="product">
          <div>
            <h2>Order: {order.orderId}</h2>
            <h2>Customer Id: {order.customer_id}</h2>
            <h4>Shipping Address: {order.address}</h4>
            <h4>Total: ${order.total}</h4>
            <h4>Status: {order.status}</h4>
          </div>
          <ButtonGroup>
            <Button onClick={() => orderCancel()} variant="contained" color="error">Cancel</Button>
            <Button onClick={() => orderDeliver()} variant="contained" color="error">Deliver</Button>
          </ButtonGroup>
        </Card>
      </Grid>
    );
  } else {
    return (
      <Grid item key={order.orderId} xs={4} md={4} lg={2.8}>
        <Card className="product">
          <div>
            <h2>Order: {order.orderId}</h2>
            <h2>Customer Id: {order.customer_id}</h2>
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
