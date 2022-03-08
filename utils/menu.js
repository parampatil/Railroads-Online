//Menu Open-Close
const menu_overlay_open = () => {
    if (document.getElementById("menu-checkbox").checked === true) {
        document.querySelector(".menu-overlay").classList.add("open");
    }
    else {
        document.querySelector(".menu-overlay").classList.remove("open");
        document.getElementById("menu-checkbox").checked = false
    }
}

const menu_overlay_close = () => {
    document.querySelector(".menu-overlay").classList.remove("open");
    document.getElementById("menu-checkbox").checked = false
}