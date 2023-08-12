'use strict';
//inputs
const usernameEl = document.getElementById("username")
const emailEl = document.getElementById("email")
const professionEl = document.getElementById("profession")
const contactEl = document.getElementById("contact")
const yearsEl = document.getElementById("years")
const maleEl = document.getElementById("male")
const femaleEl = document.getElementById("female")
const othersEl = document.getElementById("others")
const submitBtn = document.getElementById("submit")
const imageUpload = document.getElementById("imageUpload");
//outputs
const bodyContainer = document.getElementById("card-container")

// global Variables 
// DataBase
let items = [
    { id: 1, username: "Jana", email: "Janarthanan@gmail.com", profession: "FullStack Developer", contact: "8110864319", gender: "male", years: 2 },
    { id: 2, username: "Shalini", email: "ShaliniSkt@gmail.com", profession: "Python Developer", contact: "8667247110", gender: "female", years: 2 },
]
let isEditing;
let itemToEdit;

//functions
const init = () => {
    // existing data or upcoming data displayed here
    getData(items)
}

const cardTemplate = (item) => {
    const { id, username, email, profession, contact, gender, years } = item
    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    cardEl.innerHTML = `
    <div class="profile-container">
                        <div class="profile">
                            <img src="${gender === "male" ? "assets/th (1).jpg" : gender === "female" ? "assets/3667026.png" : ""}" alt="" id="imgPreview">
                            <div class="profile-info">
                                <p>${username.charAt(0).toUpperCase() + username.slice(1)}</p>
                                <p>${email.charAt(0).toUpperCase() + email.slice(1)}</p>
                            </div>
                        </div>
                        <div class="option">
                            <button class="btn-edit" onClick="updateRow(${id})"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn-delete" onclick="deleteRow(${id})"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                    <div class="profession-details">
                        <p>${profession}</p>
                        <span class="Exp">Exp:<p>${years}yrs</p></span>
                    </div>
                    <div class="contact-details">
                        <span class="Exp">Ph:<p>${contact}</p></span>
                    </div>
    `
    bodyContainer.appendChild(cardEl)
}

const getData = (items) => {
    bodyContainer.innerHTML = items.length === 0 ? "No records found!" : ""

    items.forEach(item => {
        cardTemplate(item)
    });
}

const nullishData = () => {
    usernameEl.value = ''
    emailEl.value = ''
    professionEl.value = 'Enter Your Profession'
    contactEl.value = ''
    yearsEl.value = ''
    maleEl.checked = false;
    femaleEl.checked = false;
    othersEl.checked = false;
}

const deleteRow = (id) => {
    items = items.filter((item) => item.id !== id)
    console.log(items)
    getData(items)
}

const updateRow = (id) => {
    isEditing = true
    submitBtn.innerText = "Update"
    console.log("Yes Im ready to edit")
    // finding the data with id
    itemToEdit = items.find((item) => item.id === id)
    console.log(itemToEdit)

    // updating El with the found values
    usernameEl.value = itemToEdit.username;
    emailEl.value = itemToEdit.email;
    professionEl.value = itemToEdit.profession;
    contactEl.value = itemToEdit.contact;
    yearsEl.value = itemToEdit.years;
    // updating the genderEl with value
    if (itemToEdit.gender === "male") {
        maleEl.checked = true;
    } else if (itemToEdit.gender === "female") {
        femaleEl.checked = true;
    } else if (itemToEdit.gender === "others") {
        othersEl.checked = true;
    }
}

//events
submitBtn.addEventListener("click", () => {
    const username = usernameEl.value;
    const email = emailEl.value;
    const profession = professionEl.value;
    const contact = contactEl.value;
    const years = yearsEl.value;
    const gender = maleEl.checked ? "male" : "" || femaleEl.checked ? "female" : "" || othersEl.checked ? "others" : "";
    console.log(`username:${username}, email:${email}, profession:${profession}, contact:${contact}, gender:${gender}`)

    if (username && email && profession) {
        if (isEditing) {
            //Update an existing
            const updateItems = {
                id: itemToEdit.id,
                username: username,
                email: email,
                profession: profession,
                years: years,
                contact: contact,
                gender: gender
            }

            // Find the index of the item to update
            const indexToUpdate = items.findIndex((item) => item.id === itemToEdit.id)
            items[indexToUpdate] = updateItems

            console.log(updateItems)
            isEditing = false
            submitBtn.innerText = "Submit"
        } else {
            //create new item / addRow
            const newItems = {
                id: Date.now(),
                username: username,
                email: email,
                profession: profession,
                years: years,
                contact: contact,
                gender: gender
            }

            // new items got pushed
            console.log(newItems)
            items.push(newItems)
        }
    } else {
        alert("username & email & profession are Mandatory")
    }

    // existing items and new item get fetch and null the fields
    nullishData()
    getData(items)
});

//initial settings
init();
