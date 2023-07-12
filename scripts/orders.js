
const orders = JSON.parse(localStorage.getItem('orderItems')) || [];

renderOrderItems();
function renderOrderItems() {
  let orderObjectsHTML = '';
  let orderItemsHTML = '';
  let cartTotal = 0;
  let shippingHandling = 0;
  let totalBeforeTax = 0;
  let estimateTax = 0;
  let orderTotal = 0;
  let cartQuantity = 0;
  orders.forEach((item)=> {
    cartQuantity+=item.quantity;
    products.forEach((product)=> {
      if (item.productId === product.id) {
        cartTotal+=product.priceCents * item.quantity;
      }
    });
  });
  if (cartQuantity > 0) {
    shippingHandling = 499;
    totalBeforeTax = cartTotal + shippingHandling;
    estimateTax = 0.1 * totalBeforeTax;
    orderTotal = totalBeforeTax + estimateTax;
  }

  orderObjectsHTML += `
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>August 12</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${(orderTotal/100).toFixed(2)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
          </div>
        </div>

        <div class="order-details-grid js-order-details-grid"></div>
        `;

  orders.forEach((item)=> {
    products.forEach((product)=> {
      if (item.productId === product.id) {
        orderItemsHTML += `
        <div class="product-image-container">
        <img src="${product.image}">
        </div>

        <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: August 15
        </div>
        <div class="product-quantity">
          Quantity: ${item.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
        </div>

        <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
        </div>
        `;
      }
    });
  });
  document.querySelector('.js-order-container').innerHTML = orderObjectsHTML;
  document.querySelector('.js-order-details-grid').innerHTML = orderItemsHTML;
  document.querySelector('.js-orders-cart-quantity').innerHTML = cartQuantity;
}

  
    







