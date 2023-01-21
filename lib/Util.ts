/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Util Class
class Util {
  public static get = async (url: string): Promise<string> =>
    await(await fetch(url, {
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "max-age=0",
        "If-Modified-Since": "Thu, 17 Oct 2019 07:18:26 GMT",
        "If-None-Match": "\"3147526947\"",
        "Sec-CH-UA": "\"Not_A Brand\";v=\"99\", \"Brave\";v=\"109\", \"Chromium\";v=\"109\"",
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Sec-GPC": "1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
      }
    })).text();
}

export default Util;