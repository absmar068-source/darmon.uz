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

/* LOGIN FUNCTION GLOBAL QILAMIZ */
window.login = function () {

  const name = document.getElementById("userName").value;
  const phone = document.getElementById("userPhone").value;

  if(!name || !phone){
    alert("Ism va telefonni kiriting");
    return;
  }

  user = {name, phone};

  document.getElementById("loginPage").style.display = "none";
  document.getElementById("appPage").style.display = "block";

  render();
}

window.logout = function () {
  location.reload();
}

function render(){

  // clinics
  document.getElementById("clinics").innerHTML =
    clinics.map(c => `
      <div class="item">${c.name}</div>
    `).join("");

  // doctors
  document.getElementById("doctors").innerHTML =
    doctors.map(d => `
      <div class="item">
        <b>${d.name}</b><br>
        Klinikasi: ${d.clinic}
        <button onclick="book('${d.id}')">Navbat olish</button>
      </div>
    `).join("");

  // profile
  document.getElementById("profile").innerHTML = `
    <div class="item">
      Ism: ${user.name}<br>
      Telefon: ${user.phone}
    </div>
  `;
}

window.book = function(id){
  alert("Navbat olindi: " + id);
}
