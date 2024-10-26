"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./utils/types");
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const client = new types_1.CustomClient();

const config = require('./config.json');
const TOKEN = config.token;

const commands = [];

// Load commands
const commandFiles = fs_1.default
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  commands.push(command.data);
}

// Load events
const eventsFiles = fs_1.default
  .readdirSync("./events")
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
for (const file of eventsFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) =>
    __awaiter(void 0, void 0, void 0, function* () {
      event.execute(client, ...args);
    }),
  );
}

// Load selects
const selectsFiles = fs_1.default
  .readdirSync("./selects")
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
for (const file of selectsFiles) {
  const select = require(`./selects/${file}`);
  client.selects.set(select.name, select);
}

// Load buttons
const buttonsFiles = fs_1.default
  .readdirSync("./buttons")
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
for (const file of buttonsFiles) {
  const button = require(`./buttons/${file}`);
  client.buttons.set(button.name, button);
}

// register slash commands
const rest = new discord_js_1.REST().setToken(TOKEN);
client.once("ready", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield rest.put(discord_js_1.Routes.applicationCommands(client.user.id), {
      body: commands,
    });
    console.log(
      `Bot is online! ${
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.username
      }`,
    );
    console.log("Code by WL2 STORE");
    console.log("discord.gg/wl2");
  }),
);

client.login(TOKEN);
