#!/usr/bin/env node

const process = require('node:process');
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const readline = require("readline");

const Log = require("./Log");
const Flip = require("./Flip");

const param = yargs(hideBin(process.argv))
	.option("n", {
		alias: "name",
		type: "string",
		describe: "имя файла логов",
	})
	.demandOption("name", "Укажите имя файлов логов для работы с этим пакетом")
	.help().argv;

const flip = new Flip();
const log = new Log(param.name);

const { stdin: input, stdout: output } = process;
const rl = readline.createInterface({ input, output });

rl.write(`Монета подброшена. Угадай 1 или 2 \n`);
rl.prompt();
rl.on("line", (input) => {
	if (+input !== 1 && +input != 2) {
		console.log("Введите 1 или 2");
	} else {
		const attempt = flip.guessing(+input);
		console.log(attempt.str + "\n" + "Давай ещё раз. Монета подброшена");
		log.add(attempt);
	}
	rl.prompt();
}).on("close", () => {
	console.log("До скорой встречи!");
	process.exit(0);
});
