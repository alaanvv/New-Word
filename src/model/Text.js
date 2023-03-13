const db = require('../../db/conn')

class Text {
  constructor(username, text) {
    this.username = username
    this.text = text
    this.errors = []
  }

  async post() {
    this.validate()
    if (this.errors.length) return
    
    const user = await db.cmd(`select * from texts where text = '${this.text}';`)
    if (user[0]) {
      this.errors.push(`This text belongs to ${user[0].username}`)
      await db.cmd(`update users set points = points - 1 where username = '${this.username}';`)
      return
    }

    await db.cmd(`insert into texts values ('${this.username}', '${this.text}');`)
    await db.cmd(`update users set points = points + 1 where username = '${this.username}';`)
  }

  async validate() {
    if (this.text.length > 10) this.errors.push('It can have only 10 characters')
  }
}

module.exports = Text