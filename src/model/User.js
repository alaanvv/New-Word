const db = require('../../db/conn')

class User {
  constructor(query) {
    this.username = query.username
    this.email = query.email
    this.password = query.password
    this.errors = []
  }

  async login() {
    this.validate()
    if (this.errors.length) return this.errors = ['Email or password wrong']
    
    const res = await db.cmd(`select * from users where email = '${this.email}' and password = '${this.password}';`)
    if (!res[0]) return this.errors = ['Account doesnt exist']
    
    this.username = res[0].username
  }

  async register() {
    this.validate()
    if (!this.username) this.errors.push('Username required')
    const usersWithSameUsername = await db.cmd(`select * from users where username = '${this.username}'`)
    const usersWithSameEmail = await db.cmd(`select * from users where email = '${this.email}'`)
    if (usersWithSameUsername.length) this.errors.push('Username already in use')
    if (usersWithSameEmail.length) this.errors.push('Email already in use')
    if (this.errors.length) return

    await db.cmd(`insert into users values('${this.username}', '${this.email}', '${this.password}', 0);`)
  }

  validate() {
    if (this.username) {
      const usernameRegex =  /.{3,50}/
      if (!usernameRegex.test(this.username)) this.errors.push('Username need to have at least 3 characters and less than 50')
    }
    
    const emailRegex =  /^([\w\d_\.\-])+\@(([\w\d\-])+\.)+([\w\d]{2,4})+$/i
    if (!emailRegex.test(this.email)) this.errors.push('Invalid email')

    const passwordRegex =  /.{3,50}/
    if (!passwordRegex.test(this.password)) this.errors.push('Password need to have at least 3 characters and less than 50')
    if (/'/.test(this.password)) this.errors.push('You can not use " \' " in your password')
  }
}

module.exports = User