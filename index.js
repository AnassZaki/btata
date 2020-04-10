const DISCORD = require("discord.js");
const BOT = new DISCORD.Client();

// TODO: add an .env file for tokens and keys.
const token = 'Njk4MTcyOTA5NDY1ODk1MDMz.XpCI0w.aWZRyFszY_3B4PEO7RPEWnejMO0';

BOT.on("ready", () => {
    console.log("Btata is ready!")
});

BOT.login(token);


