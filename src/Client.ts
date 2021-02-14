import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { Message, Intents } from "discord.js";
import { token, owner } from "../config";
import { join } from "path";

interface BotOptions {
  token: string;
  owner: string;
}

export default class ProtectorClient extends AkairoClient {
  public config;
  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, "commands"),
    prefix: "p!",
    allowMention: true,
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 3e5,
    argumentDefaults: {
      prompt: {
        modifyStart: (_: Message, str: string): string =>
          `${str}\n\nType \`cancel\` to cancel the command...`,
        modifyRetry: (_: Message, str: string): string =>
          `${str}\n\nType \`cancel\` to cancel the command...`,
        timeout: "You took too long, the command has been cancelled.",
        ended:
          "You exceeded the maximum amount of tries, the command has been cancelled.",
        cancel: "This command has been cancelled.",
        retries: 3,
        time: 3e4,
      },
      otherwise: "",
    },
    defaultCooldown: 1500,
  });

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, "listeners"),
  });

  public constructor(options: BotOptions) {
    super({
      ownerID: options.owner,
      ws: { intents: [Intents.ALL] },
    });
    this.config = options;
  }

  private async _init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process,
    });

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  public async start(): Promise<string> {
    await this._init();
    return this.login(this.config.token);
  }
}
