const regex = /^\d{1,7}( |-)?([a-zA-Z]|\d)*( [a-zA-Zèâêîôû]+\.?\'?){1,5}([ a-zA-Z-èâêîôû]+)\.?\é?/gm;
let str = "";

const validate = () => {
    let valid = false;

    // validation email
    if (email.length < 6 || email.length >= 35) {
        valid = false
        email.classList.add("error");
    } else {
        valid = true;
        email.classList.add("good");
    }

    // validation Nom
    if (lastNameInput.length <= 1 || lastNameInput.length >= 25) {
        valid = false
        lastNameInput.classList.add("error");
    } else {
        valid = true;
        lastNameInput.classList.add("good");
    }

    // validation Prenom
    if (firstNameInput.length <= 2 || firstNameInput.length >= 25) {
        valid = false
        firstNameInput.classList.add("error");
    } else {
        valid = true;
        firstNameInput.classList.add("good");
    }

    // validation adresse postal
    // if (addressInput = ) {
    //     valid = false
    //     addressInput.classList.add("error");
    // } else {
    //     addressInput.classList.add("good");
    //     valid = true;
    // }

    // validation ville
    if (cityInput.length < 85) {
        valid = false
        cityInput.classList.add("error");
    } else {
        cityInput.classList.add("good");
        valid = true;
    }
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
