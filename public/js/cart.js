let cart = {};

function checkCart() {
    //check if there is a cart entry in localStorage
    if (localStorage.getItem('cart')) {
        // if there is - decrypt and write to cart variable
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    } else {
        let out = `
                    <div class="empty">
                        <div>Cart is empty.</div>
                        <br>
                        <div><a href="https://my-shop-project-01.web.app/">Go to shop</a></div>
                    </div>
                    `;
        $('#cart').html(out)
        $('#email-field').html('')
    }
}

function showCart() {
    if (!isEmpty(cart)) {
        let out = `
                <div class="empty">
                    <div>Cart is empty.</div>
                    <br>
                    <div><a href="https://my-shop-project-01.web.app/">Go to shop</a></div>
                </div>
                `;
        $('#cart').html(out)
        $('#email-field').html('')
    } else {
        $.getJSON('products.json', function(data) {
            let products = data;
            let out = '';
            for (let id in cart) {
                out += `
                    <div class="cart-product">
                        <button class="delete" data-id="${id}">x</button>
                        <h3>${products[id].title}</h3>
                        <img src="${products[id].img}">
                        <p>${products[id].price} USD</p>
                        <div class="count-block">
                            <button class="minus" products-id="${id}">-</button>
                            ${cart[id]}
                            <button class="plus" products-id="${id}">+</button>
                            <div class="total-price-product">Total:${cart[id]*products[id].price}</div>
                        </div>
                    </div>
                `;
            }
            $('#cart').html(out);
            $('.plus').on('click', plusProducts)
            $('.minus').on('click', minusProducts)
            $('.delete').on('click', deleteProducts)
        })
    }   
}

function plusProducts() {
    let id = $(this).attr('products-id');
    cart[id]++;
    saveCartToLS();
    showCart();
}

function minusProducts() {
    let id = $(this).attr('products-id');
    if (cart[id] > 1) {
        cart[id]--;
    } else {
        delete cart[id];
    }
    saveCartToLS();
    showCart();
}

function deleteProducts() {
    let id = $(this).attr('data-id');
    delete cart[id];
    saveCartToLS();
    showCart();
}   

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
    for (let key in object) 
    if (object.hasOwnProperty(key)) return true;
    return false;      
}

function sendEmail() {
    let name = $('#name').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    if (name!= '' && email!= '' && phone!= '') {
        if(isEmpty(cart)) {
            $.post (
                "../core/mail.php",
                {
                    "name" : name, 
                    "email" : email, 
                    "phone" : phone, 
                    "cart" : cart
                },
                function(data) {
                    if (data==1) {
                        alert('Your order is accepted!');
                        document.querySelectorAll("form").forEach(f => f.reset());
                        cart = {};
                        saveCartToLS();
                        showCart();
                        showCounter();
                    }
                    else {
                        alert('Repeat order');
                    }
                }
            );  
        } else {
            alert('Cart is empty!')
        }
    } else {
        alert('Fill in the field!')
    }
}

$('document').ready(function() {
    checkCart();
    $('.send-email').on('click', sendEmail); 
});





