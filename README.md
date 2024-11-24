# **Documentação do Sistema Socket**

## **Sumário**

1. [Visão Geral](#visao-geral)
2. [Instalação e Dependências](#instalacao-e-dependencias)
3. [Fluxo de Funcionamento](#fluxo-de-funcionamento)
   - [Descoberta do Servidor](#descoberta-do-servidor)
   - [Conexão e Interação com o Servidor](#conexao-e-interacao-com-o-servidor)
   - [Comandos Disponíveis](#comandos-disponiveis)
4. [Exemplo de Interação Completa](#exemplo-de-interacao-completa)
5. [Comportamento do Servidor](#comportamento-do-servidor)
6. [Considerações Finais](#consideracoes-finais)

---

## **Visão Geral**

Este sistema permite a comunicação em tempo real entre clientes via chat TCP, com funcionalidades adicionais para capturar imagens usando a webcam e controlar o movimento do mouse. O cliente pode interagir com o servidor enviando mensagens e executando comandos para ativar/desativar a webcam, inverter ou limitar o movimento do mouse, e até desligar o monitor. O servidor retransmite as mensagens de texto para todos os clientes conectados.

---

## **Instalação e Dependências**

### **Dependências Necessárias**

O código requer as seguintes dependências para funcionar corretamente:

1. **`node-webcam`**: Para capturar imagens via webcam.
   - Instalar com: `npm install node-webcam`
   
2. **`robotjs`**: Para controle do mouse (inverter ou limitar movimento).
   - Instalar com: `npm install robotjs`
   
3. **Bibliotecas nativas do Node.js**:
   - **`net`**: Para comunicação via TCP.
   - **`dgram`**: Para comunicação via UDP.
   - **`readline`**: Para leitura interativa via terminal.
   - **`child_process`**: Para execução de comandos do sistema operacional.

### **Instalação do Projeto**

1. Clone o repositório ou baixe os arquivos do projeto.
2. Execute o comando abaixo para instalar as dependências:

   ```bash
   npm install node-webcam robotjs
   ```

---

## **Fluxo de Funcionamento**

### **1. Descoberta do Servidor**

O cliente começa em um modo de espera, aguardando o servidor se apresentar via broadcast UDP. Quando o servidor envia um pacote de broadcast com sua porta, o cliente se conecta automaticamente ao servidor via TCP.

```bash
Aguardando broadcast do servidor...
Servidor encontrado no endereço 192.168.0.10:3000
Conectado ao servidor!
```

### **2. Conexão e Interação com o Servidor**

Após a conexão estabelecida, o cliente solicita um nome de usuário e começa a enviar mensagens ao servidor. O servidor retransmite essas mensagens para todos os outros clientes conectados.

```bash
Usuário> João
Bem-vindo, João!
```

### **3. Comandos Disponíveis**

O cliente pode interagir com a webcam e o mouse através de uma série de comandos. Veja a descrição de cada comando abaixo:

#### **Comando `webcam`**

Ativa a captura contínua de imagens da webcam a cada 1 segundo. A captura não é enviada ao servidor, apenas é feita localmente.

```bash
Usuário> webcam
A webcam foi ligada!
```

#### **Comando `foto`**

Captura uma imagem manualmente. Esta imagem não é enviada ao servidor.

```bash
Usuário> foto
Imagem capturada, mas não enviada.
```

#### **Comando `desligar`**

Desliga a captura contínua da webcam, interrompendo a captura a cada 1 segundo.

```bash
Usuário> desligar
Desligando a webcam...
```

#### **Comando `invert_mouse`**

Inverte o movimento do mouse. A cada movimento do mouse, ele será redirecionado para o lado oposto da tela.

```bash
Usuário> invert_mouse
Movimento do mouse foi invertido!
```

#### **Comando `limit_mouse`**

Limita o movimento do mouse a uma área específica da tela. O cliente deve definir os limites da área.

```bash
Usuário> limit_mouse
Movimento do mouse está limitado a uma área específica!
```

#### **Comando `desliga_monitor`**

Desliga o monitor. O comando varia conforme o sistema operacional (Windows ou Linux).

```bash
Usuário> desliga_monitor
Monitor foi desligado!
```

---

## **Exemplo de Interação Completa**

Veja abaixo um exemplo de uma interação completa do cliente com o servidor enquanto a webcam está ativa e o mouse está invertido:

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
Usuário> invert_mouse
Movimento do mouse foi invertido!
Usuário> limit_mouse
Movimento do mouse está limitado a uma área específica!
Usuário> foto
Imagem capturada, mas não enviada.
Usuário> desliga_monitor
Monitor foi desligado!
```

---

## **Comportamento do Servidor**

O servidor tem a responsabilidade de:

1. **Receber mensagens de texto** dos clientes.
2. **Retransmitir as mensagens** para todos os clientes conectados.
3. **Não processar imagens** capturadas pela webcam; isso é feito localmente no cliente.

O servidor não interage com as capturas de imagens ou comandos de controle de dispositivos como o mouse e o monitor, pois essas ações são executadas localmente pelo cliente.

---

## **Considerações Finais**

Este sistema oferece uma solução simples, porém robusta, para comunicação entre clientes, com funcionalidades adicionais como captura de imagens pela webcam e controle do mouse. Ele permite:

- Conversas em tempo real.
- Captura contínua de imagens pela webcam, com a opção de captura manual.
- Controle avançado do movimento do mouse (invertido ou restrito a uma área).
- Desligamento do monitor para sistemas Windows e Linux.

Este sistema pode ser expandido para incluir funcionalidades como o envio de imagens ao servidor, bem como o compartilhamento de capturas de webcam entre os clientes.

---

### **Possíveis Melhorias**

- **Envio de Imagens**: Permitir que o cliente envie imagens capturadas ao servidor.
- **Segurança**: Implementação de autenticação para usuários e criptografia de mensagens.
- **Interface Gráfica**: Adicionar uma interface gráfica para facilitar a interação do usuário com a webcam e outras funcionalidades.

