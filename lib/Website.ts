/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Dependencies
import { Util, Flags } from "@lib";

// Types
import { DrainerType, TBadStrings, TScriptReport, TFlags } from "@types";

// Constants
const SCRIPT_REGEX = /<script[^>]*src=["']([^"']+)["'][^>]*>/g;

const BAD_STRINGS: TBadStrings = {
  [ DrainerType.GENERIC ]: [ "class Drainer extends Configuration", "Drainer()", "new seaport" ],
  [ DrainerType.SEAPORT ]: [ "SeaportABI", "exports.SeaportABI", "CROSS_CHAIN_SEAPORT_ADDRESS" ],
  [ DrainerType.MONKEY ]: [ "to_seaport_drainer" ]
};

// Website Class
class Website {
  private readonly url: URL;
  
  private html: string | null = null;

  constructor(url: string) {
    this.url = new URL(url);
  }

  private getScripts = (): string[] => 
    Array.from(
      new Set(((this.html!.match(SCRIPT_REGEX) || [ ])
          .map((item: string) => item.split("src=\"")[1].split("\"")[0])
      ))
    );

  private isBadScript = async ({ href: url }: URL): Promise<TScriptReport> => {
    const content = await Util.get(url), 
          results: Record<string, number> = { };

    for(const [ name, strings ] of Object.entries(BAD_STRINGS)) {
      if(!results[name])
        results[name] = 0;

      for(const string of strings) 
        results[name] += (content.match(new RegExp(string, "gi")) || [ ]).length;
    }

    return { url, results };
  }

  public getFlags = async (): Promise<TFlags> => ({
    isMonkeyDrainer: await Flags.isMonkeyDrainer(this.url.origin),
    isHTTrack: Flags.isHTTrack(this.html!),
    isInvalidMeta: Flags.isInvalidMeta(this.html!, this.url.host),
    isFakeMint: Flags.isFakeMint(this.html!)
  });

  public analyze = async (): Promise<any> => {
    if(!this.html)
      this.html = await Util.get(this.url.href);

    const scripts = await Promise.all(this.getScripts().map((script: string) => this.isBadScript(new URL(script, this.url)))),
          drainers = [ ], urls = [ ];

    for(const { url, results } of scripts) {
      for(const result of Object.keys(results)) {
        if(!results[result])
          continue;
          
        drainers.push(result);
        urls.push(url);
      }
    } 

    return {
      flags: await this.getFlags(),
      results: {
        drainers: Array.from(new Set(drainers)), 
        urls: Array.from(new Set(urls))
      }
    };
  }
}

export default Website;