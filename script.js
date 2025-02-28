// Endpoint base da API (hipotético, padrão do deploy via DockerHub)
// Exemplo: "https://seu-usuario-dockerhub.io/api"
// Altere essa URL para a do seu backend após o deploy.
const API_BASE_URL = "https://hub.docker.com/repository/docker/lcsdocker0/cpf-validator-back";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bt_validar_cpf").addEventListener("click", validarCPF);
  
  // Opcional: implementar máscara ou formatação para o CPF enquanto o usuário digita.
});

function validarCPF() {
  const cpf = document.getElementById("txt_cpf").value.trim();
  
  if (cpf === "") {
    displayResponse("Por favor, insira um CPF.");
    return;
  }
  
  // Chamada para o endpoint /validate da API
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
