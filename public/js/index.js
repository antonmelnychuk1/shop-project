let cart = {};

function init() {
    //substract file products.json
    $.getJSON('products.json', productsOut)
}        

function productsOut(data) {
    //page output 
    let out = '';
        for (let key in data) {
            out += `<div class="single-products">
                        <h3>${data[key].title}</h3>
                        <img src="${data[key].img}">
                        <p>${data[key].price} USD</p>
                        <button class="add" data-id="${key}">Add to cart</button>
                    </div>
            `; 
        }

        $('#products').html(out)
        $('button.add').on('click', addToCart);
}
        
function addToCart() {
    let id = $(this).attr('data-id');
    // let id = this.getAttribute('data-id'); 
    if (cart[id]!=undefined) {
        cart[id]++;
    } else {
        cart[id] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    showCounter()
}

function checkCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'))
        showCounter() 
    }
}

function showCounter() {
    let out = '';
    let sum = 0;
    for (let key in cart) {
        if (cart.hasOwnProperty(key)) {
            sum += parseFloat(cart[key]);
        } else return sum;
    }
     out += `
        <div class="icon-cart">
            <a href="cart.html">
                <div class="icon-count">
                    <img src="/img/cart.png">  
                    <p>${sum}</p>
                </div>
            </a>
        </div>
        `;
    
     
    
    $('#header').html(out);
    // document.querySelector('.cart-amount').innerHTML = out;
     
}

$('document').ready(function() {
    init();
    checkCart();    
});
 
