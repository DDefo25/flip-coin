const path = require("path");
const fs = require("fs");

class Log {
	constructor(logName) {
		this.logName = logName;
		this.ext = ".json";
		this.path = path.join("./logs/" + logName + this.ext);
		this.line = 0;

		fs.mkdir("./logs", { recursive: true }, (err) => {
			if (err) throw err;
		});
	}

	add(data) {
		if (typeof data !== "object") {
			throw new Error("Передан некорректный объект");
		}

		fs.readFile(
			this.path,
			{ encoding: "utf8", flag: "a+" },
			(err, dataFromLog) => {
				if (err) throw err;
				const logs = dataFromLog ? JSON.parse(dataFromLog) : [];
				logs.push(data);
				fs.writeFile(this.path, JSON.stringify(logs, null, 2), (err) => {
					if (err) throw err;
				});
			}
		);
	}

	clear() {
		fs.writeFile(this.path, "", (err) => {
			if (err) throw err;
		});
	}
}

module.exports = Log;
