"use strict";

/* ===== DOM ===== */
const search = document.querySelector(".search-bar");
const ul = document.getElementById("phone-list");

/* ===== بيانات مبدئية ===== */
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
  },
  {
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

/* ===== Utilities (تطبيع) ===== */
const cleanName = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
const titleCase = (s) =>
  cleanName(s).replace(/\b\w/g, (c) => c.toUpperCase());
const cleanPhone = (s) => String(s || "").replace(/\D/g, "");

/* نظّف البيانات المبدئية (يشيل مسافات ويثبّت أرقام) */
users = users.map((u) => ({
  ...u,
  name: titleCase(u.name),
  phone: cleanPhone(u.phone),
}));

/* ===== Render & Sort ===== */
function sortAdd() {
  ul.innerHTML = "";
  users.sort((a, b) => cleanName(a.name).localeCompare(cleanName(b.name)));
  users.forEach((user) => getUser(user));
  document.getElementById("users-length").innerText = `${users.length} People`;
}

/* عنصر مستخدم واحد في القائمة */
function getUser(user) {
  const liItem = document.createElement("li");
  liItem.classList.add("flex");
  liItem.classList.add(user.id); // نستخدمه للوصول السريع
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

/* ===== بحث ===== */
search.addEventListener("input", (e) => {
  const q = cleanName(e.target.value);
  const filteredList = users.filter((u) =>
    cleanName(u.name).includes(q)
  );
  ul.innerHTML = "";
  filteredList.forEach((user) => getUser(user));
});

/* ===== Modal ===== */
function openModal() {
  document.getElementById("myModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

/* عرض معلومات الاتصال */
function showContact(contactId) {
  openModal();
  const div = document.getElementById("modal-content");
  const user = users.find((u) => u.id === contactId);
  div.innerHTML = `
    <div class="flex-popup">
      <h2>Contact Info ${user.name}</h2>
      <div><span>Contact Name: </span>${user.name}</div>
      <div><span>Contact Number:</span>${user.phone}</div>
      <div><span>Contact Email:</span>${user.email}</div>
      <div><span>Contact Country: </span>${user.country}</div>
      <div><span>Contact Text: </span>${user.contactInfo}</div>
      <div><span>Contact Age:</span>${user.age ?? ""}</div>
    </div>
    <button class="close-btn" id="closeModalBtn" onclick="closeModal()">&times;</button>
  `;
}

/* تعديل */
function editContact(contactId) {
  openModal();
  const div = document.getElementById("modal-content");
  const user = users.find((u) => u.id === contactId);

  div.innerHTML = `
    <form class="edit-form">
      <h2>Edit Contact ${user.name}</h2>
      <div>
        <label>Contact name:</label>
        <input type="text" id="name" value="${user.name}"/>
      </div>
      <div>
        <label>Contact number:</label>
        <input type="tel" id="number" inputmode="numeric" pattern="[0-9]*" value="${user.phone}"/>
      </div>
      <div>
        <label>Contact Email:</label>
        <input type="email" id="email" value="${user.email}"/>
      </div>
      <div>
        <label>Contact age:</label>
        <input type="number" id="age" value="${user.age ?? ""}"/>
      </div>
      <div>
        <label>Contact country:</label>
        <input type="text" id="address" value="${user.country}"/>
      </div>
      <div>
        <label>Contact Text:</label>
        <textarea id="text" rows="3" cols="10">${user.contactInfo || ""}</textarea>
      </div>
      <div>
        <label>Image:</label>
        <input type="text" id="image" value="${user.img}"/>
      </div>
    </form>
    <button onclick="saveContact('${user.id}')">Save</button>
    <button class="close-btn" id="closeModalBtn" onclick="closeModal()">&times;</button>
  `;
}

/* حفظ التعديل */
function saveContact(contactId) {
  const user = users.find((u) => u.id === contactId);

  const newName = titleCase(document.getElementById("name").value);
  const newPhone = cleanPhone(document.getElementById("number").value);
  const newEmail = document.getElementById("email").value.trim();
  const newAge = Number(document.getElementById("age").value) || null;
  const newCountry = document.getElementById("address").value.trim();
  const newText = document.getElementById("text").value.trim();
  const newImg = document.getElementById("image").value.trim();

  // امنع تكرار (مع استثناء العنصر نفسه)
  const duplicate = users.some(
    (u) =>
      u.id !== contactId &&
      (cleanName(u.name) === cleanName(newName) ||
        cleanPhone(u.phone) === newPhone)
  );
  if (duplicate) {
    alert("Name or Phone number used!");
    return;
  }

  user.name = newName;
  user.phone = newPhone;
  user.email = newEmail;
  user.age = newAge;
  user.country = newCountry;
  user.contactInfo = newText;
  user.img = newImg;

  // أعد الرسم والترتيب
  sortAdd();
  closeModal();
}

/* حذف الكل */
function deleteContacts() {
  if (confirm("Are you sure you want to delete all contacts?")) {
    users = [];
    document.getElementById("phone-list").innerHTML =
      "No Contacts Avaible -_-";
    document.getElementById("users-length").innerText = `${users.length} People`;
  }
}

/* إضافة جديد (يفتح نموذج) */
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
        <input type="tel" id="number" inputmode="numeric" pattern="[0-9]*" placeholder="Contact number"/>
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

/* حفظ الجديد */
function saveNewContact() {
  const name = titleCase(document.getElementById("name").value);
  const number = cleanPhone(document.getElementById("number").value);
  const email = document.getElementById("email").value.trim();
  const age = Number(document.getElementById("age").value) || null;
  const address = document.getElementById("address").value.trim();
  const text = document.getElementById("text").value.trim();
  const image = document.getElementById("image").value.trim();

  // فحص تكرار
  const duplicate = users.some(
    (u) =>
      cleanName(u.name) === cleanName(name) ||
      cleanPhone(u.phone) === number
  );
  if (duplicate) {
    alert("Name or Phone number used!");
    return;
  }

  const newId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now());

  const newUser = {
    id: newId,
    name,
    phone: number,
    email,
    age,
    country: address,
    contactInfo: text,
    img: image,
  };

  users.push(newUser);
  sortAdd();
  closeModal();
}

/* حذف عنصر محدد */
function deleteContact(contactId) {
  if (confirm("Are you sure you want to delete this contact?")) {
    users = users.filter((u) => u.id !== contactId);
    sortAdd();
  }
  if (users.length === 0) {
    document.getElementById("phone-list").innerHTML = "No Contacts";
  }
}

/* Dark mode */
let darked = false;
let effect = false;
function darkModetoggle() {
  document.body.className = darked ? "" : "dark-mode";
  darked = !darked;
}
function coolEffect() {
  document.body.className = effect ? "" : "animated-background";
  effect = !effect;
}

/* فحص وجود (مُطبَّع) */
function checkIfExists(name) {
  const n = cleanName(name);
  return users.some((u) => cleanName(u.name) === n);
}
function checkIfNumberExists(number) {
  const p = cleanPhone(number);
  return users.some((u) => cleanPhone(u.phone) === p);
}

/* Hover (تفويض أحداث حتى يعمل على العناصر الجديدة) */
ul.addEventListener("mouseover", (e) => {
  const li = e.target.closest("li");
  if (li) li.classList.add("hovered");
});
ul.addEventListener("mouseout", (e) => {
  const li = e.target.closest("li");
  if (li) li.classList.remove("hovered");
});

/* بدء التشغيل */
sortAdd();
