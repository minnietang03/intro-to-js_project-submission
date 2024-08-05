const products = [
   {
      name: 'Cherry',
      price: 3.00,
      quantity: 0,
      productId: 1,
      image: '/images/cherry.jpg'
   },
   {
      name: 'Orange',
      price: 1.50,
      quantity: 0,
      productId: 2,
      image: '/images/orange.jpg'
   },
   {
      name: 'Strawberry',
      price: 5.00,
      quantity: 0,
      productId: 3,
      image: '/images/strawberry.jpg'
   }
];

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];

function findItemInCart(productId) {
   return cart.find(item => item.productId === productId);
}

function findProduct(productId) {
   return products.find(item => item.productId === productId);
}

function addProductToCart(productId) {

   // Find if the product is already in the cart
   const cartItem = findItemInCart(productId)

   // If the product is already in the cart, increase its quantity
   if (cartItem) {
      cartItem.quantity++;
   } else {
      // If the product is not in the cart, add it to the cart and set its quantity to 1
      // Find the product in the products array based on the productId
      const product = findProduct(productId)
      cart.push(product);
      product.quantity++;
   }
}

function increaseQuantity(productId) {
   // Find the product in the cart based on the productId
   const cartItem = findItemInCart(productId)

   // If the product is found, increase its quantity
   if (cartItem) {
      cartItem.quantity++;
   }
}

function decreaseQuantity(productId) {
   // Find the product in the cart based on the productId
   const cartItem = findItemInCart(productId)

   // If the product is found
   if (cartItem) {
      if (cartItem.quantity > 1) {
         // If quantity is greater than 1, decrease the quantity
         cartItem.quantity--;
      } else {
         // If quantity is 1, remove the product from the cart
         cart.splice(cart.indexOf(cartItem), 1);
         cartItem.quantity--;
      }
   }
}


function removeProductFromCart(productId) {
   // Find the product in the cart based on the productId
   const cartItem = findItemInCart(productId)

   // If the product is found, remove it from the cart and set its quantity to 0
   if (cartItem) {
      cart.splice(cart.indexOf(cartItem), 1);
      cartItem.quantity = 0;
   }
}

function cartTotal() {
   // Reduce the cart array to get the total cost by summing up price * quantity for each item
   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function emptyCart() {
   cart.length = 0; // Empty the cart array
}

// variable to track the total amount paid
let totalPaid = 0;

function pay(amount) {

   //add the current payment amount to the totalPaid variable
   totalPaid += amount;

   //calculate the difference between totalPaid and cartTotal
   const remaining = totalPaid - cartTotal();

   //check if remaining amount is greater than or equal to zero
   if (remaining >= 0){
      //if so, reset totalPaid to zero to prepare it for the next transaction, as current payment is enough to cover
      // the cartTotal
      totalPaid =0;
      emptyCart()
   }
   // Return the remaining (negative if payment is less than the cartTotal
   return remaining
}

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay,
   emptyCart,
}
