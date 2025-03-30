const TelegramBot = require('node-telegram-bot-api');
const conectarDB = require('./db');
const Producto = require('./models/Producto');

// 👇 Reemplaza con tu token real
const token = '7533231007:AAGDs_LI-uS04lKwGZ9lKPEGH93VyE9irFY';
const bot = new TelegramBot(token, { polling: true });

(async () => {
    await conectarDB();
    console.log('✅ Bot de Telegram conectado y MongoDB listo');
})();

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 ¡Hola! Soy Chilltech Bot. Escribe 'productos' para ver la lista o 'precio de [producto]' para consultar el precio.");
});

bot.on('message', async (msg) => {
    const texto = msg.text?.toLowerCase() || '';
    const chatId = msg.chat.id;

    if (texto.includes('productos')) {
        const productos = await Producto.find();
        if (!productos.length) {
            return bot.sendMessage(chatId, '😔 No hay productos disponibles.');
        }

        let respuesta = '📦 Productos disponibles:\n\n';
        productos.forEach((p, i) => {
            respuesta += `${i + 1}. ${p.nombre} (Modelo ${p.modelo}) - $${p.precio} MXN - Stock: ${p.cantidad}\n`;
        });

        return bot.sendMessage(chatId, respuesta);
    }

    if (texto.includes('precio de')) {
        const partes = texto.split('precio de');
        const palabraClave = partes[1]?.trim();

        if (!palabraClave) {
            return bot.sendMessage(chatId, 'Por favor, dime el nombre del producto.');
        }

        const producto = await Producto.findOne({
            $or: [
                { nombre: new RegExp(palabraClave, 'i') },
                { modelo: new RegExp(palabraClave, 'i') }
            ]
        });

        if (producto) {
            return bot.sendMessage(chatId,
                `🧾 Producto: ${producto.nombre}\nModelo: ${producto.modelo}\nPrecio: $${producto.precio} MXN\nStock: ${producto.cantidad}`);
        } else {
            return bot.sendMessage(chatId, `❌ No encontré el producto "${palabraClave}".`);
        }
    }

    if (texto.includes('pago')) {
        return bot.sendMessage(chatId,
            `✅ Aceptamos estos métodos de pago:\n- Efectivo\n- Transferencia\n- Tarjeta`);
    }
});
