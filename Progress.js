class Progress {
  constructor(possibleVariations) {
    this.possibleVariations = possibleVariations
    this.tries = 0
    this.percent
  }

  static clear () {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
  }

  print () {
    this.constructor.clear()
    process.stdout.write('Progress: ' + this.percent + '%')
  }

  update () {
    this.tries++
    let currPercent = Math.round(this.tries / this.possibleVariations * 100)

    if (this.percent !== currPercent) {
      this.percent = currPercent
      this.print(currPercent)
    }
  }
}

module.exports = Progress
