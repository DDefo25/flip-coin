#!/usr/bin/env node

const process = require('node:process');
const path = require("path");
const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const param = yargs(hideBin(process.argv))
	.option("p", {
		alias: "path",
		type: "string",
		describe: "путь до файла логов",
	})
	.demandOption("path", "Укажите путь до файла логов для работы с этим пакетом")
	.help().argv;

const logPath = path.join(param.path + ".json");

fs.readFile(logPath, (err, dataJSON) => {
	if (err) throw err;
	const analysed = analyse(JSON.parse(dataJSON));
	console.log(`
    Общее количество партий: ${analysed.gamesTotal}
    Количество выигранных/проигранных партий: ${analysed.win}/${analysed.loss}
    Процентное соотношение выигранных партий: ${analysed.winRatio}%
    `);
});

const analyse = (arr) => {
	const gamesTotal = arr.length;
	const win = arr.filter((el) => el.guess).length;
	const loss = arr.filter((el) => !el.guess).length;
	return {
		gamesTotal,
		win,
		loss,
		winRatio: (win / gamesTotal) * 100,
	};
};
