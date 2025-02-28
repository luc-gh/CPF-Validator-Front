const API_BASE_URL = "https://cpf-validator-back.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bt_validar_cpf").addEventListener("click", validarCPF);
});

function validarCPF() {
  const cpf = document.getElementById("txt_cpf").value.trim();
  
  if (cpf === "") {
    displayResponse("Por favor, insira um CPF.");
    return;
  }
  
  // Obtém o protocolo selecionado (TCP ou UDP)
  const protocolElements = document.getElementsByName("protocol");
  let selectedProtocol = "tcp"; // padrão
  for (const elem of protocolElements) {
    if (elem.checked) {
      selectedProtocol = elem.value;
      break;
    }
  }
  
  // Monta a URL com os parâmetros cpf e protocol
  const url = `${API_BASE_URL}/validate?cpf=${encodeURIComponent(cpf)}&protocol=${encodeURIComponent(selectedProtocol)}`;
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        // Tenta extrair detalhes do erro da resposta JSON
        return response.json().then(errData => {
          throw new Error(errData.message || `Erro HTTP: ${response.status}`);
        }).catch(() => {
          // Fallback caso a resposta não seja JSON
          throw new Error(`Erro HTTP: ${response.status}`);
        });
      }
      return response.json();
    })
    .then(data => {
      // Considera que a API retorna um JSON com o campo "valid" e, opcionalmente, "reason"
      if (data.valid) {
        displayResponse("CPF Válido!");
      } else {
        let msg = "CPF Inválido!";
        if (data.reason) {
          msg += ` Motivo: ${data.reason}`;
        }
        displayResponse(msg);
      }
    })
    .catch(error => {
      console.error("Erro na chamada à API:", error);
      displayResponse(`Erro na comunicação com o servidor: ${error.message}`);
    });
}

function displayResponse(message) {
  document.getElementById("texto_resposta").value = message;
}
