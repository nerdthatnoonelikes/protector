import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class PingCommand extends Command {
  public constructor() {
    super("ping", {
      aliases: ["ping"],
      description: {
        content: "pong",
      },
      category: "Misc",
    });
  }

  public exec(message: Message): void {
    message.util.send(`Pong! ${this.client.ws.ping}ms`);
  }
}
