# Documentação sobre o Funcionamento 

Este documento descreve como o chat do cliente e servidor funciona, com exemplos práticos de como o cliente interage com o servidor, incluindo a ativação da webcam.

## Cenário: Chat com Webcam Ativada

Quando o cliente está conectado ao servidor, ele pode utilizar a webcam para capturar imagens ou ativar/desativar a captura contínua. O servidor recebe as mensagens do cliente e as retransmite para os outros clientes conectados. O cliente pode interagir com a webcam durante a conversa.

### Fluxo Geral

1. O cliente se conecta ao servidor via TCP, após descobrir o servidor via broadcast UDP.
2. O cliente envia mensagens de texto para o servidor.
3. O cliente pode ativar a captura contínua de imagens da webcam a qualquer momento.
4. O servidor retransmite as mensagens de texto para os outros clientes.
5. O cliente pode capturar uma foto manualmente com o comando `foto` ou ativar/desativar a webcam com os comandos `webcam` (para ativar) e `desligar` (para parar).

### Exemplo de Funcionamento do Chat com Webcam

Aqui está um exemplo de como seria a interação entre o cliente e o servidor, com a webcam ativada:

---

#### 1. **Descoberta do Servidor**

Ao iniciar o cliente, ele aguarda uma resposta do servidor via broadcast UDP. O servidor envia um broadcast de sua porta, e o cliente se conecta ao servidor via TCP.

```bash
Aguardando broadcast do servidor...
Servidor encontrado no endereço 192.168.0.10:3000
Conectado ao servidor!
```

#### 2. **Conexão com o Servidor e Envio de Mensagens**

Após a conexão com o servidor, o cliente solicita o nome de usuário e começa a enviar mensagens.

```bash
Usuário> João
Bem-vindo, João!
```

O cliente pode agora enviar mensagens para o servidor:

```bash
Usuário> Olá, pessoal!
```

O servidor retransmite esta mensagem para todos os outros clientes conectados.

#### 3. **Comando "webcam" para Ativar a Webcam**

O cliente pode ativar a captura contínua de imagens da webcam a cada 1 segundo com o comando `webcam`:

```bash
Usuário> webcam
A webcam foi ligada!
```

O cliente começa a capturar imagens a cada 1 segundo, mas as imagens não são enviadas para o servidor. O cliente continua a capturar imagens em intervalos de 1 segundo.

#### 4. **Comando "foto" para Capturar uma Imagem Manualmente**

Se o cliente deseja capturar uma imagem manualmente, ele pode usar o comando `foto`. A imagem será capturada, mas não enviada ao servidor.

```bash
Usuário> foto
Imagem capturada, mas não enviada.
```

A imagem é apenas armazenada localmente no cliente e não é compartilhada com os outros usuários.

#### 5. **Comando "desligar" para Parar a Webcam**

O cliente pode interromper a captura contínua da webcam com o comando `desligar`:

```bash
Usuário> desligar
Desligando a webcam...
```

Agora, o cliente não está mais capturando imagens automaticamente.

#### 6. **Envio de Mensagens Durante a Captura de Imagens**

Durante a captura de imagens, o cliente pode continuar a interagir no chat. O servidor irá retransmitir as mensagens de texto para todos os outros clientes, independentemente de a webcam estar ativada.

```bash
Usuário> Como está todo mundo?
```

Os outros clientes veriam a mensagem, e o servidor retransmitiria para todos.

---

### Exemplo de Interação Completa

Aqui está um exemplo de uma conversa no chat enquanto a webcam está ativada e o cliente captura imagens:

```bash
Aguardando broadcast do servidor...
Servidor encontrado no endereço 192.168.0.10:3000
Conectado ao servidor!
Usuário> João
Bem-vindo, João!
Usuário> Olá, pessoal!
Servidor retransmite: <João> Olá, pessoal!
Usuário> webcam
A webcam foi ligada!
[Captura de imagens começa a ocorrer automaticamente a cada 1 segundo]
Usuário> foto
Imagem capturada, mas não enviada.
Usuário> Como está todo mundo?
Servidor retransmite: <João> Como está todo mundo?
[Captura de imagens continua ocorrendo em segundo plano]
Usuário> desligar
Desligando a webcam...
[Captura de imagens é interrompida]
```

---

## Funcionamento Detalhado

### **Comandos e Ações**

- **`webcam`**: Inicia a captura contínua de imagens pela webcam. A cada 1 segundo, uma nova imagem será capturada. Essa captura não é enviada ao servidor, mas pode ser armazenada localmente ou utilizada conforme necessário.
- **`foto`**: Captura uma imagem uma única vez. Essa imagem também não é enviada ao servidor, mas pode ser armazenada ou exibida localmente.
- **`desligar`**: Desliga a captura contínua da webcam, interrompendo o ciclo de captura a cada 1 segundo.
- **Envio de Mensagens**: O cliente pode enviar mensagens a qualquer momento. As mensagens são enviadas para o servidor e retransmitidas a todos os outros clientes.

### **Comportamento do Servidor**

- O servidor recebe e retransmite as mensagens de texto para todos os clientes conectados.
- O servidor não lida com as imagens da webcam. A captura de imagens é uma funcionalidade local do cliente, sem interação com o servidor.

---

## Conclusão

Este sistema permite uma interação dinâmica entre os clientes, com a capacidade de conversar em tempo real e realizar capturas de imagens da webcam. A captura contínua de imagens pode ser ativada e desativada conforme a necessidade, enquanto o servidor apenas gerencia as mensagens de texto e a conexão entre os clientes.

A combinação de comunicação em tempo real com o envio de imagens localmente fornece uma base para expandir este sistema, como incluir envio de imagens ao servidor ou permitir que os clientes compartilhem suas capturas de webcam.
