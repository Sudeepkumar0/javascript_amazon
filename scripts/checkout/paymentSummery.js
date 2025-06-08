import { cart } from "../../data/cart.js";
import { deliveryOption, deliveryoptions } from "../../data/deliveryoptions.js";
import { getProduct } from "../../data/products.js";
import { countCheckout } from "../../data/cart.js";

//we take the datails of the prouct
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPrice = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = deliveryoptions(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.priceCents;
  });
  const totalBeforeTaxcents = productPriceCents + shippingPrice;
  const tax = totalBeforeTaxcents * 0.1;
  const totalCents = totalBeforeTaxcents + tax;

  const paymentSummeryHTML = `
            <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>items ${countCheckout()}</div>
            <div class="payment-summary-money">$${(productPriceCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTaxcents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(tax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCents/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
           `;

           document.querySelector('.js-payment-summery').innerHTML = paymentSummeryHTML;
}

