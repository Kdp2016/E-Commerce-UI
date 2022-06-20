// import { Box, Button, Card, List, ListItem } from '@mui/material'
// import { Container } from '@mui/system'
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { ProductModel } from '../models/Product'
// import products from '../models/products'



// type Props = {
//     product: ProductModel;
//   //   handleAddToCart: (clickedItem: ProductModel) => void;
//   };

// export default  Productpage = ({ product }) => {
//   return (
//     <>
//         <Container>
//         <Link className='btn btn-light my-3'to='/'>Go Back</Link>
//         <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
//         <Box gridColumn="span 8">
//           <Image src={product.image} alt={product.title} fluid/>
//         </Box>
//         <Box >
//           <List >
//               <ListItem> 
//                 <h3>{product.title}</h3>
//               </ListItem>
//               <ListItem> 
//                 <Rating 
//                 value={product.rating} 
//                 text={`${product.numReviews} reviews`}></Rating>
//               </ListItem>
//               <ListItem> 
//                 Price: ${product.price}
//               </ListItem>
//               <ListItem> 
//                 Description: {product.description}
//               </ListItem>
              
//           </List>
//         </Box>
//         <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
//           <Card>
//               <List>
//                   <ListItem>
//                       <Box>
//                         <Box gridColumn="span 8">
//                           Price:
//                         </Box>
//                         <Box gridColumn="span 8">
//                           <strong>${product.price}</strong>
//                         </Box>
//                       </Box>
//                   </ListItem>

//                   <ListItem>
//                       <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
//                         <Box gridColumn="span 8">
//                           Status:
//                         </Box>
//                         <Box gridColumn="span 8">
//                           {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
//                         </Box>
//                       </Box>
//                   </ListItem>
                  
//                   {product.countInStock > 0 && (
//                     <ListItem>
//                       <Box>
//                         <Box gridColumn="span 8">Qty</Box>
//                         <Box gridColumn="span 8">
//                           <Form.Control 
//                             as='select' 
//                             value={qty} 
//                             onChange={(e) => setQty(e.target.value)}
//                           >
//                             {[...Array(product.countInStock).keys()].map((x) => (
//                               <option key={x + 1} value={x + 1}>
//                                 {x + 1}
//                               </option>
//                             ))}
                            
//                           </Form.Control>
//                         </Box>
//                       </Box>
//                     </ListItem>
//                   )}

//                   <ListItem  className="d-grid gap-2">
//                       <Button>
//                         Add To Cart
//                       </Button>
//                   </ListItem>
//               </List>
//           </Card>       
//         </Box>
//       </Box>
//       </Container>
        
    
//     </>
//   )
// }
