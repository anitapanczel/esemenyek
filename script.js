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

const inputElement = (type, name, label, req = "") => {
    console.log(req);
    return `
    <div class="${type}"> 
        <label for="${name}">${label}</label>
        <input type="${type}" id="${name}" name="${name}" ${req}>
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

/*
const nameData = {
    type: "text",
    name: "firstName",
    label: "Keresztneved"
};
*/

const processCountries = async() => {
    const countryRes = await fetch("https://restcountries.com/v3.1/all");
    const countryArr = await countryRes.json();
    console.log(countryArr[0].name.official);
    // 1. kell egy üres tömb 

    // 2. for ciklussal végig kell menni a countryArr-on és minden országnak a name.official-jét bele kell rakni az üres tömbbe 

    // 3. returnölni ezt a tömböt (végeredmény legördülő menübe megy az országok listája)

    // 4. ennyi, nincs tovább, 10 perc szünet, return 10:45

}

//processCountries();

const anotherSelectFields = {
    type: "select",
    name: "countries",
    label: "Ország",
    //options: ["Luxembourg", "Jamaica"]
    options: processCountries()
}



const anotherFormFields = [{
    type: "text",
    name: "street",
    label: "Közterület neve"
}, {
    type: "text",
    name: "houseNumber",
    label: "Házszám"
}, {
    type: "number",
    name: "zipCode",
    label: "Irányítószám"
}, {
    type: "text",
    name: "city",
    label: "Település neve"
}];

const selectFields = {
    type: "select",
    name: "where",
    label: "Hol hallottál rólunk?",
    options: ["internetről", "ismerőstől", "egyéb"]
};

const formFields = [{
    type: "text",
    name: "firstName",
    label: "Keresztneved",
    required: "required"
}, {
    type: "file",
    name: "profilePicture",
    label: "Profilképed"
}, {
    type: "email",
    name: "personalEmail",
    label: "Email cimed",
    required: "required"
}, {
    type: "checkbox",
    name: "newsletter",
    label: "Szeretnél hírlevelet kapni az oldalunkról?"
}, {
    type: "checkbox",
    name: "terms",
    label: "Elfogadod a felhasználási feltételeket?"
}];

/*
const formElement = `
    <form id="form">
        ${ inputElement(nameData.type, nameData.name, nameData.label, "required") }
        ${ inputElement("file", "profilePicture", "Profilképed") }
        ${ inputElement("email", "personalEmail", "E-mail címed", "required") }
        ${ inputElement("checkbox", "newsletter", "Szeretnél-e hírlevelet kapni oldalunkról?") }
        ${ inputElement("checkbox", "terms", "Elfogadod-e a felhasználási feltételeket?") }
        ${ selectElement("select", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"]) }
        <button id="gomb">OK</button>
    </form>
`;
*/

const formElement = (ffs, id, sel) => {
    let toForm = "";
    for (const ff of ffs) {
        toForm += inputElement(ff.type, ff.name, ff.label, ff.required);
    }
    return `
        <div id="${id}">
        <form>
        <h1>Login ${id}</h1>
            ${toForm}
            ${selectElement(sel.type, sel.name, sel.label, sel.options)}
            <button id="gomb">OK</button>
        </form>
        </div>`
}

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
    if (event.target.getAttribute("name") === "profilePicture") {
        console.log(event.target.files[0].name);
        const image = URL.createObjectURL(event.target.files[0]);
        document.getElementById("inputValueContent").insertAdjacentHTML("beforeend", `
        <img src="${image}">
        `);
    }
}

function loadEvent() {
    const root = document.getElementById("root");
    root.insertAdjacentHTML("beforeend", formElement(formFields, "form", selectFields));
    root.insertAdjacentHTML("beforeend", formElement(anotherFormFields, "form2", anotherSelectFields));
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