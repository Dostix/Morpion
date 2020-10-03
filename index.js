const Discord = require('discord.js');
const bot = new Discord.Client();
const { prefix, token } = require('./config.json');

const reacNbr = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
const choice = [" O  "," X  ",reacNbr]
var leboard
var turnplayer , player = 1 ,fini = false,inprogress = false


bot.on('message', message => {

    //ajout reaction 1 a 9
    if(message.author.username.toString() ==="tic tac toe test" && message.author.bot && message.content.includes("----------------__**Fake Morpion**__---------------")){
        for (let i = 0 ; i<9 ; i++){
            message.react(reacNbr[i])
        }
    }
    //ajout reaction Oui Non
    if(message.author.username.toString() ==="tic tac toe test" && message.author.bot && message.content.includes("souhaite vous défier")){
        message.react('✅').then(r => {
            message.react('❌');
        });
        lastTag = message.mentions.users.last()
        firstTag = message.mentions.users.first()

        //verif le clique sur reaction
        message.awaitReactions((reaction,user ) => user.id === lastTag.id && (reaction.emoji.name === '✅' || reaction.emoji.name === '❌'),
            { max: 1, time: 30000 }).then(collected => {

            if (collected.first().emoji.name === '✅') {

                message.channel.send(firstTag.toString() +" VS "+lastTag.toString())
                message.channel.send(board(lastTag.username))

            }
            if (collected.first().emoji.name === '❌'){
                message.channel.send(firstTag.toString()+' Defis annulé');
                inprogress = false;
            }
        }).catch(() => {
            message.channel.send(firstTag.toString()+' aucune reponse defis annulé');
            inprogress = false;
        });

    }
    //verif si message envoyé par le bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    // verif le .morpion
    if (command === `morpion`) {

        if (!args.length) {
            return message.channel.send(`Choisi un adversaire !`);
        }
        else {
            if (message.author.toString() !== message.mentions.users.first().toString()){
                if(inprogress === false ) {
                    reset()
                    inprogress = true;

                    const taggedUser = message.mentions.users.first();

                    message.channel.send(message.author.toString() + " souhaite vous défier " + taggedUser.toString())
                }
                else {
                    message.channel.send("Une partie est déjà en cours")
                }

            }else{
                message.channel.send("Defis une autre personne que toi même é_è")
            }
        }
    }


})

//verif des reaction sur le 1 a 9
bot.on('messageReactionAdd', (reaction, user) => {
    let modif = 0;
    let message = reaction.message, emoji = reaction.emoji;

    if(( !user.bot &&  user.username === lastTag.username )|| (!user.bot && user.username === firstTag.username)){

        turnplayer = [firstTag ,lastTag ]
        if (fini !== true){
            if ( turnplayer[player].username === user.username){
                for (let index in reacNbr) {
                    if (emoji.name.toString() === reacNbr[index]) {

                        switch (index) {
                            case '0':
                                if (leboard[0] === "1️⃣") {
                                    leboard[0] = choice[player]
                                    modif = 1;
                                }
                                break;
                            case '1':
                                if (leboard[1] === "2️⃣") {
                                    leboard[1] = choice[player]
                                    modif = 1;
                                }
                                break;
                            case '2':
                                if (leboard[2] === "3️⃣") {
                                    leboard[2] = choice[player]
                                    modif = 1;
                                }
                                break;
                            case '3':
                                if (leboard[3] === "4️⃣") {
                                    leboard[3] = choice[player]
                                    modif = 1;
                                }
                                break;
                            case '4':
                                if (leboard[4] === "5️⃣") {
                                    leboard[4] = choice[player]
                                    modif = 1;
                                }
                                break;
                            case '5':
                                if (leboard[5] ==="6️⃣") {
                                    leboard[5] = choice[player]
                                    modif = 1;
                                }
                                break;
                            case '6':
                                if (leboard[6] === "7️⃣") {
                                    leboard[6] = choice[player]
                                    modif = 1;
                                }
                                break;
                            case '7':
                                if (leboard[7] === "8️⃣") {
                                    leboard[7] = choice[player]
                                    modif = 1;
                                }
                                break;
                            case '8':
                                if (leboard[8] ==="9️⃣") {
                                    leboard[8] = choice[player]
                                    modif = 1;
                                }
                                break;

                        }
                        if ( modif === 1) {

                            player++
                            player = player % 2;
                            message.edit(board(turnplayer[player].username))
                            if (win() === true){
                                fini = true
                                player++
                                player = player % 2
                                message.edit(board(" "+turnplayer[player].username +" win"))
                                message.channel.send(turnplayer[player].toString()+' est le vainqueur !');
                                inprogress = false
                            }
                        }


                    }
                }
            }
        }
    }
});


function board (joueur) {
    inprogress = true;
    let plateau = '----------------__**Fake Morpion**__--------------- \n' +
        '-----------------------------------------------  \n' +
        '|                       |                        |                        |\n' +
        '|        ' + leboard[0] + '         |         ' + leboard[1] + '         |         ' + leboard[2]+ '         |\n' +
        '|                       |                        |                        |\n' +
        '-----------------------------------------------  \n' +
        '|                       |                        |                        |\n' +
        '|        ' + leboard[3]+ '         |         ' + leboard[4]+ '         |         ' + leboard[5] + '         |\n' +
        '|                       |                        |                        |\n' +
        '----------------------------------------------- \n' +
        '|                       |                        |                        |\n' +
        '|        ' + leboard[6] + '         |         ' +leboard[7] + '         |         ' + leboard[8] + '         |\n' +
        '|                       |                        |                        |\n' +
        '-----------------------------------------------\n' +
        'Joueur :'+ joueur;
    return plateau;
}

function win() {
    let solution =
        [[leboard[0], leboard[1], leboard[2]],
            [leboard[3], leboard[4], leboard[5]],
            [leboard[6], leboard[7], leboard[8]],
            [leboard[0], leboard[3], leboard[6]],
            [leboard[1], leboard[4], leboard[7]],
            [leboard[2], leboard[5], leboard[8]],
            [leboard[0], leboard[4], leboard[8]],
            [leboard[6], leboard[4], leboard[2]]
        ]
    for (let index in solution) {
        if (troisequal( solution[index][0],solution[index][1],solution[index][2]) === true){
            return true
        }
    }
}

function troisequal(a,b,c) {

    return a===b && b===c && a=== c
}

function reset() {
    leboard = [choice[2][0],choice[2][1],choice[2][2],choice[2][3],choice[2][4],choice[2][5],choice[2][6],choice[2][7],choice[2][8]]
    player = 1
    fini = false
}
bot.login(token)


