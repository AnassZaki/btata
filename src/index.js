const DISCORD = require("discord.js");
const BOT = new DISCORD.Client();
const BOT_PREFIX = "$"

// TODO: add an .env file for tokens and keys.
const TOKEN = 'Njk4MTcyOTA5NDY1ODk1MDMz.XpGJbw.eIU6ZgFx6vPpEehtoM_ApV3F3Vk';

BOT.on('ready', () => {
    console.log(`Logged in as ${BOT.user.tag}!`);
});

BOT.on("message", async (msg) => {
    let commands = msg.content.substr(BOT_PREFIX.length).split(" ");
    let vc = msg.member.voice.channel;

    switch (commands[0]) {
        case "join":
            if (msg.member.voice.channel) {
                const connection = await vc.join().catch(err => console.log(err));
                const dispatcher = connection.playFile("./audio/test.mp3")
                dispatcher.on("start", () => {
                    console.log("Started playing the song!")
                })
                dispatcher.on("finish", () => {
                    console.log("Finished playing the song!")
                })
            } else {
                msg.reply('You need to join a voice channel first!');
            }
            break;
        case "leave":
            vc.leave()
            break;
        case "clear":
            if(!commands[1]) return msg.reply("Please provide a number");
            msg.channel.bulkDelete(commands[1])
            break;
        default:
            break;
    }
});

BOT.login(TOKEN);
