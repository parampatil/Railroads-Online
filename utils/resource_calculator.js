const $ipopgrid = document.querySelector("#ipop_grid");
const $lock = document.querySelector("#lock");

//Logging Camp elements
const $loggingcamp_op1 = document.querySelector("#loggingcamp-op1");
const $loggingcamp_op2 = document.querySelector("#loggingcamp-op2");

// sawmill elements
const $sawmill_ip2 = document.querySelector("#sawmill-ip2");
const $sawmill_op1 = document.querySelector("#sawmill-op1");
const $sawmill_op2 = document.querySelector("#sawmill-op2");
const $sawmill_cars1 = document.querySelector("#sawmill-cars1");

//Iron Mine elements
const $ironmine_ip1 = document.querySelector("#ironmine-ip1");
const $ironmine_ip2 = document.querySelector("#ironmine-ip2");
const $ironmine_op1 = document.querySelector("#ironmine-op1");
const $ironmine_cars1 = document.querySelector("#ironmine-cars1");
const $ironmine_cars2 = document.querySelector("#ironmine-cars2");

//Smelter
const $smelter_ip1 = document.querySelector("#smelter-ip1");
const $smelter_ip2 = document.querySelector("#smelter-ip2");
const $smelter_op1 = document.querySelector("#smelter-op1");
const $smelter_op2 = document.querySelector("#smelter-op2");
const $smelter_cars1 = document.querySelector("#smelter-cars1");
const $smelter_cars2 = document.querySelector("#smelter-cars2");

//Coal Mine
const $coalmine_ip1 = document.querySelector("#coalmine-ip1");
const $coalmine_ip2 = document.querySelector("#coalmine-ip2");
const $coalmine_op1 = document.querySelector("#coalmine-op1");
const $coalmine_cars1 = document.querySelector("#coalmine-cars1");
const $coalmine_cars2 = document.querySelector("#coalmine-cars2");

//Iron Works
const $ironworks_ip1 = document.querySelector("#ironworks-ip1");
const $ironworks_ip2 = document.querySelector("#ironworks-ip2");
const $ironworks_ip3 = document.querySelector("#ironworks-ip3");
const $ironworks_op1 = document.querySelector("#ironworks-op1");
const $ironworks_op2 = document.querySelector("#ironworks-op2");
const $ironworks_cars1 = document.querySelector("#ironworks-cars1");
const $ironworks_cars2 = document.querySelector("#ironworks-cars2");
const $ironworks_cars3 = document.querySelector("#ironworks-cars3");

//Oil Fields
const $oilfield_ip1 = document.querySelector("#oilfield-ip1");
const $oilfield_ip2 = document.querySelector("#oilfield-ip2");
const $oilfield_ip3 = document.querySelector("#oilfield-ip3");
const $oilfield_op1 = document.querySelector("#oilfield-op1");
const $oilfield_cars1 = document.querySelector("#oilfield-cars1");
const $oilfield_cars2 = document.querySelector("#oilfield-cars2");
const $oilfield_cars3 = document.querySelector("#oilfield-cars3");

//Refinery
const $refinery_ip1 = document.querySelector("#refinery-ip1");
const $refinery_ip2 = document.querySelector("#refinery-ip2");
const $refinery_ip3 = document.querySelector("#refinery-ip3");
const $refinery_op1 = document.querySelector("#refinery-op1");
const $refinery_cars1 = document.querySelector("#refinery-cars1");
const $refinery_cars2 = document.querySelector("#refinery-cars2");
const $refinery_cars3 = document.querySelector("#refinery-cars3");

//Info Modal
const info_modal_close = () => {
  document.querySelector(".i-modal").classList.remove("open");
};

const info_modal_open = () => {
  document.querySelector(".i-modal").classList.add("open");
};

const onGridchange = (e) => {
  // Sawmill Attributes
  if ($sawmill_ip2.value > 0) {
    $sawmill_op1.value = $sawmill_ip2.value;
    $sawmill_op2.value = $sawmill_ip2.value;
    $sawmill_cars1.value = ($sawmill_ip2.value / 6).toFixed(2);
  } else {
    $sawmill_ip2.value = "";
    $sawmill_op1.value = "";
    $sawmill_op2.value = "";
    $sawmill_cars1.value = "";
  }

  //Iron Mine Attributes
  if ($ironmine_ip2.value > 0) {
    $ironmine_ip1.value = $ironmine_ip2.value * 2;
    $ironmine_op1.value = $ironmine_ip2.value * 5;
    $ironmine_cars1.value = ($ironmine_ip1.value / 6).toFixed(2);
    $ironmine_cars2.value = ($ironmine_ip2.value / 3).toFixed(2);
  } else {
    $ironmine_ip1.value = "";
    $ironmine_ip2.value = "";
    $ironmine_op1.value = "";
    $ironmine_cars1.value = "";
    $ironmine_cars2.value = "";
  }

  //Smelter Attrivutes
  if ($smelter_ip2.value > 0) {
    $smelter_ip1.value = $smelter_ip2.value * 2;
    $smelter_op1.value = $smelter_ip2.value;
    $smelter_op2.value = ($smelter_ip2.value / 2).toFixed("");
    $smelter_cars1.value = ($smelter_ip1.value / 8).toFixed(2);
    $smelter_cars2.value = ($smelter_ip2.value / 10).toFixed(2);
  } else {
    $smelter_ip1.value = "";
    $smelter_ip2.value = "";
    $smelter_op1.value = "";
    $smelter_op2.value = "";
    $smelter_cars1.value = "";
    $smelter_cars2.value = "";
  }

  //Coal Mine Attributes
  if ($coalmine_ip2.value > 0) {
    $coalmine_ip1.value = $coalmine_ip2.value * 2;
    $coalmine_op1.value = $coalmine_ip2.value * 10;
    $coalmine_cars1.value = ($coalmine_ip1.value / 3).toFixed(2);
    $coalmine_cars2.value = ($coalmine_ip2.value / 10).toFixed(2);
  } else {
    $coalmine_ip1.value = "";
    $coalmine_ip2.value = "";
    $coalmine_op1.value = "";
    $coalmine_cars1.value = "";
    $coalmine_cars2.value = "";
  }

  //Iron Works Attributes
  if ($ironworks_ip2.value > 0) {
    $ironworks_ip1.value = $ironworks_ip2.value * 3;
    $ironworks_ip3.value = $ironworks_ip2.value * 4;
    if ($ironworks_ip2.value * 3.09091 > 100) {
      $ironworks_op1.value = 100;
    } else {
      $ironworks_op1.value = ($ironworks_ip2.value * 3.09091).toFixed(0);
    }
    if ($ironworks_ip2.value * 16 > 100) {
      $ironworks_op2.value = 100;
    } else {
      $ironworks_op2.value = ($ironworks_ip2.value * 16).toFixed(0);
    }
    $ironworks_cars1.value = ($ironworks_ip1.value / 6).toFixed(2);
    $ironworks_cars2.value = ($ironworks_ip2.value / 10).toFixed(2);
    $ironworks_cars3.value = ($ironworks_ip3.value / 3).toFixed(2);
  } else {
    $ironworks_ip1.value = "";
    $ironworks_ip2.value = "";
    $ironworks_ip3.value = "";
    $ironworks_op1.value = "";
    $ironworks_op2.value = "";
    $ironworks_cars1.value = "";
    $ironworks_cars2.value = "";
    $ironworks_cars3.value = "";
  }

  //Oil Fields Attributes
  if ($oilfield_ip2.value > 0) {
    $oilfield_ip1.value = $oilfield_ip2.value * 3;
    $oilfield_ip3.value = $oilfield_ip2.value * 3;
    $oilfield_op1.value = $oilfield_ip2.value * 24;
    $oilfield_cars1.value = ($oilfield_ip1.value / 6).toFixed(2);
    $oilfield_cars2.value = ($oilfield_ip2.value / 32).toFixed(2);
    $oilfield_cars3.value = ($oilfield_ip3.value / 3).toFixed(2);
  } else {
    $oilfield_ip1.value = "";
    $oilfield_ip2.value = "";
    $oilfield_ip3.value = "";
    $oilfield_op1.value = "";
    $oilfield_cars1.value = "";
    $oilfield_cars2.value = "";
    $oilfield_cars3.value = "";
  }

  //Refinery Attributes
  if ($refinery_ip2.value > 0) {
    $refinery_ip1.value = $refinery_ip2.value * 2;
    $refinery_ip3.value = $refinery_ip2.value * 12;
    $refinery_op1.value = $refinery_ip2.value * 6;
    $refinery_cars1.value = ($refinery_ip1.value / 6).toFixed(2);
    $refinery_cars2.value = ($refinery_ip2.value / 6).toFixed(2);
    $refinery_cars3.value = ($refinery_ip3.value / 12).toFixed(2);
  } else {
    $refinery_ip1.value = "";
    $refinery_ip2.value = "";
    $refinery_ip3.value = "";
    $refinery_op1.value = "";
    $refinery_cars1.value = "";
    $refinery_cars2.value = "";
    $refinery_cars3.value = "";
  }

  if (
    $sawmill_ip2.value == 0 &&
    $ironmine_ip2.value == 0 &&
    $smelter_ip2.value == 0 &&
    $coalmine_ip2.value == 0 &&
    $ironworks_ip2.value == 0 &&
    $oilfield_ip2.value == 0 &&
    $refinery_ip2.value == 0
  ) {
    reset_board();
  } else {
    $loggingcamp_op1.value = 1;
    $loggingcamp_op2.value = 1;
  }
};

$ipopgrid.addEventListener("change", onGridchange);

// Lock Unlock Buttons
$(".lock").click(function () {
  $(this).toggleClass("unlocked");
});

$lock.addEventListener("click", (e) => {
  if ($lock.classList.value == "lock") {
    $loggingcamp_op1.value = 1;
    $loggingcamp_op2.value = 1;

    $sawmill_ip2.value = 6;
    $sawmill_ip2.setAttribute("step", "6");
    $ironmine_ip2.value = 3;
    $ironmine_ip2.setAttribute("step", "3");
    $smelter_ip2.value = 4;
    $smelter_ip2.setAttribute("step", "4");
    $coalmine_ip2.value = 3;
    $coalmine_ip2.setAttribute("step", "3");
    $ironworks_ip2.value = 2;
    $ironworks_ip2.setAttribute("step", "2");
    $oilfield_ip2.value = 2;
    $oilfield_ip2.setAttribute("step", "2");
    $refinery_ip2.value = 3;
    $refinery_ip2.setAttribute("step", "3");
  } else {
    console.log("Unlocked");
    $loggingcamp_op1.value = 1;
    $loggingcamp_op2.value = 1;
    // $sawmill_ip2.value = 0
    $sawmill_ip2.setAttribute("step", "1");
    // $ironmine_ip2.value = 0
    $ironmine_ip2.setAttribute("step", "1");
    // $smelter_ip2.value = 0
    $smelter_ip2.setAttribute("step", "1");
    // $coalmine_ip2.value = 0
    $coalmine_ip2.setAttribute("step", "1");
    // $ironworks_ip2.value = 0
    $ironworks_ip2.setAttribute("step", "1");
    // $oilfield_ip2.value = 0
    $oilfield_ip2.setAttribute("step", "1");
    // $refinery_ip2.value = 0
    $refinery_ip2.setAttribute("step", "1");
  }

  onGridchange();
});

//Reset Board Function
const reset_board = () => {
  $loggingcamp_op1.value = "";
  $loggingcamp_op2.value = "";
  $sawmill_ip2.value = "";
  $sawmill_op1.value = "";
  $sawmill_op2.value = "";
  $sawmill_cars1.value = "";
  $ironmine_ip1.value = "";
  $ironmine_ip2.value = "";
  $ironmine_op1.value = "";
  $ironmine_cars1.value = "";
  $ironmine_cars2.value = "";
  $smelter_ip1.value = "";
  $smelter_ip2.value = "";
  $smelter_op1.value = "";
  $smelter_op2.value = "";
  $smelter_cars1.value = "";
  $smelter_cars2.value = "";
  $coalmine_ip1.value = "";
  $coalmine_ip2.value = "";
  $coalmine_op1.value = "";
  $coalmine_cars1.value = "";
  $coalmine_cars2.value = "";
  $ironworks_ip1.value = "";
  $ironworks_ip2.value = "";
  $ironworks_ip3.value = "";
  $ironworks_op1.value = "";
  $ironworks_op2.value = "";
  $ironworks_cars1.value = "";
  $ironworks_cars2.value = "";
  $ironworks_cars3.value = "";
  $oilfield_ip1.value = "";
  $oilfield_ip2.value = "";
  $oilfield_ip3.value = "";
  $oilfield_op1.value = "";
  $oilfield_cars1.value = "";
  $oilfield_cars2.value = "";
  $oilfield_cars3.value = "";
  $refinery_ip1.value = "";
  $refinery_ip2.value = "";
  $refinery_ip3.value = "";
  $refinery_op1.value = "";
  $refinery_cars1.value = "";
  $refinery_cars2.value = "";
  $refinery_cars3.value = "";
};

const reset_all = () => {};

// To DO
// Add a reset button
// put a if condition if input is divizible by the lock condotion step. if not set it to nearest step
