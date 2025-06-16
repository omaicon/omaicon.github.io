const code = `
omaicon@redteam:~$ sudo ./access_granted
[+] Inicializando ambiente seguro...
[+] Verificando conexões...
[+] Sessão ativa em 192.168.0.66
[+] Acesso root concedido.
omaicon@redteam:~$ █
`;

let index = 0;
let started = false;
const output = document.getElementById('output');

function startTyping() {
  if (started) return;
  started = true;
  output.innerHTML = "";
  typeNextChar();
}

function typeNextChar() {
  if (index < code.length) {
    output.innerHTML += code.charAt(index);
    index++;
    setTimeout(typeNextChar, 20);
  } else {
    startInteractiveTerminal();
  }
}

function startInteractiveTerminal() {
  setTimeout(() => {
    const commandLine = document.createElement("div");
    commandLine.innerText = `omaicon@redteam:~$ whoami`;
    output.appendChild(commandLine);
    
    const response = "nome: Maicon Christ (omaicon)\nRed Team | Offensive Tools Developer | Pentest  \nlinguagens: Golang, Python, C, C++, .NET";
    
    const responseLine = document.createElement("div");
    responseLine.innerHTML = response.replace(/\n/g, "<br>");
    output.appendChild(responseLine);
    
    setTimeout(() => {
      const helpCommandLine = document.createElement("div");
      helpCommandLine.innerText = `omaicon@redteam:~$ help`;
      output.appendChild(helpCommandLine);
      
      displayHelp();
      
      const promptLine = document.createElement("div");
      promptLine.innerHTML = `omaicon@redteam:~$ <span class="cursor">█</span>`;
      output.appendChild(promptLine);
      
      window.scrollTo(0, document.body.scrollHeight);
    }, 1000);
  }, 500);
}

function processCommand(command) {
  const commandLine = document.createElement("div");
  commandLine.innerText = `omaicon@redteam:~$ ${command}`;
  output.appendChild(commandLine);
  
  let response = "";
  
  if (command.toLowerCase() === "whoami") {
    response = "nome: Maicon (omaicon)\nprofissão: Analista de Segurança, Pentester e Red Team\nlinguagens: Golang, Python, C, C++, .NET";
  } else if (command.toLowerCase() === "help") {
    displayHelp();
    return;
  } else if (command.toLowerCase() === "clear" || command.toLowerCase() === "cls") {
    output.innerHTML = "";
    const promptLine = document.createElement("div");
    promptLine.innerHTML = `omaicon@redteam:~$ <span class="cursor">█</span>`;
    output.appendChild(promptLine);
    return;
  } else {
    response = "Comando inválido. Digite 'help' para ver os comandos disponíveis.";
  }

  const responseLine = document.createElement("div");
  responseLine.innerHTML = response.replace(/\n/g, "<br>");
  output.appendChild(responseLine);
  
  const promptLine = document.createElement("div");
  promptLine.innerHTML = `omaicon@redteam:~$ <span class="cursor">█</span>`;
  output.appendChild(promptLine);
  
  window.scrollTo(0, document.body.scrollHeight);
}

function displayHelp() {
  const helpMenu = document.createElement("div");
  helpMenu.innerHTML = `
    <br>Comandos disponíveis:<br>
    <div class="menu-option" onclick="openLink('artigos')">[ ARTIGOS ]</div>
    <div class="menu-option" onclick="openLink('github')">[ GITHUB ]</div>
  `;
  output.appendChild(helpMenu);
}

function openLink(page) {
  const links = {
    'artigos': 'artigos',
    'github': 'https://github.com/omaicon'
  };
  
  const url = links[page] || '#';
  
  const responseLine = document.createElement("div");
  responseLine.innerHTML = `Redirecionando para ${page}...`;
  output.appendChild(responseLine);
  
  setTimeout(() => {
    window.location.href = url;
  }, 1000);
}

window.onload = function() {
  startTyping();
};
