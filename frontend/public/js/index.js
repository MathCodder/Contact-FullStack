const buttonSubmit = document.getElementById("submit");
const btnAdd = document.getElementById("btn-add");

const init = () => {
  buttonSubmit.addEventListener("click", fetchGet);
  btnAdd.addEventListener("click", fetchPost);
};

function fetchGet() {
  fetch("/api/contacts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((contacts) => {
      if (contacts.error) {
        console.log("Erreur", contacts.error);
      } else {
        createTable(contacts);
      }
    })
    .catch((error) => console.error("Erreur", error));
}

function deleteContact(event) {
  const contactId = event.target.getAttribute("data-id");

  fetch(`/api/contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.error) {
        console.error("Erreur:", response.error);
      } else {
        console.log(response.message);
        event.target.closest("tr").remove();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function fetchPost() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!name || !email || !phone) {
    return;
  }

  const data = { name, email, phone };

  fetch("/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((contact) => {
      if (contact) {
        const activeTable = document.querySelector(".active");

        if (activeTable === undefined) {
          createTable(contact);
        } else {
          const tr = document.createElement("tr");
          Object.values(contact).forEach((value) => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
          });
          const deleteCell = tr.insertCell();
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.setAttribute("data-id", contact.id);
          deleteButton.addEventListener("click", deleteContact);
          deleteCell.appendChild(deleteButton);
          activeTable.appendChild(tr);
        }
      } else {
        console.log(contact.error);
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

function createTable(contacts) {
  const activeTable = document.querySelector(".active");
  const main = document.querySelector("main");
  const div = document.createElement("div");
  div.classList.add("table-box");

  if (activeTable == undefined) {
    const table = document.createElement("table");
    const headerRow = table.insertRow();
    const headers = ["ID", "Name", "Email", "Phone"];
    headers.forEach((headerText) => {
      const header = document.createElement("th");
      header.textContent = headerText;
      headerRow.appendChild(header);
    });

    contacts.forEach((contact) => {
      const row = table.insertRow();
      Object.values(contact).forEach((text) => {
        const cell = row.insertCell();
        cell.textContent = text;
      });

      const deleteCell = row.insertCell();
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("data-id", contact.id);
      deleteButton.addEventListener("click", deleteContact);
      deleteCell.appendChild(deleteButton);
    });

    table.setAttribute("class", "active");

    div.appendChild(table);
    main.appendChild(div);
  } else {
    return;
  }
}

init();
