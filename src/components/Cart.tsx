
import { Avatar, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { border, borderRadius, borders, Container, grid, height } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { Product } from '../models/Product';
import GroupedButtons from './PlusMinusButton';



type Props = {
  cartItems: Product[];
  addToCart: (clickedItem: Product) => void;
  removeFromCart: (id: number) => void;
};

const Cart = ({}: Props) => {



  const getTotalItems = (items: Product[]) =>
  items.reduce((acc, item) => acc + item.amount, 0);
  
  const calculateTotal = (items: Product[]) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

// function Cart() {


    return (

        <>
        <h1>Your Shopping Cart</h1>
        <Typography variant="subtitle1">Cart</Typography>
        <div style={{height: 40, width: '100%'}}>
    <List dense sx={{ width: '100%', maxWidth: 760, bgcolor: 'background.blue' }}>
    {products.map((product:Product)  => {
      return (
        <Container>
        <ListItem style={{display: 'inline'}}
        ><Grid container spacing={2} style ={{ width: '100%', maxWidth: 760 }}>
          <ListItemButton  sx={{bgcolor: 'gray'}} style={{border: 'solid', borderRadius: '8px'}} >
          <Grid item key={product.id}>
            <ListItemAvatar >
              <Avatar style={{display:'block', width:'88px', height:'88px', border:'none', borderRadius: '8px'}}

                src={product.productImage}
              />
            
            </ListItemAvatar>
            </Grid> 
              <Grid item xs marginLeft={5}>
                <ListItemText primary={product.productName} />
              </Grid> 
              <Grid item xs marginLeft={20}>
                <GroupedButtons />
                </Grid>

                <Grid item xs>
                <div ><p>Cost: ${product.price}</p></div>
                </Grid>

          </ListItemButton>
          </Grid>
        </ListItem>
    
        </Container>
      );
    })}
  </List>
  <h2>Total: ${calculateTotal(products).toFixed(2)}</h2>
         </div>
      
        
    </>

    )
   

}

export default Cart