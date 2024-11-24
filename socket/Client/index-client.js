const net = require('net');
const dgram = require('dgram');
const readline = require('readline');
const NodeWebcam = require('node-webcam');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const webcamOpts = {
    width: 640,
    height: 480,
    quality: 100,
    delay: 0,
    saveShots: false,
    output: "jpeg",
    device: false,
    callbackReturn: "base64", 
    verbose: false
};

const Webcam = NodeWebcam.create(webcamOpts);

let webcamInterval; 

function discoverServer(callback) {
    const client = dgram.createSocket('udp4');

    client.on('message', (message, rinfo) => {
        const data = message.toString();
        if (data.startsWith("DISCOVER:")) {
            const port = parseInt(data.split(":")[1], 10);
            console.log(`Servidor encontrado no endereço ${rinfo.address}:${port}`);
            client.close();
            callback(rinfo.address, port);
        }
    });

    client.bind(9999, () => {
        console.log("Aguardando broadcast do servidor...");
    });
}

function main() {
    discoverServer((host, port) => {
        const client = new net.Socket();

        client.connect(port, host, () => {
            console.log('Conectado ao servidor!');

            rl.question('Usuário> ', (username) => {
                console.log(`Bem-vindo, ${username}!`);

                client.on('data', (data) => {
                    console.log(data.toString());
                });

                rl.on('line', (input) => {
                    if (input.trim().toLowerCase() === 'foto') {
                        Webcam.capture("captura", (err, data) => {
                            if (err) {
                                console.error("Erro ao capturar a imagem:", err);
                            } else {
                                console.log("Imagem capturada, mas não enviada.");
                            }
                        });
                    } else if (input.trim().toLowerCase() === 'webcam') {
                        console.log("A webcam foi ligada!");
                        startWebcam();
                    } else if (input.trim().toLowerCase() === 'desligar') {
                        console.log("Desligando a webcam...");
                        stopWebcam();
                    } else {
                        client.write(`<${username}> ${input}`);
                    }
                });
            });
        });

        client.on('error', (err) => {
            console.error('Erro ao conectar ao servidor:', err.message);
            client.destroy();
        });

        client.on('close', () => {
            console.log('Conexão encerrada');
            rl.close();
        });
    });
}

function startWebcam() {
    // Inicia a captura da webcam em intervalos de 1 segundo
    webcamInterval = setInterval(() => {
        Webcam.capture("captura", (err, data) => {
            if (err) {
                console.error("Erro ao capturar a imagem da webcam:", err);
            } else {
                // Aqui você pode fazer algo com a imagem, se necessário
                // No caso, apenas mostramos no console (sem enviar para o servidor)
                // console.log("Imagem capturada da webcam, mas não enviada.");
            }
        });
    }, 1000); 
}

function stopWebcam() {
    if (webcamInterval) {
        clearInterval(webcamInterval);
        webcamInterval = null; 
        console.log("Webcam desligada.");
    } else {
        console.log("Webcam já está desligada.");
    }
}

main();
