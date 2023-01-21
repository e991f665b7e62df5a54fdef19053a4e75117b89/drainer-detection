/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Constants
const HTTRACK_HEADERS: string[] = [ "Mirrored from", "HTTrack Website Copier" ];
const META_REGEX = /<meta.*(http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+).*>/g;
const FAKE_MINT_STRINGS = [ "ʏᴏᴜ'ᴠᴇ ʙᴇᴇɴ ᴡʜɪᴛᴇʟɪꜱᴛᴇᴅ ᴛᴏ ʟɪᴍɪᴛᴇᴅ ꜰʀᴇᴇ ᴍɪɴᴛ", "𝐂𝐋𝐈𝐂𝐊 𝐇𝐄𝐑𝐄 𝐓𝐎 𝐌𝐈𝐍𝐓!",  "𝐏𝐫𝐢𝐜𝐞: 𝐅𝐑𝐄𝐄" ];

// Flags Class
class Flags {
  public static isMonkeyDrainer = async (base_url: string): Promise<boolean> =>
    (await fetch(`${base_url}/moralis_key.json`)).status !== 404;

  public static isHTTrack = (html: string): boolean =>
    (HTTRACK_HEADERS
      .map((header: string) => html.indexOf(header) !== -1)
      .filter((value: boolean) => !!value)
    ).length > 0;

  public static isInvalidMeta = (html: string, host: string): boolean =>
    ((html.match(META_REGEX) || [ ]).map((item: string) => {
      const url = new URL(item.split("content=\"")[1].split("\"")[0]);

      return url.host === host;
    }).filter((item: boolean) => !!item)).length > 0;

  public static isFakeMint = (html: string): boolean => 
    (FAKE_MINT_STRINGS.map((string: string) => html.indexOf(string) !== -1).filter((item: boolean) => !!item) || [ ]).length > 0;
}

export default Flags;