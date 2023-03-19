class Flip {
	constructor() {
		this.min = 1;
		this.max = 2;
		this.flip = null;
	}
  
	flipping() {
		this.flip = Math.floor(
			this.min + (this.max - this.min + 1) * Math.random()
		);
	}
  
	reset() {
		this._ = null;
	}
  
	guessing(num) {
		this.flipping();
		let result;
		if (this.flip === num) {
			result = {
				guess: true,
				str: `угадал`,
			};
		} else {
			result = {
				guess: false,
				str: `не угадал`,
			};
		}
		this.reset();
		return result;
	}
}
  
module.exports = Flip;
  