/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 * 
 * TODO: Refactoring - this could do with some heavy refactoring.
 */

// Dependencies
import { Website } from "@lib";

// Variables
const [ url ] = Deno.args;

if(!url) {
  console.log(`[x] Please provide a URL!`);

  Deno.exit();
}

const website = new Website(url);

const { flags, results } = await website.analyze();

console.log(`[x] === Analysis of ${url} ===\n`);

console.log(`[x] === Flags ===`);
for(const flag of Object.keys(flags))
  console.log(`[x] ${flag}: ${flags[flag]}`);

console.log(`\n[x] === Results ===`); 

console.log(`[x] Drainer(s): ${results.drainers.join(", ")}`);
console.log(`[x] Offending URLs: ${results.urls.join(", ")}`);