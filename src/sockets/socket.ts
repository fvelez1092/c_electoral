import {io} from '../app';
// Mensajes de Sockets
io.on('connection', (client:any) => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload:any) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });

    });


});
