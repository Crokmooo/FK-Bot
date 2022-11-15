const Discord = require('discord.js');
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});
const prefix = ".";

var http = require('http');
http.createServer(function(req, res) {
    res.write("I'm alive");
    res.end();
}).listen(8080);



Client.on("ready", () => {
    console.log("I am ready!");
    let activities = [`cuisine.`, `On fait des Lasagnes`, `au Saumon`, `avec du grouyère`],
        i = 0;
    setInterval(() => Client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "STREAMING", url: "https://www.youtube.com/watch?v=DWcJFNfaw9c" }), 5000)

});

Client.on("guildMemberAdd", _member => {
    console.log("Un mec vient d'arriver !");
});

Client.on("guildMemberRemove", _member => {
    console.log("Un mec vient de partir !");
});

Client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.content === prefix + "info") {
        const embed = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setAuthor("FK Bot - Fait par Crokmoo", "https://cdn.discordapp.com/avatars/379330646352461838/586703227bed5e04824d7c844c7bdfb9.png?size=4096", "https://youtube.com")
            .setTitle("Modpack FK moddé V2")
            .setURL("https://www.curseforge.com/minecraft/modpacks/dragonniums-pack/files")

        .setDescription("Salut voici ci dessous le lien de téléchargement du Modpack pour jouer à la V2 de notre serveur moddé")

        .addField("ModPack V2 :", "https://www.curseforge.com/minecraft/modpacks/dragonniums-pack/files")



        .addField("Pack Maker : Crokmoo", "Crokmoo est le premier Développeur du Modpack et Fondateur de la FK")
            .addField("Second Pack Maker / Responsable Curseforge : Lynx", "Lynx est le responsable du modpack sur Curseforge, second Pack Maker et Admin de la FK")

        .setThumbnail("https://image.noelshack.com/fichiers/2022/17/2/1650989446-fk-orange-violet.png")
            .setTimestamp()
            .setFooter("FK Bot")
            .setImage("https://64.media.tumblr.com/226484df357757565ded83f4155a58b2/a8722eb9de3c75be-6b/s1280x1920/b04a69782f5ebf233191a4bdf6eef7020393f65c.gif");

        message.channel.send({ embeds: [embed] });
    }

});

Client.login(process.env.TOKEN);