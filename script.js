const CPF_LENGTH = 14; // Quantidade de characteres do CPF ( incluindo os pontos e o traço ).
const contacts = []; //Variável para armazear a lista de contatos cadastrados

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

// Função de controle de submit do contato ao clicar em cadastro
function handleFormSubmit(event) {
  event.preventDefault();

  const cpf = document.getElementById("inputCPF").value;

  if (cpf.length !== CPF_LENGTH) {
    window.alert("Cpf inválido!");
    return;
  }

  const contactExist = contacts.find((contact) => contact.cpf === cpf);
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
  window.alert("Contato salvo com sucesso!");
}

// Função para listar todos os contatos cadastrados
function showContacts() {
  clearListContacts();

  if (contacts.length === 0) {
    window.alert("Nenhum contanto cadastrado! Por favor cadastre um contato.");
    return;
  }

  const listContainer = renderListContainer();
  const listContactContainer = renderListContactContainer();

  contacts.forEach((contact) =>
    listContactContainer.append(renderContactCard(contact))
  );

  listContainer.append(listContactContainer);
  document.getElementById("list-container-root").append(listContainer);
}

// Função para buscar um contato salvo
function findContact() {
  const contactToFind = window.prompt(
    "Digite o CPF do contato que deseja buscar:"
  );

  if (contactToFind === null) return;

  const contactExist = contacts.find(
    (contact) => contact.cpf === contactToFind
  );

  if (contactExist) {
    window.alert(
      `Nome: ${contactExist.name}, Data de Nascimento: ${contactExist.birthdate}, Endereço: ${contactExist.address}`
    );
  } else {
    window.alert("CPF não encontrado!");
  }
}

// Função para remover um contato cadastrado
function removeContact() {
  const contactToFind = window.prompt(
    "Digite o CPF do contato que deseja remover:"
  );

  if (contactToFind === null) return;

  const contactExist = contacts.findIndex(
    (contact) => contact.cpf === contactToFind
  );

  if (contactExist >= 0) {
    contacts.splice(contactExist, 1);
    window.alert("Contato excluído com sucesso!");
  } else {
    window.alert("CPF não encontrado!");
  }
}

//Adicionar eventListeners aos campos necessários
document.getElementById("inputCPF").addEventListener("input", handleChangeCPF);
document
  .getElementById("form-register-user")
  .addEventListener("submit", handleFormSubmit);
