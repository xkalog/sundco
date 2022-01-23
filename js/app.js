// ---------------------------------------code for the dropdown on mobile------------------------------

var flag = false;
var element = document.getElementById("logo-image");
var footer = document.getElementById("footer");
var desktop = document.getElementById("desktop");

// We invoke this function when we are from mobile phone and we press the menu button. 
// This function is responsible to hide and show the contents of the mobile menu. 
function mobileMenu() {

    if (flag === false) {
        element.classList.add("hide-logo");
        document.getElementsByClassName("navbar-toggler-icon")[0].style.backgroundImage = "url('images/toggle.png')";
        desktop.style.display = "none";
        footer.style.display = "block";
        footer.classList.add("mobile-footer");
        flag = true;
    } else {
        footer.classList.remove("mobile-footer");
        footer.style.display = "none";
        element.classList.remove("hide-logo");
        document.getElementsByClassName("navbar-toggler-icon")[0].style.backgroundImage = "url('images/menu.png')";
        desktop.style.display = "block";
        flag = false;
    }

}


// ---------------------------------------form validation code-----------------------------------------


let emailFlag;
let nameFlag;
let phoneFlag;
let checkBoxFlag;
let letters;

// If every flag is true then the form will be submitted. More about the validation process in the code 
// below the declaration of the following function. 
function validateForm() {

    if (document.contactForm.option1.checked || document.contactForm.option2.checked) {
        checkBoxFlag = true;
        document.getElementById("checkboxText").classList.remove("invalid-checkbox");
    } else {
        checkBoxFlag = false;
        document.getElementById("checkboxText").classList.add("invalid-checkbox");
    }


    if (nameFlag && emailFlag && phoneFlag && checkBoxFlag) {
        return true;
    } else {
        return false;
    }

}


// The following code is responsible for the form validation. Every time a user interacts with one of 
// the form fields this code will check if the relevant field is completed proper and if so the 
// corresponding flag will be set to true. When the user hits submit the function named validateForm 
// will check out all the flags and if everything is true then the form will be submitted. 
document.querySelectorAll('input').forEach(item => {
    item.addEventListener('change', event => {
        if (event.target.id === 'fullName') {
            let fullName = document.getElementById("fullName").value
            letters = /^[a-zA-Z]+ [a-zA-Z]+$/;  //Regular expression for the full name field

            if (fullName.match(letters)) {
                nameFlag = true;
                document.getElementById("fullName").classList.remove("invalid-input");
            } else {
                nameFlag = false;
                document.getElementById("fullName").classList.add("invalid-input");
                document.getElementById("fullName").value = '';
                document.getElementById("fullName").setAttribute("placeholder", "E.g. Giannis Papadopoulos");

            }
        } else if (event.target.id === 'email') {
            let email = document.getElementById("email").value;
            letters = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;    //Regular expression for the email field
            if (email.match(letters) && email.substring(email.indexOf('@')) === "@spitogatos.gr") {
                emailFlag = true;
                document.getElementById("email").classList.remove("invalid-input");
            } else {
                emailFlag = false;
                document.getElementById("email").classList.add("invalid-input");
                document.getElementById("email").value = '';
                document.getElementById("email").setAttribute("placeholder", "E.g. giannis@spitogatos.gr");

            }
        } else if (event.target.id === 'tel') {
            letters = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;     //Regular expression for the phone field     
            let tel = document.getElementById("tel").value;
            if (tel.match(letters)) {
                phoneFlag = true;
                document.getElementById("tel").classList.remove("invalid-input");
            } else {
                phoneFlag = false;
                document.getElementById("tel").classList.add("invalid-input");
                document.getElementById("tel").value = '';
                document.getElementById("tel").setAttribute("placeholder", "E.g. 123-123-1234");

            }
        } else if (event.target.id === 'inlineCheckbox1' || event.target.id === 'inlineCheckbox2') {
            if (document.contactForm.option1.checked || document.contactForm.option2.checked) {
                document.getElementById("checkboxText").classList.remove("invalid-checkbox");
            } else {
                document.getElementById("checkboxText").classList.add("invalid-checkbox");
            }
        }

    });
});

// The following code is responsible for displaying the total length of the characters contained on the  
// textarea field.  
document.getElementById('message').addEventListener('input', function () {
    document.getElementById('charactersCounter').innerText = document.getElementById('message').value.length;
});

// -----------------------------------code for the dropdowns of the form------------------------------

let categories;

// The following function will be invoked when the body loads and it will retrieve the data for 
// the dropdowns category and subcategory and then it will populate the category dropdown with the 
// proper values   
function populateForm() {
    $.ajax(
        {
            type: "GET",
            url: "https://run.mocky.io/v3/0b8fbded-6ce4-4cb2-bf2f-d2c39207506b",
            success: function (data) {
                categories = data;
                var _select = document.getElementById("category1");
                data.forEach(function (category) {
                    _select.options[_select.options.length] = new Option(category.name);
                });


            }
        });
}

//The following code will populate the subcategory dropdown based on the value of the category 
// dropdown.  

document.getElementById('category1').addEventListener('input', function () {
    var _select = document.getElementById("subcategory1");
    _select.innerHTML = '<option disabled selected>Subcategory</option>';
    let index = categories.findIndex(element => element.name == this.value);

    if (categories[index].hasOwnProperty('subCategories')) {
        categories[index].subCategories.forEach(function (subcategory) {
            _select.options[_select.options.length] = new Option(subcategory.name);
        });

    }
});

