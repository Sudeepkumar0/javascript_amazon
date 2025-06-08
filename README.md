JavaScript Amazon Clone

A fully responsive and simple Amazon-style e-commerce clone developed using HTML, CSS, and JavaScript (without any framework or backend). The project demonstrates how to create a shopping site interface with product listings, cart functionality, checkout system, and persistent data using `localStorage`.

Live Project

**https://sudeepkumar0.github.io/javascript_amazon**

---

## 🔍 Features

- Dynamic product listing with name, image, price, and rating
- Add to Cart functionality
- Live cart item count updates
- Checkout page showing selected products, quantity, and price
- Cart data saved and retrieved from `localStorage`
- Responsive layout suitable for desktop and mobile devices
- Pure vanilla JavaScript – no frameworks

---

## 🧠 How It Works

- Product data is stored in `products.js` as a JavaScript array
- The `amazon.html` page renders the product listing dynamically
- When a user clicks “Add to Cart,” the product is stored in the cart (JavaScript array)
- Cart data is saved to `localStorage` and automatically loaded on other pages
- The `checkout.html` page reads the cart data and calculates the total amount

---

## 📁 File Structure

