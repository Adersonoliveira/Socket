import threading
import socket

clients = {}  

def broadcast_discovery(port):
    """Envia broadcasts para que os clientes descubram a porta do servidor."""
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as broadcaster:
        broadcaster.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        message = f"DISCOVER:{port}".encode("utf-8")
        while True:
            broadcaster.sendto(message, ("<broadcast>", 9999))
            threading.Event().wait(2)  


def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        server.bind(('0.0.0.0', 0))  
        server.listen()
        port = server.getsockname()[1]
        print(f"Servidor iniciado na porta {port}...")

        threading.Thread(target=broadcast_discovery, args=(port,), daemon=True).start()

    except Exception as e:
        return print(f"\nNão foi possível iniciar o servidor! Erro: {e}\n")

    while True:
        client, addr = server.accept()
        clients[client] = addr
        print(f"Cliente conectado: {addr}")
        showConnectedClients()

        threading.Thread(target=messagesTreatment, args=[client]).start()


def messagesTreatment(client):
    while True:
        try:
            msg = client.recv(2048)
            if not msg:
                raise Exception("Cliente desconectado")
            broadcast(msg, client)
        except:
            deleteClient(client)
            break


def broadcast(msg, client):
    for client_item in clients:
        if client_item != client:
            try:
                client_item.send(msg)
            except:
                deleteClient(client_item)


def deleteClient(client):
    addr = clients[client]
    print(f"Cliente desconectado: {addr}")
    clients.pop(client)
    client.close()
    showConnectedClients()


def showConnectedClients():
    print("\nClientes conectados:")
    for client, addr in clients.items():
        print(f"Endereço: {addr}")
    print()


main()
