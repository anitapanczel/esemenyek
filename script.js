/*
    FUNCTION:
    ---------
    function functionName1(parameter){
        parameter === "argumentum as a string";
    }
    functionName1("argumentum as a string");
    const argument = "argument as a string";

    const functionName2 = function (parameter) {
        parameter === "argumentum as a string";
    }
    functionName2(argument);

    const functionName3 = () => {

    }
    functionName3();
*/

const inputElement = (type, name, label) => {
    return `
    <div> 
        <label for="${name}">${label}</label>
        <input type="${type}" id="${name}" name="${name}">
    </div>
    `
}

const selectElement = (type, name, label, selectOptions) => {
    let optionElements = "";
    for (const options of selectOptions) {
        optionElements += `<option value=${options}>${options} </option>`;
    }

    return `
    <div> 
        <label>${label}</label>
        <${type} name="${name}">
         ${optionElements}
        </${type}>
    </div>
    `
}

/*

const formElement = '<form id="form">' + inputElement("text", "firstName", "Keresztneved") + inputElement("file", "profilePicture", "Profilképed") + inputElement("email", "personalEmail", "E-mail címed") + inputElement("checkbox", "newsletter", "Szeretnél-e hírlevelet kapni") + selectElement("select", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"]) + '<button id="gomb">OK</button></form>;
*/


const formElement = `
    <form id="form">
        ${ inputElement("text", "firstName", "Keresztneved") }
        ${ inputElement("file", "profilePicture", "Profilképed") }
        ${ inputElement("email", "personalEmail", "E-mail címed") }
        ${ inputElement("checkbox", "newsletter", "Szeretnél-e hírlevelet kapni oldalunkról?") }
        ${ inputElement("checkbox", "terms", "Elfogadod-e a felhasználási feltételeket?") }
        ${ selectElement("select", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"]) }
        <button id="gomb">OK</button>
    </form>
`;

const formSubmit = (event) => {
    event.preventDefault(); //nem töltődik újra az oldal, pedig submit történt
    console.log(event);
    const et = event.target;
    et.classList.add("submitted");
    const optionValue = et.querySelector(`select[name="where"]`).value;
    console.log(optionValue);
}

const inputEvent = (event) => {

    let whichInput = event.target.getAttribute("name");
    let et = event.target;
    const fName = document.querySelector(`input[name="firstName"]`)
    const tryForm = et.closest("#form");
    console.log(tryForm);
    //console.log(fName);
    if (whichInput === "firstName") {
        document.getElementById("inputValueContent").innerHTML = event.target.value;
    }
}

function loadEvent() {
    const root = document.getElementById("root");
    root.insertAdjacentHTML("beforeend", formElement);
    root.insertAdjacentHTML("beforeend", `
    <div id="inputValueContent"></div>
    `);

    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit);

    const inputList = form.querySelectorAll("input");
    for (const input of inputList) {
        input.addEventListener("input", inputEvent);
    }
}

window.addEventListener("load", loadEvent);

/* ha az aktuális input name attribútuma firstName, csak akkor írja bele a div-be a tartalmat */