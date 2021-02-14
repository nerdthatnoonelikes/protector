import { Command } from "discord-akairo";
import { Message, MessageEmbed, Role } from "discord.js";
import VerificationRole from "../../models/VerificationRole";

export default class PingCommand extends Command {
  public constructor() {
    super("setverificationrole", {
      aliases: ["setverificationrole", "setverifiedrole"],
      description: {
        content:
          "set the role to be given upon successful completion of the captcha",
      },
      category: "Configuration",
      args: [
        {
          id: "role",
          type: "role",
          prompt: {
            start: (msg: Message) => `${msg.author} please provide a role`,
            retry: (msg: Message) => `${msg.author} that is not a valid role`,
          },
        },
      ],
    });
  }

  public async exec(message: Message, { role }: { role: Role }) {
    const botUser = message.guild.members.fetch(this.client.user.id);

    const result = await VerificationRole.findOne({
      guildID: message.guild.id,
    });

    if (message.member.hasPermission("MANAGE_GUILD"))
      return message.util.send(
        "You need to have the `MANAGE_GUILD` permission to run this command"
      );

    if (
      role.position >=
      (await message.guild.members.fetch(this.client.user.id)).roles.highest
        .position
    )
      return message.util.send("That role is higher than the role I have!");

    if (!(await (await botUser).hasPermission("MANAGE_ROLES")))
      return message.util.send(
        ":warning: I do not have the `MANAGE_ROLES` Permission, without it I cannot assign roles!"
      );

    if (!result) {
      new VerificationRole({
        guildID: message.guild.id,
        role: role.id,
      }).save();
      message.util.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Role Set")
          .setDescription(
            `<@&${role.id}> will now be given to members who complete the captcha`
          )
      );
    } else {
      result.role = role.id;
      result.save();
      message.util.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Role Updated")
          .setDescription(
            `<@&${role.id}> will now be given to members who complete the captcha`
          )
      );
    }
  }
}
