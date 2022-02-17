const $modal = document.querySelector('.modal-container')
const $modalMessage = document.querySelector('.modal-message')
const $modalCloseBtn = document.querySelector('.modal-close-btn')
const $modalBtns = document.querySelector('.modalBtns')

$modalCloseBtn.addEventListener('click', () => {
    $modal.style.display = "none"
})

const showModalWindow = function (message, option) {
    $modalBtns.style.display = "flex"
    if(option === 'alert') {
        $modalBtns.style.display = "none"
    }
    $modal.style.display = "block"
    $modal.style.zIndex = "100"
    $modalMessage.innerHTML = message 
}