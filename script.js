const API_BASE_URL = "https://cpf-validator-back-1-2.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bt_validar_cpf").addEventListener("click", validarCPF);
  });

function validarCPF() {
  const cpf = document.getElementById("txt_cpf").value.trim();
  
  if (cpf === "") {
    displayResponse("Por favor, insira um CPF.");
    return;
  }
  
  fetch(`${API_BASE_URL}/validate?cpf=${encodeURIComponent(cpf)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.valid) {
        displayResponse("CPF Válido!");
      } else {
        displayResponse("CPF Inválido!");
      }
    })
    .catch(error => {
      console.error("Erro na chamada à API:", error);
      displayResponse("Erro na comunicação com o servidor.");
    });
}

function displayResponse(message) {
  document.getElementById("texto_resposta").value = message;
}
