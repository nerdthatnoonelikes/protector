import { Listener } from "discord-akairo";
import { GuildMember, MessageEmbed, Message } from "discord.js";
import { getVerificationRole } from "../utils/GetVerificationRole";
import axios from "axios";

export default class guildMemberAdd extends Listener {
  public constructor() {
    super("guildMemberAdd", {
      emitter: "client",
      event: "guildMemberAdd",
      category: "client",
    });
  }
  public async exec(member: GuildMember): Promise<void> {
    const role = await getVerificationRole(member.guild.id);
    const botUser = member.guild.members.fetch(this.client.user.id);
    if (role === null) {
      return;
    } else {
      axios
        .get("https://api.no-api-key.com/api/v2/captcha")
        .then(async (res) => {
          console.log(res.data.captcha_text);
          try {
            const msg = await member.send(
              new MessageEmbed()
                .setTitle(`Solve the captcha for ${member.guild.name}`)
                .setImage(res.data.captcha)
            );

            const filter = (m: Message) => {
              return m.author.id === member.id;
            };

            msg.channel
              .awaitMessages(filter, {
                max: 1,
                time: 15000,
                errors: ["time"],
              })
              .then(async (collected) => {
                if (collected.first().content === res.data.captcha_text) {
                  msg.channel.send("You have answered the captcha correctly!");
                  member.roles.add(role);
                } else {
                  msg.channel.send(
                    "You have answered the captcha incorrectly!\nYou need to leave and rejoin the guild for another try at verifying yourself."
                  );
                  if ((await botUser).hasPermission("KICK_MEMBERS"))
                    member.kick();
                }
              });
          } catch (err) {
            console.log(err);
          }
        });
    }
  }
}
