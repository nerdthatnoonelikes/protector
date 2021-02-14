import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { getVerificationRole } from "../../utils/GetVerificationRole";

export default class SettingsCommand extends Command {
  public constructor() {
    super("settings", {
      aliases: ["settings"],
      description: {
        content: "see the settings of the server",
      },
      category: "Misc",
    });
  }

  public async exec(message: Message): Promise<void> {
    const role = await getVerificationRole(message.guild.id);

    message.util.send(
      new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Settings for ${message.guild.name}`)
        .addField(
          "Verified Role",
          role ? `<@&${role}>` : "No Verified Role Set"
        )
    );
  }
}
