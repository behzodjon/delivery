const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

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
const cardsMenu= document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');
console.log(login);

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
}

function authorized() {
    function logOut() {
        login = '';
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        buttonOut.removeEventListener('click', logOut)

        checkAuth();

    }

    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';

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

function createCard() {
    const card = `<a  class="card card-restaurant">
        <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
        <div class="card-text">
        <div class="card-heading">
        <h3 class="card-title">Тануки</h3>
        <span class="card-tag tag">60 мин</span>
    </div>
    <div class="card-info">
        <div class="rating">
        4.5
        </div>
        <div class="price">От 1 200 ₽</div>
    <div class="category">Суши, роллы</div>
    </div>
    </div>
    </a>`;

    cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}

createCard();
createCard();
createCard();
createCard();

function createCardGood() {
    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `			
        <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
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
        <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
    <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">510 ₽</strong>
    </div>
    </div>
`);
    cardsMenu.insertAdjacentElement('beforeend',card)
    console.log(card)
}

function openGoods(event) {
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');
    if (restaurant) {
        containerPromo.classList.add('hide');
        rests.classList.add('hide');
        menu.classList.remove('hide');
        cardsMenu.textContent='';
        createCardGood();

    }
    // console.log('restaurant:',restaurant)
}

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function () {
    containerPromo.classList.remove('hide');
    rests.classList.remove('hide');
    menu.classList.add('hide');
})