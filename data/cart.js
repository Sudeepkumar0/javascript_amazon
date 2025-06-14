export let cart = JSON.parse(localStorage.getItem('cart')) || []; //localstorage only saves the string , so we need convert into array 
// import { renderCheckoutCartCount } from "../scripts/checkout.js";
// if(!cart){
// cart = [{
//   productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//   quantity: 2,
//   deliveryOptionId: '2'
// },
// {
//   productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//   quantity: 1,
//   deliveryOptionId: '1'

// }];
// }



function saveToStorage(){  //local storage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart);
  renderCheckoutCartCount();
}
export function renderCheckoutCartCount() {
  const count = countCheckout();
  const el = document.querySelector('.js-checkout-count');
  if (el) {
    el.textContent = count;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutCartCount();
});

// export function renderCartCount() {
//   const count = countCheckout();
//   document.querySelector('#cart-count').textContent = count;
// }

export function countCheckout() {
  return cart.length;
}

// export function countCheckout() {
//   let totalCount = 0;
//   cart.forEach((item) => {
//     totalCount += item.quantity;
//   });
//   return totalCount;
// }


export function addTocart(productId){
      let matchingItem;

    cart.forEach((cartItem) =>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    })
    if(matchingItem){
      matchingItem.quantity += 1;
    }else{
      cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    })
    }
    saveToStorage();
}

export function removeFromCart(productID){
  const newCart = [];
  cart.forEach((cartitem) => {
    if(cartitem.productId !== productID){
      newCart.push(cartitem);
    }
  });

  cart = newCart;

  saveToStorage();
}


export function updateDeliveryOption(productID, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productID === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
