

const validate = () => {
    let valid = false;
    const lensDropdown = document.getElementById("lens-cart-option");
    let email;
    let firstName;
    let lastName;
    let Address;
    let lensOption;

    // validation email
    if (email.length >= 6 && email.length <= 50) {
        // email ;
        if (email.classList.contains("error")) {
            email.classList.remove("error");
            email.classList.add("good");
        } else {
            email.classList.add("good");
        }
        console.log(valid, "email")
    } else {
        valid = false
        if (email.classList.contains("good")) {
            email.classList.remove("good");
            email.classList.add("error");
        } else {
            email.classList.add("error");
        }
        console.log(email, "email")
    }

    // validation Nom
    if (lastNameInput.length >= 1 && lastNameInput.length <= 25) {
        valid = true;
        if (lastNameInput.classList.contains("error")) {
            lastNameInput.classList.remove("error");
            lastNameInput.classList.add("good");
        } else {
            lastNameInput.classList.add("good");
        }
        console.log(valid, "Last Name")
    } else {
        valid = false
        if (lastNameInput.classList.contains("good")) {
            lastNameInput.classList.remove("good");
            lastNameInput.classList.add("error");
        } else {
            lastNameInput.classList.add("error");
        }
        // let lastName = "Nom";
        console.log(valid, "Last Name")
    }

    // validation Prenom
    if (firstNameInput.length >= 2 && firstNameInput.length <= 25) {
        valid = true;
        if (firstNameInput.classList.contains("error")) {
            firstNameInput.classList.remove("error");
            firstNameInput.classList.add("good");
        } else {
            firstNameInput.classList.add("good");
        }
        console.log(valid, "First Name")
    } else {
        valid = false
        if (firstNameInput.classList.contains("good")) {
            firstNameInput.classList.remove("good");
            firstNameInput.classList.add("error");
        } else {
            firstNameInput.classList.add("error");
        }
        // let firstName = "Prénom";
        console.log(valid, "First Name")
    }

    // validation adresse postal
    // const regex = /^\d{1,7}( |-)?([a-zA-Z]|\d)*( [a-zA-Zèâêîôû]+\.?\'?){1,5}([ a-zA-Z-èâêîôû]+)\.?\é?/gm;
    // let str = "";
    // if (addressInput = regex.exec(str)) !== null) {
    //     valid = true;
    //     if (addressInput.classList.contains("error")) {
    //         addressInput.classList.remove("error");
    //         addressInput.classList.add("good");
    //     } else {
    //         addressInput.classList.add("good");
    //     }
    //     console.log("good First Name")
    // } else {
    // valid = false
    //     if (addressInput.classList.contains("good")) {
    //     addressInput.classList.remove("good");
    //     addressInput.classList.add("error");
    //     } else {
    //     addressInput.classList.add("error");
    //     }
    //     let firstName = "address";
    //     console.log("wrong address")
    // }

    // validation ville
    if (cityInput.length >= 1 && cityInput.length <= 85) {
        valid = true;
        if (cityInput.classList.contains("error")) {
            cityInput.classList.remove("error");
            cityInput.classList.add("good");
        } else {
            cityInput.classList.add("good");
        }
        console.log(valid, "City")
    } else {
        valid = false
        if (cityInput.classList.contains("good")) {
            cityInput.classList.remove("good");
            cityInput.classList.add("error");
        } else {
            cityInput.classList.add("error");
        }
        // let city = "Ville";
        console.log(valid, "city")
    }

    // validation lens Option
    if (lensDropdown.value !== "none") {
        valid = true;
        if (lensDropdown.classList.contains("error")) {
            lensDropdown.classList.remove("error");
            lensDropdown.classList.add("good");
        } else {
            lensDropdown.classList.add("good");
        }
        console.log(valid, "Lens Selected")
    } else {
        valid = false
        if (lensDropdown.classList.contains("good")) {
            lensDropdown.classList.remove("good");
            lensDropdown.classList.add("error");
        } else {
            lensDropdown.classList.add("error");
        }
        // let lens = "Objectif";
        console.log(valid, "No Lens Selected")
    }
    console.log(valid);
}




// while ((m = regex.exec(str)) !== null) {
//     // This is necessary to avoid infinite loops with zero-width matches
//     if (m.index === regex.lastIndex) {
//         regex.lastIndex++;
//     }

//     // The result can be accessed through the `m`-variable.
//     m.forEach((match, groupIndex) => {
//         console.log(`Found match, group ${groupIndex}: ${match}`);
//     });
// }
