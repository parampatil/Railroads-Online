//elements
const $clearWorkspace = document.getElementById("clearWorkspace")
let current_weightUnit
let current_openModal = ""
let autosave = true

//modal content


//EVENT LISTENERS
//onload
const onLoad_fun = () => {
    $cargoList.innerHTML = ""
    $engines.innerHTML = ""
    $result_msg.setAttribute('disabled', 'disabled')
    $result_msg.style.visibility = 'hidden'
    $clearWorkspace.style.display = 'none'
    current_weightUnit = "lbs"

    // showInfoWindow()

    $kg.style.visibility = 'hidden'
    if(JSON.parse(localStorage.getItem("diff_grade")) !== null){
        if(JSON.parse(localStorage.getItem("diff_grade")).autosave == true){
            load_diff_grade_unit()
            load_engineList()
            load_cargoList()
        }
        else if (JSON.parse(localStorage.getItem("diff_grade")).autosave == false){
            document.getElementById("toggle_checkbox").checked = false
            autosave = false
            save_diff_grade_unit()
        }
    }
    else {
        welcome_modal_open()
        save_diff_grade_unit()
    }
}

//eventlisteners - engines
$addEngine.addEventListener('click', addEngine)
$engines.addEventListener('change', onEngineSelect)

//eventlisteners - cargo
$addCargo.addEventListener('click', addCargo)
$cargoList.addEventListener('change', onCargoSelect)

//eventlisteners - difficulty & grade
// $difficulty.addEventListener('change', () => {
//     let collection_cargodiv = document.getElementsByClassName('Loaded');
//     for (let i = 1; i < collection_cargodiv.length; i++) {
//         onCargoSelect(collection_cargodiv[i])
//         update_values()
//     }
// })

//eventlisteners - lbs_ton toggle
$weight_toggle.addEventListener('change', () => {
    update_weightUnit()
    if (autosave==true) {
        save_diff_grade_unit()
    }
})

const update_weightUnit = () => {
    //Checked is Ton
    //Unchecked is lbs

    if ($weight_toggle.checked === true && current_weightUnit === "lbs") {
        lbs_to_ton()
        update_result()
    }
    else if ($weight_toggle.checked === false && current_weightUnit === "ton") {
        ton_to_lbs()
        update_result()
    }
}


//Function to change unit
const lbs_to_ton = () => {
    //variables for lbs to ton
    let collection_teffort = document.getElementsByClassName("teffort");
    for (let i = 1; i < collection_teffort.length; i++) {
        collection_teffort[i].value = (collection_teffort[i].value / 2000).toFixed(2)
    }

    let collection_eweight = document.getElementsByClassName("eweight");
    for (let i = 1; i < collection_eweight.length; i++) {
        collection_eweight[i].value = (Number(collection_eweight[i].value) / 2000).toFixed(2)
    }

    let collection_tweight = document.getElementsByClassName("tweight");
    for (let i = 1; i < collection_tweight.length; i++) {
        collection_tweight[i].value = (Number(collection_tweight[i].value) / 2000).toFixed(2)
    }

    let collection_Loaded = document.getElementsByClassName("Loaded");
    for (let i = 1; i < collection_Loaded.length; i++) {
        collection_Loaded[i].value = (Number(collection_Loaded[i].value) / 2000).toFixed(2)
    }

    $resultList.childNodes[1].value = (Number($resultList.childNodes[1].value) / 2000).toFixed(2)
    $resultList.childNodes[3].value = (Number($resultList.childNodes[3].value) / 2000).toFixed(2)
    $resultList.childNodes[5].value = (Number($resultList.childNodes[5].value) / 2000).toFixed(2)
    current_weightUnit = "ton"
    $kg.style.visibility = 'visible'
    $pounds.style.visibility = 'hidden'
}

const ton_to_lbs = () => {
    //variables for ton to lbs
    let collection_teffort = document.getElementsByClassName("teffort");
    for (let i = 1; i < collection_teffort.length; i++) {
        collection_teffort[i].value = (collection_teffort[i].value * 2000).toFixed(0)
    }

    let collection_eweight = document.getElementsByClassName("eweight");
    for (let i = 1; i < collection_eweight.length; i++) {
        collection_eweight[i].value = (Number(collection_eweight[i].value) * 2000).toFixed(0)
    }

    let collection_tweight = document.getElementsByClassName("tweight");
    for (let i = 1; i < collection_tweight.length; i++) {
        collection_tweight[i].value = (Number(collection_tweight[i].value) * 2000).toFixed(0)
    }

    let collection_Loaded = document.getElementsByClassName("Loaded");
    for (let i = 1; i < collection_Loaded.length; i++) {
        collection_Loaded[i].value = (Number(collection_Loaded[i].value) * 2000).toFixed(0)
    }

    $resultList.childNodes[1].value = (Number($resultList.childNodes[1].value) * 2000).toFixed(0)
    $resultList.childNodes[3].value = (Number($resultList.childNodes[3].value) * 2000).toFixed(0)
    $resultList.childNodes[5].value = (Number($resultList.childNodes[5].value) * 2000).toFixed(0)
    current_weightUnit = "lbs"
    $kg.style.visibility = 'hidden'
    $pounds.style.visibility = 'visible'
}


// *******************Modals*******************//
//Welcome Modal
const welcome_modal_close = () => {
    document.querySelector(".w-modal").classList.remove("open");
}

const welcome_modal_open = () => {
    document.querySelector(".w-modal").classList.add("open");
}

//Info Modal
const info_modal_close = () => {
    document.querySelector(".i-modal").classList.remove("open");
}

const info_modal_open = () => {
    document.querySelector(".i-modal").classList.add("open");
}

//Clear Workspace Modal
const cw_modal_close = () => {
    document.querySelector(".cw-modal").classList.remove("open");
}

const cw_modal_open = (header,msg, delObj) => {
    if (delObj === "engines") {
        if($engines.childNodes.length<=0){
            return alert_modal_open('Sorry! No engines in the list')
        }
        current_openModal = "engines"
    }
    else if (delObj === "cargo") {
        if($cargoList.childNodes.length<=0){
            return alert_modal_open('Sorry! No cargo in the list')
        }
        current_openModal = "cargo"
    }
    else if (delObj === "all") {
        current_openModal = "all"
    }

    document.querySelector(".cw-modal").classList.add("open");
    document.querySelector(".cw-modal-header").innerHTML = header;
    document.querySelector(".cw-modal-content").innerHTML = msg;

}

const cw_optionSelector = () => {
    if (current_openModal === "engines") {
        $engines.innerHTML=""
        cw_modal_close()
        update_values()
        localStorage.removeItem("engines")
    }
    else if (current_openModal === "cargo") {
        $cargoList.innerHTML=""
        cw_modal_close()
        update_values()
        localStorage.removeItem("cargo")
    }
    else if (current_openModal === "all") {
        $engines.innerHTML=""
        $cargoList.innerHTML=""
        $clearWorkspace.style.display="none"
        cw_modal_close()
        update_values()
        localStorage.clear()
    }
}

//Alert Modal
const alert_modal_close = () => {
    document.querySelector(".alert-modal").classList.remove("open");
}

const alert_modal_open = (msg) => {
    document.querySelector(".alert-modal").classList.add("open");
    document.querySelector(".alert-modal-content").innerHTML = msg;
}

//Custom select Grade
    $(".custom-select").each(function() {
        var classes = $(this).attr("class"),
            id      = $(this).attr("id"),
            name    = $(this).attr("name"),
            all_classes = classes.split(" ");
        var template =  '<div class="' + classes + '">';
            template += '<span class="custom-select-trigger" id="sel_' + id + '" name="sel_' + name + '">';
            $(this).find("option").each(function() {
                if ($(this).attr("selected") === "selected") {
                    template += $(this).html();
                }
            });
            template += '</span>';
            template += '<div class="custom-options ' + all_classes[1] + '">';
            $(this).find("option").each(function() {
            template += '<span class="custom-option ' + all_classes[1] + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
            
        template += '</div></div>';
        
        $(this).wrap('<div class="custom-select-wrapper ' + id + '"></div>');
        $(this).hide();
        $(this).after(template);
    });

  $(".custom-option:first-of-type").hover(function() {
    $(this).parents(".custom-options").addClass("option-hover");
  }, function() {
    $(this).parents(".custom-options").removeClass("option-hover");

  });
  $(".custom-select-trigger").on("click", function() {
    $('html').one('click',function() {
      $(".custom-select").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();

  });

  $(".custom-option").on("click", function() {

    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
    let collection_cargodiv = document.getElementsByClassName('Loaded');
    for (let i = 1; i < collection_cargodiv.length; i++) {
        onCargoSelect(collection_cargodiv[i])
    }
    update_values()
    if (autosave==true) {
        save_diff_grade_unit()
    }
  });

//   Auto Save Function

const autosave_function = () => {
    //checked=True: autosave On
    //checked=False: autosave Off

    if (document.getElementById("toggle_checkbox").checked == true) {
        save_diff_grade_unit()
        save_engineList()
        save_cargoList()
        autosave = true 
        save_diff_grade_unit()
    }
    else{
        autosave = false
        save_diff_grade_unit()
        localStorage.removeItem("engines")
        localStorage.removeItem("cargo")
    }
}