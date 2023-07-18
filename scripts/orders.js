

const orders = JSON.parse(localStorage.getItem('orderItems')) || [];

renderOrderItems();
function renderOrderItems() {
  let orderObjectsHTML = '';
  let orderItemsHTML = '';
  let orderContainerHTML = '';
  let cartTotal = 0;
  let shippingHandling = 0;
  let totalBeforeTax = 0;
  let estimateTax = 0;
  let orderTotal = 0;
  let cartQuantity = 0;
  let currentDate = Date();
  const orderId = new Date().getTime();
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
          <button class="buy-again-button button-primary js-buy-again-btn" data-product-id="${product.id}">
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
  }

  orderObjectsHTML += `
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${currentDate}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${(orderTotal/100).toFixed(2)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order Id:</div>
        <div>${orderId}</div>
      </div>
    </div>

    <div class="order-details-grid js-order-details-grid"></div>
  `;
  
  orderContainerHTML = `
    <div class="order-container js-order-container"></div>
  `;
  
  document.querySelector('.js-orders-grid').innerHTML = orderContainerHTML;
  document.querySelector('.js-order-container').innerHTML = orderObjectsHTML;
  document.querySelector('.js-order-details-grid').innerHTML = orderItemsHTML;  
}


cartQuantityCount();
function cartQuantityCount() {
  let cartQuantity = 0;
  cart.forEach((item)=> {
    cartQuantity+=item.quantity;
  });
  document.querySelector('.js-orders-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-buy-again-btn').forEach((button)=> {
  button.addEventListener('click', ()=> {
    const productId = button.dataset.productId;
    let matchingItem;
    let quantity = 1;
    cart.forEach((item)=> {
      if (item.productId === productId) {
        matchingItem = item;
      } 
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cart));
    
    cartQuantityCount();
  });
});


let ordersArray = [];
function createOrder(selectedItems) {
  const order = {
    items: selectedItems
  };
  ordersArray.push(order);
  return order;
}
