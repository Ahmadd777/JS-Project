"use strict";

const search = document.querySelector(".search-bar");
const ul = document.getElementById("phone-list");

// רשימת משתמשים
let users = [
      {
            id: "1",
            name: "Lana ",
            phone: "0524563854",
            email: "lana123@gmail.com",
            contactInfo: "Hello my name is Lana",
            img: "lana",
            age: 21,
            country: "Israel",
      },
      {
            id: "2",
            name: "Ahmad ",
            phone: "0558546378",
            email: "ahmad.darwish@gmail.com",
            contactInfo: "Hello my name is Ahmad",
            img: "Ahmad",
            age: 22,
            country: "Israel",
      },
      {
            id: "3",
            name: "Mike",
            phone: "0519875631",
            email: "miky777@gmail.com",
            contactInfo: "Hello my name is Mike",
            img: "mikee",
            age: 20,
            country: "USA",
      },
      {
            id: "4",
            name: "Cristiano Ronaldo",
            phone: "0561234565",
            email: "cristiano.ronaldo_suiiii@gmail.com",
            contactInfo: "Hello my name is Cristiano Ronaldo",
            img: "cristiano",
            age: 40,
            country: "Portugal",
      }, {
            id: "5",
            name: "Aegon Targaryen ",
            phone: "0506567432",
            email: "aegontargaryen@gmail.com",
            contactInfo: "Hello my name is Aegon",
            img: "Aegon",
            age: 63,
            country: "Westeros",
      },
];


sortAdd();

// מיין את המשתמשים לפי שם והצג אותם
function sortAdd() {
      ul.innerHTML = "";
      users.sort((a, b) => a.name.localeCompare(b.name));
      //  html יוצרת אלמנט כל איש קשר ומוסיפה אותו לרשימה ב 
      users.forEach((user) => getUser(user));
      document.getElementById("users-length").innerHTML = `${users.length} People`

}

// צור שורת איש קשר והוסף לרשימה
function getUser(user) {
      const liItem = document.createElement("li");
      liItem.classList.add("flex");
      liItem.classList.add(user.id);
      liItem.innerHTML = `
    <div class="flex">
        <img class="profile" src="./imgs/${user.img}.jpg" alt="user pfp placeholder" />
        <h4>${user.name}</h4>
        <h5>${user.phone}</h5>
    </div>
    <div class="flex">
        <button class="icon" onclick="showContact('${user.id}')">
            <img src="./imgs/info.png" />
        </button>
        <button class="icon" onclick="editContact('${user.id}')">
            <img src="./imgs/edit.png" />
        </button>
        <button class="icon" onclick="deleteContact('${user.id}')">
            <img src="./imgs/delete.png"/>
        </button>
    </div>
    `;
      ul.appendChild(liItem);
}



// חפש לפי שם והצג את התוצאות
search.addEventListener("input", (e) => {
      const filteredList = users.filter((user) => {
            return user.name.toLowerCase().includes(e.target.value.toLowerCase());
      });

      ul.innerHTML = "";
      filteredList.forEach((user) => getUser(user));
});

// פתח את המודל
function openModal() {
      document.getElementById("myModal").style.display = "flex";
}

// סגור את המודל
function closeModal() {
      document.getElementById("myModal").style.display = "none";
}

// הצג פרטי איש קשר במודל
function showContact(contactId) {
      openModal();
      const div = document.getElementById("modal-content");
      div.innerHTML = "";
      const user = users.find((user) => user.id === contactId);
      div.innerHTML = `
    <div class="flex-popup">
        <h2>Contact Info ${user.name}</h2>
        <div>
            <span>Contact Name: </span> ${user.name}
        </div>
        <div>
            <span>Contact Number:</span>${user.phone}
        </div>
        <div>
            <span>Contact Email:</span>${user.email}
        </div>
        <div>
            <span>Contact Country: </span>${user.country}
        <div>
        <div>
          <span>Contact Text: </span>${user.contactInfo}
        </div>
        <div>
            <span>Contact Age:</span>${user.age}
        </div>
    
    </div>
    <button class="close-btn" id="closeModalBtn" onclick="closeModal()">&times;</button>
    `;
}

// ערוך פרטי איש קשר במודל
function editContact(contactId) {
      openModal();
      const div = document.getElementById("modal-content");
      div.innerHTML = "";
      const user = users.find((user) => user.id === contactId);

      div.innerHTML = `
    <form class="edit-form">
        <h2>Edit Contact ${user.name}</h2>
        <div>
            <label>Contact name:</label>
            <input type="text" id="name" value="${user.name}"/>
        </div>
        <div>
            <label>Contact number:</label>
            <input type="text" id="number" value="${user.phone}"/>
        </div>
        <div>
            <label>Contact Email:</label>
            <input type="email" id="email" value="${user.email}"/>
        </div>
        <div>
            <label>Contact age:</label>
            <input type="number" id="age" value="${user.age}"/>
        </div>
        <div>
            <label>Contact country:</label>
            <input type="text" id="address" value="${user.country}"/>
        </div>
        <div>
            <label>Contact Text:</label>
            <textarea id="text" rows="3" cols="10">${user.contactInfo}</textarea>
        </div>
        <div>
            <label>Image:</label>
            <input type="text" id="image" value="${user.img}"/>
        </div>
    </form>
    <button onclick="saveContact('${user.phone}')">Save</button>
    <button class="close-btn" id="closeModalBtn" onclick="closeModal()">&times;</button>
    `;
}

// שמור את השינויים שנעשו באיש קשר
function saveContact(phoneNumber) {
      const user = users.find((user) => user.phone === phoneNumber);

      user.name = document.getElementById("name").value;
      user.phone = document.getElementById("number").value;
      user.email = document.getElementById("email").value;
      user.age = document.getElementById("age").value;
      user.country = document.getElementById("address").value;
      user.contactInfo = document.getElementById("text").value;
      user.img = document.getElementById("image").value;

      const userDiv = document.getElementsByClassName(user.id)[0];
      userDiv.innerHTML = `
    <div class="flex">
        <img class="profile" src="./imgs/${user.img}.jpg" alt="user pfp placeholder" />
        <h4>${user.name}</h4>
    </div>
    <div class="flex">
        <button class="icon" onclick="showContact('${user.id}')">
            <img src="./imgs/info.png" />
        </button>
        <button class="icon" onclick="editContact('${user.id}')">
            <img src="./imgs/edit.png" />
        </button>
        <button class="icon" onclick="deleteContact('${user.id}')">
            <img src="./imgs/delete.png"/>
        </button>
    </div>
    `;
      closeModal();
}

// מחק את כל אנשי הקשר
function deleteContacts() {
      if (confirm("Are you sure you want to delete all contacts?")) {
            users = [];
            document.getElementById('phone-list').innerHTML = "No Contacts"
            document.getElementById("users-length").innerHTML = `${users.length} People`
      }
}

// הוסף איש קשר חדש במודל
function addNewUser(e) {
      e.preventDefault();
      openModal();
      const div = document.getElementById("modal-content");

      div.innerHTML = `
    <form class="edit-form">
        <h2>Add New Contact</h2>
        <div>
            <label>Name:</label>
            <input type="text" id="name" placeholder="Contact name"/>
        </div>
        <div>
            <label>Number:</label>
            <input type="number" id="number" placeholder="Contact number"/>
        </div>
        <div>
            <label>Email:</label>
            <input type="email" id="email" placeholder="email@gmail.com"/>
        </div>
        <div>
            <label>Age:</label>
            <input type="number" id="age" placeholder="Contact age"/>
        </div>
        <div>
            <label>Address:</label>
            <input type="text" id="address" placeholder="Contact Address"/>
        </div>
        <div>
            <label>Text:</label>
            <textarea id="text" rows="3" cols="10"></textarea>
        </div>
        <div>
            <label>Image:</label>
            <input type="text" id="image" placeholder="Contact Image"/>
        </div>
    </form>
    <button onclick="saveNewContact()">Save</button>
    <button class="close-btn" id="closeModalBtn" onclick="closeModal()">&times;</button>
    `;
}

// שמור איש קשר חדש שנוסף
function saveNewContact() {
      const name = document.getElementById("name").value;
      const number = document.getElementById("number").value;
      const email = document.getElementById("email").value;
      const age = document.getElementById("age").value;
      const address = document.getElementById("address").value;
      const text = document.getElementById("text").value;
      const image = document.getElementById("image").value;




      if (!checkIfExists(name) && !checkIfNumberExists(number)) {
            const newUser = {
                  id: `${users.length + 1}`,
                  name,
                  phone: number,
                  email,
                  age,
                  country: address,
                  contactInfo: text,
                  img: image,
            };

            users.push(newUser); // הוסף את המשתמש החדש לרשימה
            sortAdd(); // מיין מחדש את הרשימה והצג את המשתמשים
            closeModal(); // סגור את המודל
      } else {
            alert("Name or Phone number used!")
      }
}

// מחק איש קשר ספציפי
function deleteContact(contactId) {
      if (confirm("Are you sure you want to delete this contact?")) {
            users = users.filter((user) => user.id !== contactId); // סנן את הרשימה והשאיר את אנשי הקשר שלא נמחקו
            document.getElementsByClassName(contactId)[0].remove(); // הסר את אלמנט ה-HTML של איש הקשר
            document.getElementById("users-length").innerHTML = `${users.length} People`
      }
      if (users.length === 0) {
            document.getElementById('phone-list').innerHTML = "No Contacts"
      }
}

// פונקציה להפעלת ה darkmode
let darked = false;
let effect = false
function darkModetoggle() {
      if (!darked) {
            document.body.className = "dark-mode";
            darked = true;
      } else {
            document.body.className = "";
            darked = false;
      }
}
// פונקצית איפקט
function coolEffect() {
      if (!effect) {
            document.body.className = "animated-background";
            effect = true;
      } else {
            document.body.className = "";
            effect = false;
      }
}
//בודקת האם השם איש קשר נמצה או לא לפני שיוסיף
function checkIfExists(name) {
      const user = users.filter((elem) => elem.name === name);
      if (user.length > 0)
            return true;
      return false;
}
// בודקת אם מספר טלפון נמצא לפני שמוסיפה איש קשר לרשימה
function checkIfNumberExists(number) {
      const user = users.filter((elem) => elem.phone === number);
      if (user.length > 0)
            return true;
      return false;
}

document.querySelectorAll("li").forEach(function (li) {
      li.addEventListener("mouseover", function () {
            this.classList.add("hovered");
      });

      li.addEventListener("mouseout", function () {
            this.classList.remove("hovered");
      });

});
