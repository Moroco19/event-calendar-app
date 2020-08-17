const profnav = document.querySelector('#profilenav')
const evennav = document.querySelector('#eventsnav')
const usernav = document.querySelector('#usersnav')

function navStorage() {
    if (localStorage.getItem('navActive')) {
        let navStored = localStorage.getItem('navActive');
        document.querySelector(`#${navStored}`).classList.add('active');
    }
    else (
        leftli.classList.add('active')
    )
}

function profileActive() {
    localStorage.setItem('navActive', 'profilenav')
}

function eventsActive() {
    localStorage.setItem('navActive', 'eventsnav')
}

function usersActive() {
    localStorage.setItem('navActive', 'usersnav')
}

profnav.addEventListener('click', profileActive);
evennav.addEventListener('click', eventsActive);
usernav.addEventListener('click', usersActive);

window.addEventListener('load', navStorage());