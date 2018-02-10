# prettify-bot, v1.1

prettify-bot is a Discord bot that can prettify users' code and upload it to hastebin for them, all they need to do is send the code in a codeblock and mention the bot in the same message!

## about this branch

version 1.1 of prettify-bot will these new features:

* **flags** such as `no-prettify` that allow you to alter how the bot will process your message
* ability to request parsing of **another message** by specifying its id
* small **fixes and improvements** of already existing features
* and other cool stuff!

this branch will be merged into `master` once it's finished, tested and proven to be stable.

## showcase

![](https://i.imgur.com/IbCUvv6.png)

generated hastebin links:


https://hastebin.com/yusepapida.js

https://hastebin.com/vusejogoyi.lua

https://hastebin.com/limepicaru.css

https://hastebin.com/qizemicave.lua

## todo

* add prettify support for more languages

## official invite link

https://discordapp.com/api/oauth2/authorize?client_id=409800693927641098&permissions=0&scope=bot

(not guaranteed to run 24/7 as of now. you can try self-hosting it, though!)

## self-hosting

if you're going to host prettify-bot yourself, after cloning/downloading the repo don't forget to create a `token.json` file in `/parts` directory with the following contents:
```json
{"token": "your.token.here"}
```

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
