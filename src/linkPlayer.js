const play = (connection, msg, ytdl) => {
    let server = servers[msg.guild.id];
    server.dispatcher = connection.playStream(ytdl(server.queue[0], { filter: "audioonly" }));

    server.queue.shift();

    server.dispatcher.on("end", () => {
        if (server.queue[0]) { play(connectionm, msg) } else { connection.disconnect(); }
    })
};