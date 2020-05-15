const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

function toggleModal() {
    modal.classList.toggle("is-open");
}

'use strict';
// day1
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const rests = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const clear = document.querySelector('.clear-cart');

let login = localStorage.getItem('gloDelivery');
console.log(login);

const getData = async function (url) {
    const response = await fetch(url);
    return await response.json();
};

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
}

const cart = [];

function authorized() {
    function logOut() {
        login = '';
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        cartButton.style.display = '';

        buttonOut.removeEventListener('click', logOut)


        checkAuth();

    }

    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';
    cartButton.style.display = 'flex';

    buttonOut.addEventListener('click', logOut)
}


function notAuthorized() {
    // console.log('not')
    function logIn(event) {
        event.preventDefault();
        login = loginInput.value;

        localStorage.setItem('gloDelivery', login);

        // console.log(login)
        toggleModalAuth();
        buttonAuth.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        loginForm.removeEventListener('submit', logIn);
        loginForm.reset();
        checkAuth();
    }

    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    loginForm.addEventListener('submit', logIn);

}

function checkAuth() {
    if (login) {
        authorized();
        // console.log('fsd')
    } else {
        notAuthorized();
    }
}

checkAuth();

function createCard(restaurant) {

    const {
        image,
        kitchen,
        name,
        price, stars, products, time_of_delivery: timeOfDelivery
    } = restaurant;

    const card = `<a  class="card card-restaurant" data-products="${products}"> 
        <img src="${image}" alt="image" class="card-image"/>
        <div class="card-text">
        <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${timeOfDelivery} min</span>
    </div>
    <div class="card-info">
        <div class="rating">
        ${stars}
        </div>
        <div class="price">От ${price} ₽</div>
    <div class="category">${kitchen}</div>
    </div>
    </div>
    </a>`;

    cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}


function createCardGood({description, id, image, name, price}) {
    const card = document.createElement('div');
    card.className = 'card';
    // card.id=id;
    card.insertAdjacentHTML('beforeend', `			
        <img src="${image}" alt="image" class="card-image"/>
        <div class="card-text">
        <div class="card-heading">
        <h3 class="card-title card-title-reg">Пицца Классика</h3>
    </div>
    <div class="card-info">
        <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
    грибы.
    </div>
    </div>
    <div class="card-buttons">
        <button class="button button-primary button-add-cart" id="${id}">
        <span class="button-card-text">В корзину</span>
    <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold card-price">510 ₽</strong>
    </div>
    </div>
`);
    cardsMenu.insertAdjacentElement('beforeend', card)
    console.log(card)
}

function openGoods(event) {
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');
    if (restaurant) {
        containerPromo.classList.add('hide');
        rests.classList.add('hide');
        menu.classList.remove('hide');
        cardsMenu.textContent = '';
        getData(`./db/${restaurant.dataset.products}`).then(function (data) {
            data.forEach(createCardGood)
        })
        createCardGood();
    } else {
        toggleModalAuth()
    }
    // console.log('restaurant:',restaurant)
}

function addToCart(event) {
    const target = event.target;
    const buttonAddToCart = target.closest('.button-add-cart');
    if (buttonAddToCart) {
        const card = target.closest('.card');
        const title = card.querySelector('.card-title-reg').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddToCart.id;
        const food = cart.find(function (item) {
            return item.id === id;
        })

        if (food) {
            // food.count=food.count+1;
            food.count += 1;
        } else {
            cart.push({
                id: id,//:id deb yozish ixtiyoriy
                title: title,
                cost: cost,
                count: 1
            })
        }


// console.log(cart);
    }
}

function renderCart() {
    modalBody.textContent = '';
    cart.forEach(function ({id, item, cost, count}) {
        const itemCart = `<div class="food-row">
        <span class="food-name">Ролл угорь стандарт</span>
    <strong class="food-price">${cost} ₽</strong>
    <div class="food-counter">
        <button class="counter-button minus" data-id="${id}">-</button>
        <span class="counter">${count}</span>
        <button class="counter-button plus" data-id="${id}">+</button>
        </div>
        </div>`;
        modalBody.insertAdjacentHTML('afterbegin', itemCart);
    });

    const totalPrice = cart.reduce(function (result, item) {
        return result + (parseFloat(item.cost) * item.count);
    }, 0);
    modalPrice.textContent = totalPrice;
}

function changeCount(event) {
    const target = event.target;
    if (target.classList.contains('counter-button')){
        const food = cart.find(function (item) {
            return item.id === target.dataset.id;
        });
        if (target.classList.contains('minus')) {
            food.count--;
            if (food.count===0){
                cart.splice(cart.indexOf(food),1);
            }
        }
        if (target.classList.contains('plus')) {
            food.count++;

        }
        renderCart();

    }

}


function init() {
    getData('./db/partners.json').then(function (data) {
        data.forEach(createCard)
    });

    cartButton.addEventListener("click", function () {
        renderCart();
        toggleModal();
    });
    clear.addEventListener('click',function () {
cart.length=0;
renderCart();
    })
    modalBody.addEventListener('click', changeCount)
    cardsMenu.addEventListener('click', addToCart);
    close.addEventListener("click", toggleModal);
    cardsRestaurants.addEventListener('click', openGoods);
    logo.addEventListener('click', function () {
        containerPromo.classList.remove('hide');
        rests.classList.remove('hide');
        menu.classList.add('hide');
    })
}

init();