import socket from "socket.io-client";

const io = socket("http://localhost:3000");

export default io;