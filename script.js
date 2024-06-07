const contacts = [
  {
    name: "Admin",
    cpf: "000.000.000-00",
    birthdate: "2024-06-07",
    address: "desconhecido",
  },
  {
    name: "User",
    cpf: "000.000.000-00",
    birthdate: "2024-06-07",
    address: "desconhecido",
  },
]; //Variável para armazear a lista de contatos cadastrados

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
