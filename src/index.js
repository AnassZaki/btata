const DISCORD = require("discord.js");
const ytdl = require("ytdl-core");
const BOT = new DISCORD.Client();
const BOT_PREFIX = "$";

let songs = {};

// TODO: add an .env file for tokens and keys.
const TOKEN = 'TOKEN';

BOT.on('ready', () => {
    console.log(`Logged in as ${BOT.user.tag}!`);
});

BOT.on("message", async (msg) => {
    let commands = msg.content.substr(BOT_PREFIX.length).split(" ");
    let vc = msg.member.voice.channel;

    switch (commands[0]) {
        case "play":
            function play(connection, msg) {
                let song = songs[msg.guild.id];

                song.dispatcher = connection.play(ytdl(song.queue[0], { filter: "audioonly" }));

                song.queue.shift();

                song.dispatcher.on("end", () => {
                    if (song.queue[0]) {
                        play(connectionm, msg)
                    } else {
                        connection.disconnect();
                    }
                });
            };

            if (!commands[1]) {
                msg.channel.send("Please provide a link!");
                return;
            }

            if (!msg.member.voice.channel) {
                msg.channel.send('You need to join a voice channel first!');
                return;
            }

            if (!songs[msg.guild.id]) songs[msg.guild.id] = {
                queue: []
            }

            let song = songs[msg.guild.id];

            song.queue.push(commands[1]);

            if (!msg.member.voice.connection) vc.join().then(function (connection) {
                play(connection, msg);
            });

            break;
        case "leave":
            vc.leave()
            break;
        case "clear":
            if (!commands[1]) return msg.reply("Please provide a number");
            msg.channel.bulkDelete(commands[1])
            break;
        default:
            break;
    }
});

BOT.login(TOKEN);
