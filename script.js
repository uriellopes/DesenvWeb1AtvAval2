const CPF_LENGTH = 14; // Quantidade de characteres do CPF ( incluindo os pontos e o traço ).

//Variável para armazear a lista de contatos cadastrados
const contacts = [
  {
    name: "Admin",
    cpf: "000.000.000-00",
    birthdate: "2024-06-07",
    address: "Avenidade tão distante",
  },
  {
    name: "User",
    cpf: "111.111.111-11",
    birthdate: "2024-06-07",
    address: "Rua bem ali",
  },
];

//Função para adicionar máscara ao cpf
function handleChangeCPF(event) {
  const newValue = event.target.value
    .replace(/\D/g, "")
    .replace(/(\d{9})(\d)/, "$1-$2")
    .replace(/(\d{6})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2");

  event.target.value = newValue;
}

// Função para limpar o elemento que contém a lista de contatos
function clearListContacts() {
  document.getElementById("list-container-root").innerHTML = "";
}

// Função para renderizar o container da lista de contatos
function renderListContainer() {
  const listContainer = document.createElement("div");
  listContainer.classList.add("list-container");

  return listContainer;
}

// Função para renderizar o titulo do container da lista de contatos
function renderListContainerTitle(title) {
  const listContainerTitle = document.createElement("h3");
  listContainerTitle.append(title);

  return listContainerTitle;
}

// Função para renderizar o elemento container dos card de contatos
function renderListContactContainer() {
  const contactContainer = document.createElement("div");
  contactContainer.classList.add("contact-container");

  return contactContainer;
}

// Função para renderizar o nome do contato no card de contato
function renderContactCardName(text) {
  const contactCardName = document.createElement("h4");
  contactCardName.classList.add("contact-card-title");
  contactCardName.append(text);

  return contactCardName;
}

// Função para renderizar cada um dos campos do card de contato
function renderContactCardText(name, text) {
  const card = document.createElement("div");
  const cardName = document.createElement("b");
  cardName.append(name + ": ");

  card.append(cardName);
  card.append(text);

  return card;
}

// Função para renderizar o card de um contato
function renderContactCard(contact) {
  const contactCard = document.createElement("div");
  contactCard.classList.add("contact-card");

  const contactCardName = renderContactCardName(contact.name);
  const contactCardCPF = renderContactCardText("CPF", contact.cpf);
  const contactCardBirthDate = renderContactCardText(
    "Data de Nascimento",
    contact.birthdate
  );
  const contactCardAddress = renderContactCardText("Endereço", contact.address);

  contactCard.append(contactCardName);
  contactCard.append(contactCardCPF);
  contactCard.append(contactCardBirthDate);
  contactCard.append(contactCardAddress);

  return contactCard;
}

//Função de controle de submit do contato ao clicar em cadastro
function handleFormSubmit(event) {
  event.preventDefault();
  clearListContacts();

  const cpf = document.getElementById("inputCPF").value;

  if (cpf.length !== CPF_LENGTH) {
    window.alert("Cpf inválido!");
    return;
  }

  let contactExist = contacts.find((contact) => contact.cpf === cpf);
  if (contactExist) {
    window.alert("Contato já cadastrado!");
    return;
  }

  const name = document.getElementById("inputName").value;
  const birthdate = document.getElementById("inputBirthDate").value;
  const address = document.getElementById("inputAddress").value;

  const newContact = {
    name: name,
    cpf: cpf,
    birthdate: birthdate,
    address: address,
  };

  contacts.push(newContact);

  const listContainer = renderListContainer();
  const listContainerTitle = renderListContainerTitle(
    "Novo Contato Cadastrado"
  );
  const listContactContainer = renderListContactContainer();

  listContactContainer.append(renderContactCard(newContact));

  listContainer.append(listContainerTitle);
  listContainer.append(listContactContainer);
  document.getElementById("list-container-root").append(listContainer);
}

// Função para listar todos os contatos cadastrados
function showContacts() {
  clearListContacts();

  if (contacts.length === 0) {
    window.alert("Nenhum contanto cadastrado! Por favor cadastre um contato.");
    return;
  }

  const listContainer = renderListContainer();
  const listContainerTitle = renderListContainerTitle("Listar Contatos");
  const listContactContainer = renderListContactContainer();

  contacts.forEach((contact) =>
    listContactContainer.append(renderContactCard(contact))
  );

  listContainer.append(listContainerTitle);
  listContainer.append(listContactContainer);
  document.getElementById("list-container-root").append(listContainer);
}

//Adicionar eventListeners aos campos necessários
document.getElementById("inputCPF").addEventListener("input", handleChangeCPF);
document
  .getElementById("form-register-user")
  .addEventListener("submit", handleFormSubmit);
