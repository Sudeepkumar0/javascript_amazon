import {cart} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { deliveryOption } from '../../data/deliveryoptions.js';
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { updateDeliveryOption, removeFromCart } from '../../data/cart.js';
import { renderPaymentSummary } from './paymentSummery.js';




const today = dayjs();

export function renderOrderSummery() {
  let cartSummaryHtml = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = products.find(
      (product) => product.id === productId
    );

    const deliveryOptions = deliveryOption.find(
      (option) => option.id === cartItem.deliveryOptionId
    );

    if (!deliveryOptions) {
      console.error(
        `No delivery option found for ID: ${cartItem.deliveryOptionId}`
      );
      return;
    }

    const deliveryDate = today.add(deliveryOptions.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${(matchingProduct.priceCents / 100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              matchingProduct.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${generateDeliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
  });

  function generateDeliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOption.forEach((option) => {
      const deliveryDate = today.add(option.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const isChecked = option.id === cartItem.deliveryOptionId;

      const priceString =
        option.priceCents === 0
          ? "Free"
          : `$${(option.priceCents / 100).toFixed(2)}`;

      html += `
      <div class="delivery-option js-delivery-option"
        data-prd-id="${matchingProduct.id}"
        data-dld-id="${option.id}">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
          ${isChecked ? "checked" : ""}>
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>
    `;
    });

    return html;
  }

  // Update the cart summary in the DOM
  document.querySelector(".js-order-summery").innerHTML = cartSummaryHtml;

  // Delete button logic
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productID = link.dataset.productId;
      removeFromCart(productID);
      renderPaymentSummary();
      const container = document.querySelector(
        `.js-cart-item-container-${productID}`
      );
      container.remove();
    });
  });

  // Delivery option update logic
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { prdId, dldId } = element.dataset;
      updateDeliveryOption(prdId, dldId);
      renderOrderSummery();
      renderPaymentSummary();
    });
  });
}


// renderOrderSummery();
