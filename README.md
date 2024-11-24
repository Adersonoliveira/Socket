# Documentação sobre o Código de Comunicação de Rede com Webcam

Este projeto implementa um servidor e um cliente utilizando comunicação TCP e UDP, com a funcionalidade de captura de imagens via webcam. Ele é composto por dois principais componentes:

1. **Servidor**: Um servidor TCP que recebe conexões de clientes e pode enviar mensagens de volta aos clientes.
2. **Cliente**: Um cliente que pode enviar mensagens ao servidor, ativar/desativar a webcam e capturar imagens.

## Requisitos

Para executar o código, você precisa garantir que tenha as dependências abaixo instaladas no seu ambiente:

- **Node.js** (para rodar o código cliente)
- **Python 3.x** (para rodar o código servidor)
- **Dependências Node.js**:
  - `net` (módulo nativo do Node.js para comunicação TCP)
  - `dgram` (módulo nativo do Node.js para comunicação UDP)
  - `readline` (módulo nativo para leitura de entrada do usuário)
  - `node-webcam` (biblioteca para interação com a webcam)
  
No terminal, você pode instalar o `node-webcam` utilizando o comando:
```bash
npm install node-webcam
```

### Estrutura do Projeto

O projeto é dividido em duas partes: o **cliente** em JavaScript (Node.js) e o **servidor** em Python.

## Cliente (JavaScript)

### Funções Principais

1. **discoverServer(callback)**:
   - A função utiliza o módulo `dgram` para criar um socket UDP e aguardar um broadcast do servidor. Quando o servidor enviar a mensagem de descoberta, o cliente irá conectar-se ao servidor na porta informada.

2. **main()**:
   - Inicializa o processo de descoberta do servidor.
   - Quando o servidor é encontrado, o cliente se conecta ao servidor TCP utilizando o módulo `net`.
   - O cliente aceita comandos do usuário via `readline`. O usuário pode enviar mensagens para o servidor, capturar imagens da webcam ou ativar/desativar a webcam.

3. **startWebcam() e stopWebcam()**:
   - O cliente pode ativar a captura contínua de imagens da webcam a cada 1 segundo, ou desativar a captura.

4. **Webcam Capture**:
   - Quando o usuário digita o comando `foto`, o cliente captura uma imagem da webcam, mas não envia ao servidor. 
   - O comando `webcam` ativa a captura contínua de imagens da webcam.

### Como Executar o Cliente

1. Instale as dependências:
   ```bash
   npm install node-webcam
   ```

2. Execute o cliente:
   ```bash
   node cliente.js
   ```

3. Interaja com o cliente:
   - **Comando `foto`**: Captura uma imagem com a webcam.
   - **Comando `webcam`**: Inicia a captura contínua de imagens.
   - **Comando `desligar`**: Desliga a captura da webcam.

## Servidor (Python)

### Funções Principais

1. **broadcast_discovery(port)**:
   - A função envia pacotes UDP de broadcast para todos os dispositivos na rede local, permitindo que os clientes descubram a porta do servidor.

2. **main()**:
   - O servidor é iniciado utilizando o módulo `socket` no protocolo TCP. Ele escuta conexões de clientes e inicia uma thread para tratar cada novo cliente.
   - O servidor também inicia uma thread para enviar broadcasts de descoberta de porta.

3. **messagesTreatment(client)**:
   - Trata as mensagens recebidas de cada cliente, utilizando a função `broadcast` para retransmitir a mensagem para todos os outros clientes conectados.

4. **broadcast(msg, client)**:
   - Envia a mensagem recebida de um cliente para todos os outros clientes conectados.

5. **deleteClient(client)**:
   - Remove um cliente da lista de clientes conectados quando ele se desconecta.

6. **showConnectedClients()**:
   - Exibe os clientes atualmente conectados ao servidor.

### Como Executar o Servidor

1. Instale o Python (se não tiver instalado) e execute:
   ```bash
   python servidor.py
   ```

2. O servidor irá começar a escutar na porta escolhida e fará broadcast de sua porta para que os clientes possam se conectar.

### Interação Cliente-Servidor

- O cliente realiza uma busca ativa pela rede para encontrar o servidor, utilizando a comunicação UDP.
- Quando o servidor é encontrado, o cliente tenta se conectar via TCP e pode começar a enviar e receber mensagens.
- O servidor transmite as mensagens para todos os outros clientes conectados.

## Exemplos de Uso

1. **Descoberta do Servidor**:
   O cliente ficará aguardando até que o servidor envie o broadcast indicando sua porta.

2. **Envio de Mensagens**:
   Uma vez conectado, o cliente pode enviar mensagens para o servidor. As mensagens serão retransmitidas para todos os outros clientes conectados.

3. **Captura de Imagens**:
   O cliente pode capturar imagens a qualquer momento com o comando `foto`, ou ativar/desativar a captura contínua com os comandos `webcam` e `desligar`.

## Conclusão

Este projeto exemplifica uma aplicação simples de comunicação em rede usando TCP/UDP para enviar mensagens entre um servidor e múltiplos clientes, com a adição de funcionalidades de webcam utilizando a biblioteca `node-webcam`. O servidor gerencia conexões de clientes, enquanto o cliente interage com o servidor e também com a webcam para capturar imagens.
