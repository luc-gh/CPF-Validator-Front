const API_BASE_URL = "https://cpf-validator-back.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bt_validar_cpf").addEventListener("click", validarCPF);
  document.getElementById("toggleDarkMode").addEventListener("click", toggleDarkMode);
});

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const mode = document.body.classList.contains("dark-mode") ? "Escuro" : "Claro";
  console.log("Modo alterado para:", mode);
}

function validarCPF() {
  console.log("Iniciando validação do CPF...");
  const cpf = document.getElementById("txt_cpf").value.trim();
  if (cpf === "") {
    console.log("CPF não informado.");
    displayResponse("Por favor, insira um CPF.");
    return;
  }

  const protocolElements = document.getElementsByName("protocol");
  let selectedProtocol = "tcp"; 
  for (const elem of protocolElements) {
    if (elem.checked) {
      selectedProtocol = elem.value;
      break;
    }
  }

  console.log("CPF informado:", cpf);
  console.log("Protocolo selecionado:", selectedProtocol);
  const url = `${API_BASE_URL}/validate?cpf=${encodeURIComponent(cpf)}&protocol=${encodeURIComponent(selectedProtocol)}`;
  console.log("Fazendo requisição para:", url);

  fetch(url, { method: "GET", mode: "cors" })
    .then(response => {
      console.log("Resposta HTTP recebida:", response.status);
      if (!response.ok) {
        return response.json().then(errData => {
          throw new Error(errData.message || `Erro HTTP: ${response.status}`);
        }).catch(() => {
          throw new Error(`Erro HTTP: ${response.status}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log("Dados da API:", data);
      const message = data.valid ? "CPF Válido!" : "CPF Inválido!";
      displayResponse(message);
    })
    .catch(error => {
      console.error("Erro na chamada à API:", error);
      displayResponse(`Erro na comunicação com o servidor: ${error.message}`);
    });
}

function displayResponse(message) {
  document.getElementById("texto_resposta").value = message;
  console.log("Mensagem exibida para o usuário:", message);
}
