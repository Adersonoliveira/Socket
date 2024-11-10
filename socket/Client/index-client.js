const net = require('net');
const readline = require('readline');
const NodeWebcam = require('node-webcam');

// Configuração para entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Configurações da câmera
const webcamOpts = {
    width: 640,
    height: 480,
    quality: 100,
    delay: 0,
    saveShots: false,
    output: "jpeg",
    device: false,
    callbackReturn: "base64",  // Retorna a imagem em base64
    verbose: false
};

// Cria a instância da câmera
const Webcam = NodeWebcam.create(webcamOpts);

function main() {
    const client = new net.Socket();

    client.connect(7777, 'localhost', () => {
        console.log('Conectado ao servidor!');
        
        rl.question('Usuário> ', (username) => {
            console.log(`Bem-vindo, ${username}!`);

            // Escuta mensagens do servidor
            client.on('data', (data) => {
                console.log(data.toString());
            });

            // Envia mensagens ou imagens ao servidor
            rl.on('line', (input) => {
                if (input.trim().toLowerCase() === 'foto') {
                    // Captura a imagem quando o comando 'foto' é digitado
                    Webcam.capture("captura", (err, data) => {
                        if (err) {
                            console.error("Erro ao capturar a imagem:", err);
                        } else {
                            console.log("Imagem capturada e enviada!");
                            client.write(`<${username}> [Imagem em Base64]: ${data}`);
                        }
                    });
                } else {
                    // Envia texto normal
                    client.write(`<${username}> ${input}`);
                }
            });
        });
    });

    client.on('error', (err) => {
        console.error('Não foi possível se conectar ao servidor:', err.message);
        client.destroy();
    });

    client.on('close', () => {
        console.log('Conexão encerrada');
        rl.close();
    });
}

main();
