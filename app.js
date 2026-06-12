let user = null;

/* TEST DATA */

const clinics = [
  {id:"k1", name:"Klinika 1"},
  {id:"k2", name:"Klinika 2"},
  {id:"k3", name:"Klinika 3"},
];

const doctors = [
  {id:"drk01", name:"Dr Aliyev", clinic:"k1"},
  {id:"drk02", name:"Dr Karimova", clinic:"k1"},
  {id:"drk03", name:"Dr Boboyev", clinic:"k2"},
];

/* LOGIN */

function login(){
  const name = document.getElementById("userName").value;
  const phone = document.getElementById("userPhone").value;

  if(!name || !phone) return alert("To‘ldir");

  user = {name, phone};

  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("appPage").classList.remove("hidden");

  render();
}

/* LOGOUT */

function logout(){
  user = null;
  location.reload();
}

/* RENDER */

function render(){

  // clinics
  let cHtml = "";
  clinics.forEach(c=>{
    cHtml += `<div class="item">${c.name}</div>`;
  });
  document.getElementById("clinics").innerHTML = cHtml;

  // doctors
  let dHtml = "";
  doctors.forEach(d=>{
    dHtml += `
      <div class="item">
        <b>${d.name}</b><br>
        Klinikasi: ${d.clinic}
        <button onclick="book('${d.id}')">Navbat olish</button>
      </div>
    `;
  });
  document.getElementById("doctors").innerHTML = dHtml;

  // profile
  document.getElementById("profile").innerHTML =
    `<div class="item">
      Ism: ${user.name}<br>
      Telefon: ${user.phone}
    </div>`;
}

/* BOOK */

function book(docId){
  alert("Navbat olindi: " + docId);
}
