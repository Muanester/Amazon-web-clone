
cartQuantityCount();

let productsHTML = '';

products.forEach(product => {
  productsHTML += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>
    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container js-product-quantity-container">
    <select>
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>
  `;
}
);

document.querySelector('.js-products-grid').innerHTML = productsHTML;

let thisCallBack = false;
let resetValue = true;
function selectValue(callback) {
  document.querySelectorAll('.js-product-quantity-container select').forEach((selectOption)=> {
    selectOption.addEventListener('change', ()=> {
      resetValue = false;
      thisCallBack = true;
      const selectedOption = selectOption.options[selectOption.selectedIndex];
      const selectedValue = selectedOption.value;
      if (typeof callback === 'function' && !resetValue) {
        callback(selectedValue);
        resetValue = true;
        thisCallBack = false;
      }
    });
    if (!thisCallBack && resetValue) {
      callback(1);
    }
  });
}


function handleSelectedValue(value) {
  optVal = Number(value);
  let addedToCart = false;
  document.querySelectorAll('.js-add-to-cart').forEach((button, index)=> {
    button.addEventListener('click', ()=> {
      addedToCart = true;
      if (addedToCart) {
        const addedDisp = document.querySelectorAll('.js-added-to-cart');
        addedThis = addedDisp[index];
        addedThis.style.opacity = 1;
        setTimeout(()=> {
          addedThis.style.opacity = 0;
        }, 1000);
      }

      const productId = button.dataset.productId;
      let matchingItem;
      cart.forEach((item)=> {
        if (productId === item.productId) {
          matchingItem = item;
        } 
      });
  
      if (matchingItem) {
        return;
      } else {
        cart.push({
          productId: productId,
          quantity: optVal
        });        
      }

      console.log(cart);
      localStorage.setItem('cartItems', JSON.stringify(cart));
      
      cartQuantityCount();
    })  
})
}

selectValue(handleSelectedValue);

function cartQuantityCount() {
  let cartQuantity = 0;
  cart.forEach((item)=> {
    cartQuantity+=item.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}