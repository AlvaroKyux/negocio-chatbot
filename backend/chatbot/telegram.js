const TelegramBot = require("node-telegram-bot-api");
const conectarDB = require("./db");
const Producto = require("./models/Producto");
const Order = require("./models/Order");

// 👇 Reemplaza con tu token real
const token = "7533231007:AAGDs_LI-uS04lKwGZ9lKPEGH93VyE9irFY";
const bot = new TelegramBot(token, { polling: true });

(async () => {
  await conectarDB();
  console.log("✅ Bot de Telegram conectado y MongoDB listo");
})();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `👋 ¡Hola! Soy Chilltech Bot. Puedes escribir:
  - "productos" para ver la lista
  - "precio de [producto]" para consultar el precio
  - "pago" para ver métodos de pago
  - "pedir "[producto]" [cantidad]" para hacer un pedido 🛒`
  );
});

bot.on("message", async (msg) => {
  const texto = msg.text?.toLowerCase() || "";
  const chatId = msg.chat.id;

  if (texto.includes("productos")) {
    const productos = await Producto.find();
    if (!productos.length) {
      return bot.sendMessage(chatId, "😔 No hay productos disponibles.");
    }

    let respuesta = "📦 Productos disponibles:\n\n";
    productos.forEach((p, i) => {
      respuesta += `${i + 1}. ${p.nombre} (Modelo ${p.modelo}) - $${
        p.precio
      } MXN - Stock: ${p.cantidad}\n`;
    });

    return bot.sendMessage(chatId, respuesta);
  }

  if (texto.includes("precio de")) {
    const partes = texto.split("precio de");
    const palabraClave = partes[1]?.trim();

    if (!palabraClave) {
      return bot.sendMessage(chatId, "Por favor, dime el nombre del producto.");
    }

    const producto = await Producto.findOne({
      $or: [
        { nombre: new RegExp(palabraClave, "i") },
        { modelo: new RegExp(palabraClave, "i") },
      ],
    });

    if (producto) {
      return bot.sendMessage(
        chatId,
        `🧾 Producto: ${producto.nombre}\nModelo: ${producto.modelo}\nPrecio: $${producto.precio} MXN\nStock: ${producto.cantidad}`
      );
    } else {
      return bot.sendMessage(
        chatId,
        `❌ No encontré el producto "${palabraClave}".`
      );
    }
  }

  if (texto.includes("pago")) {
    return bot.sendMessage(
      chatId,
      `✅ Aceptamos estos métodos de pago:\n- Efectivo\n- Transferencia\n- Tarjeta`
    );
  }

  if (texto.startsWith("pedir")) {
    
    const regex = /pedir\s+"(.+?)"\s+(\d+)/;
    const match = texto.match(regex);

    if (!match) {
      return bot.sendMessage(
        chatId,
        '❌ Usa el formato: pedir "[nombre del producto]" [cantidad]'
      );
    }

    const nombreProducto = match[1]; 
    const cantidad = parseInt(match[2]);

    if (isNaN(cantidad) || cantidad <= 0) {
      return bot.sendMessage(chatId, "❌ Cantidad inválida.");
    }

    const producto = await Producto.findOne({
      nombre: new RegExp(`^${nombreProducto}$`, "i"),
    });

    if (!producto) {
      return bot.sendMessage(
        chatId,
        `❌ Producto "${nombreProducto}" no encontrado.`
      );
    }

    if (producto.cantidad < cantidad) {
      return bot.sendMessage(
        chatId,
        `❌ No hay suficiente stock. Disponible: ${producto.cantidad}`
      );
    }

    const total = producto.precio * cantidad;

    const nuevaOrden = new Order({
      cliente: `${msg.from.first_name} ${msg.from.last_name || ""}`.trim(),
      producto: producto.nombre,
      cantidad,
      total,
    });

    await nuevaOrden.save();

    producto.cantidad -= cantidad;
    await producto.save();

    return bot.sendMessage(
      chatId,
      `✅ Pedido registrado:\n📦 Producto: ${producto.nombre}\n📦 Cantidad: ${cantidad}\n💵 Total: $${total} MXN`
    );
  }
});
