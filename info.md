# prettify-bot usage

* [Code parsing](#code-parsing)
  * [Codeblocks](#codeblocks)
  * [Flags](#flags)
  * [By message ID](#by-message-id)
* [Commands](#commands)

## Code parsing

prettify-bot's main purpose is to prettify users' code and upload it to hastebin.

It will look for messages that have code in them and mention prettify-bot itself.

The code must be embedded in a proper multiline codeblock. Position of the mention in the message doesn't matter, nor does the total amount of codeblocks in it.

Here is an example:

![](https://i.imgur.com/IbCUvv6.png)

### Codeblocks

To embed a codeblock in your message, use triple backticks, like so:

```
```language (for example, `js` or `javascript` for JavaScript)
// Your code
// goes here...```
```

The above codeblock will look like this (assuming the first line was replaced with just `js`):

![](https://i.imgur.com/SGM5rAa.png)

### Flags

You can alter the way prettify-bot will process your message using flags.

Here's a list of currently available flags:

* `no-prettify` - prettify-bot will not prettify your code, only upload it to hastebin

Flags must directly follow the mention in your message and be lowercase, like so:

```
@prettify no-prettify
```js
// your code```
```

### By message ID

You can make prettify-bot parse another message without reposting the code from that message again. To do that, just mention the bot, with ID of the target message following the mention:

```
@prettify 411940859282456576 no-prettify
```

Flags are also available here, as you can see.

To be able to copy IDs of messages by right-clicking them, you must enable Developer Mode in `Settings > Appearance > Advanced > Developer Mode`.

## Commands

prettify-bot doesn't have a bit variety of commands, as of now only two are available: `info` and `source`.

Command prefix is the mention of prettify-bot itself:

```
@prettify info
```