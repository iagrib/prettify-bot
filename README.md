# prettify-bot, v1.2

prettify-bot is a Discord bot that can prettify users' code and upload it to hastebin for them, all they need to do is send the code in a codeblock and mention the bot in the same message!

## about this branch

v1.2 implements a basic protection from abuse of this bot by spamming codeblocks. this obviously won't guarantee full spam protection, but is a nice addition to having abusers manually blacklisted.

this branch will be merged into `master` once it's finished, tested and proven to be stable. as of now, it's not tested: might not work, might have bugs.

## showcase

![](https://i.imgur.com/IbCUvv6.png)

see [info.md](https://github.com/iagrib/prettify-bot/blob/master/info.md) for a complete list of prettify-bot features (and usage guide!).

## todo

* add prettify support for more languages

## official invite link

https://discordapp.com/oauth2/authorize?client_id=409800693927641098&scope=bot

(not guaranteed to run 24/7 as of now. you can try self-hosting it, though!)

you can also join [this server](https://discord.gg/VJryeSb) and try interacting with prettify-bot yourself.

## self-hosting

if you're going to host prettify-bot yourself, after cloning/downloading the repo don't forget to create a `config.json` file in `/parts` directory with the following contents:
```json
{
	"token": "your.token.here",
	"mmax": 4,
	"lmax": 10,
	"lreset": 60000,
	"lms": 60000
}
```
`token` is your bot token;
`mmax` is the maximum amount of codeblocks per message;
`lmax`, `lreset` and `lms` are values used for the cooldown system (see [limits.js](https://github.com/iagrib/prettify-bot/blob/v1.2/parts/limits.js) or just leave the default values if you don't understand what's happening there).

## license info

```
	Copyright 2018 Ia_grib

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		 http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
```