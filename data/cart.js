
const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

if (cart) {
  renderCartItems();
}
// renderCartItems();
function renderCartItems() {
  let cartHTML = '';
  cart.forEach((item)=> { 
    products.forEach((product)=> {
      if (item.productId === product.id) {
        cartHTML += `
        <div class="cart-item-container">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>
      
          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${product.image}">
      
            <div class="cart-item-details">
              <div class="product-name">
              ${product.name}
              </div>
              <div class="product-price">
              $${(product.priceCents / 100).toFixed(2)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">
                  ${item.quantity}
                  </span>
                </span>
                <span 
                class="update-quantity-link link-primary">
                  Update
                </span>
                <a

                 hyref="checkout.html"><span
                 
                class="delete-quantity-link link-primary js-delete-item">
                  Delete
                </span></a>
              </div>
            </div>
      
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked
                  class="delivery-option-input"
                  name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
        }
      });
  });

  document.querySelector('.js-order-summary').innerHTML = cartHTML;

  checkOut();
}

function checkOut() {
  let cartTotal = 0;
  let shippingHandling = 0;
  let totalBeforeTax = 0;
  let estimateTax = 0;
  let orderTotal = 0;
  let cartQuantity = 0;
  cart.forEach((item)=> {
    cartQuantity+=item.quantity;
  });

  cart.forEach((item)=> { 
    products.forEach((product)=> {
      if (item.productId === product.id) {
        cartTotal+=product.priceCents * item.quantity;
      }
    })
  });

  if (cartQuantity > 0) {
    shippingHandling = 499;
    totalBeforeTax = cartTotal + shippingHandling;
    estimateTax = 0.1 * totalBeforeTax;
    orderTotal = totalBeforeTax + estimateTax;
  }

  document.querySelector('.js-checkout-head').innerHTML = `
  <p>Checkout (<a class="return-to-home-link"
  href="amazon.html">${cartQuantity} items</a>)</p>
  `;

  document.querySelector('.js-payment-summary').innerHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">$${(cartTotal/100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${(shippingHandling/100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${(totalBeforeTax/100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${(estimateTax/100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${(orderTotal/100).toFixed(2)}</div>
  </div>

  <button class="place-order-button button-primary"
  onclick="
  localStorage.removeItem('cartItems');
  ">
    Place your order
  </button>
  `;

  deleteProduct();
}

function deleteProduct(){
  document.querySelectorAll('.js-delete-item').forEach((deleteItem, index)=> {
    deleteItem.addEventListener('click', ()=> {
      cart.splice(index, 1);
      saveCartItems();
      renderCartItems();
    });
  });
}

function saveCartItems() {
  localStorage.setItem('cartItems', JSON.stringify(cart));
}
