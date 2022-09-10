let clientsApi = "http://localhost:3000/users";
function start() {
    getClients(renderClients);
    handleCreateClients();
}
start();

function getClients(callback) {
  fetch(clientsApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function createClients(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data)
    }
    fetch(clientsApi , options)
    .then(function(response) {
        return response.json();
    })
    .then(callback);
}
function renderClients(clients) {
    let html;
    let clientsBlock = document.getElementById("list-clients");
    html = clients.map(function(client) {
        return `<li class="client-id-${client.id}">
        <h1 class="nameClient">Name: <span>${client.name}</span>
        </h1>
        <p>Age: <span>${client.age}</span></p>
        <button onclick="handleDeleteClient(${client.id})">Delete</button>
        <button onclick="handleEditClient(${client.id})">Edit</button>
        </li>`
    });
    clientsBlock.innerHTML = html.join('');
}
function handleCreateClients() {
    //let name = document.querySelector("[]")
    let createBtn = document.getElementById("create");
    createBtn.onclick = function() {
        alert("Added client successful!");
        var name = document.querySelector('input[name="name"]').value;
        console.log(name);
        var age = document.querySelector('input[name="age"]').value;
        var clientData = {
            name: name,
            age: age,
        };
        createClients(clientData ,getClients(renderClients));
    }
}
function handleDeleteClient(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
    fetch(clientsApi + "/" +  id, options)
    .then(function(response) {
        return response.json();
    })
    .then(function() {
        getClients(renderClients);
    });
}
function editClient(id ,data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data)
    }
    fetch(clientsApi + "/" + id, options)
    .then(function(response) {
        return response.json();
    })
    .then(callback);
}
function handleEditClient(id) {
    let clientEdit = document.querySelector('.client-id-'  + id);
    console.log(clientEdit);
    let nameEdit = clientEdit.querySelector('h1 span');
    let ageEdit = clientEdit.querySelector("p span");
    let htmls = `
    <div class="client-id-${id}">
    <h1>Name:</h1>
    <input type="text" value="${nameEdit.textContent}" name="name">
  </div>
  <div>
    <h1>Age:</h1>
    <input type="number" value="${ageEdit.textContent}" name="age">
  </div>
  <div>
    <button id="saveBtn-id-${id}">Save</button>
  </div>
</div>
    `
    clientEdit.innerHTML = htmls;
    let saveBtnElement = document.querySelector("#saveBtn-id-"+id);
    let clientEditElement = document.querySelector(".client-id-" + id);
    saveBtnElement.onclick = function() {
        let name = clientEditElement.querySelector('input[name="name"]').value;
        let age = clientEditElement.querySelector('input[name="age"]').value;
        let editData = {
            name: name,
            age: age,
        };
        console.log(editData);
        editClient(id , editData , getClients(renderClients) );
    }
}