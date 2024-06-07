//Função para adicionar máscara ao cpf
function handleChangeCPF(event) {
  const newValue = event.target.value
    .replace(/\D/g, "")
    .replace(/(\d{9})(\d)/, "$1-$2")
    .replace(/(\d{6})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2");

  event.target.value = newValue;
}

//Adicionar eventListeners aos campos necessários
document.getElementById("inputCPF").addEventListener("input", handleChangeCPF);
