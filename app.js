require("dotenv").config()
const lg = require("./libs/log")
const Slimbot = require("slimbot")

let inline_keyboard = [
    [
        {text: "front_corridor", callback_data: `fc`},
        {text: "laboratory", callback_data: "lab"}
    ],
    [
        {text: "central b turr", callback_data: `cbt`}
    ],

]


class BotHandler {

    constructor() {
        this.slimbot = new Slimbot(process.env.TELEGRAM_BOT_TOKEN);

        this.slimbot.startPolling();

        this.handle()
    }

    inlineHandler = (message) => {

        lg.debug("inlineHandler", JSON.stringify(message))
    }

    callbackHandler = (query) => {
        lg.debug("callbackHandler", JSON.stringify(query))

        this.slimbot.editMessageText(query.message.chat.id, query.message["message_id"], query.data, {
            parse_mode: "Markdownv2",
            reply_markup: JSON.stringify({inline_keyboard})
        })
    }

    messageHandler = (message) => {
        lg.debug(JSON.stringify(message))
        let res = ""
        switch (message.text) {
            case "/help":
                res = "use the force, Luke"
                break
            case "/map":
                res = `
                \`\`\`
_____________________┏AB━━━━━━━━┳AB2━━━━━┓______
_____________________┃          ┃        ┃______
__________________CAT┫          ┃        ┣RAT___
__________________┃  ┃          ┃        ┃  ┃___
__________________┃  |          |        |  ┃___
____FAT┳━┳HG━━━┳FS┻━-╋-┳-━━┳━-AD╋-┳━━━━┳-┻-━┻━━┓
____┃  ┃ ┃     ┃     ┃ ┃   ┃    | |    |      ┏┛
____┃  | ┃     ┃     ┃ ┃   ┃    ┃ ┃    ┃      ┃_
_┏━━┻━-┫ ┃     ┃     ┃ ┣CAS┻┓   ┃ ┣━RAS┫      ┗┓
_┃     ┃ ┃     |     ┃ ┃    ┣━━━┫ ┃____┃      _┃
┏┛     ┃ ┗━━━━-┻-━━━━┫ ┃    ┃ . ┃ ┃____┃      ┏┛
┃    . | FC.         |C|  RF┃NX |R┃____┃      ┃_
┗┓     ┃ ┏━━━━-┳-━━━━┫C┃    ┃   ┃C┃____┃      ┗┓
_┃     ┃ ┃     |     ┃ ┃    ┣━━━┫ ┃____┃      _┃
_BRD┳━-┫ ┃     ┃     ┃ ┣CBS┳┛   ┃ ┣━RBS┫      ┏┛
____┃  | ┃     ┃     ┃ ┃   ┃    ┃ ┃    ┃      ┃_
____┃  ┃ ┃     ┃    @┃ ┃   ┃  . | |    |      ┗┓
____FBT┻━┻LAB━━┻ML┳━-╋-┻-━━┻━-BD┫ ┣━━━━┻-┳-━┳ER┛
__________________┃  |          ┃ ┃      |  ┃___
__________________┃  ┃          ┃ ┃      ┃  ┃___
__________________CBT┫          | |      ┣RBT___
_____________________┃          ┣━┫      ┃______
_____________________┗BB━━━━━━━━┛_┗IB━━━━┛______
\`\`\`
                `
                break
            case "/ship_list":
                res = "1, 2, 3, 4, 5"
                break
            case "/navigate":
                res = "navigate, please"
                break
            case "/room":
                res = "room examine"
                break
            default:
                res = "i'm do not understand you"
                break
        }
        if(message.text === "/map"){
            this.slimbot.sendMessage(message.from.id, res, {
                parse_mode: "Markdownv2",
                reply_markup: JSON.stringify({inline_keyboard})
            })
        }
        else if (res === "navigate, please") {
            this.slimbot.sendMessage(message.from.id, res, {
                parse_mode: "Markdownv2",
                reply_markup: JSON.stringify({inline_keyboard})
            })
        } else if (res === "room examine") {
            res = "items list:\n"
            res += `📹 camera \/usecamera \n`
            res += "🧼 soap \/pickupsoap \n"
            res += "🔫 bluster 3 \/fireblaster\n"
            this.slimbot.sendMessage(message.from.id, res, {
                parse_mode: "MarkdownV2",
                reply_markup: JSON.stringify({
                    keyboard: [["fire_bluster", "use_pickup"], ["/navigate", "/map"]],
                    resize_keyboard: true,
                    one_time_keyboard: true
                })
            })
        } else {
            this.slimbot.sendMessage(message.from.id, res, {parse_mode: "MarkdownV2"})

        }

    }

    handle = () => {
        this.slimbot.on('inline_query', this.inlineHandler)
        this.slimbot.on('callback_query', this.callbackHandler)
        this.slimbot.on('message', this.messageHandler)
    }

}

new BotHandler()
