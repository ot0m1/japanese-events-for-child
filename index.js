#!/usr/bin/env node

class Main {
  async run() {
    this.displayFirstMessage()
    const birth = await this.getBirthNumber()
    const birthYear = parseInt(birth.substr(0, 4))
    const birthMonth = parseInt(birth.substr(4, 2))
    const birthDay = parseInt(birth.substr(6, 2))
    const gender = await this.getGender()
    let eventsDate = this.getEventsDate(birthYear, birthMonth, birthDay, gender)
    this.displayLastMessage()

    Object.keys(eventsDate).forEach(function(key) {
      console.log(key.padEnd(12, '　'), this[key].toLocaleDateString({ timeZone: 'Asia/Tokyo' }))
    }, eventsDate)
  }

  getEventsDate(birthYear, birthMonth, birthDay, gender) {
    this.eventdate = new EventDate(birthYear, birthMonth, birthDay)
    let eventsDate = {}
    eventsDate['お誕生日'] = this.eventdate.getBirth()
    eventsDate['お食い初め'] = this.eventdate.getOkuizome()
    eventsDate['ハーフバースデー'] = this.eventdate.getHalfBirth()
    if (gender == '男の子') {
      eventsDate['お宮参り'] = this.eventdate.getOmiyamairiForBoy()
      eventsDate['初節句'] = this.eventdate.getSekku()
      eventsDate['七五三（５才）'] = this.eventdate.getSichigosanForFive()
      } else if (gender == '女の子') {
      eventsDate['お宮参り'] = this.eventdate.getOmiyamairiForGirl()
      eventsDate['桃の節句'] = this.eventdate.getMomonosekku()
      eventsDate['七五三（３才）'] = this.eventdate.getSichigosanForThree()
      eventsDate['七五三（７才）'] = this.eventdate.getSichigosanForSeven()
    } else if (gender == '回答しない') {
      eventsDate['お宮参り（男の子）'] = this.eventdate.getOmiyamairiForBoy()
      eventsDate['お宮参り（女の子）'] = this.eventdate.getOmiyamairiForGirl()
      eventsDate['桃の節句（女の子）'] = this.eventdate.getMomonosekku()
      eventsDate['初節句（男の子）'] = this.eventdate.getSekku()
      eventsDate['七五三（３才 女の子）'] = this.eventdate.getSichigosanForThree()
      eventsDate['七五三（５才 男の子）'] = this.eventdate.getSichigosanForFive()
      eventsDate['七五三（７才 女の子）'] = this.eventdate.getSichigosanForSeven()
    }
    eventsDate['小学校入学'] = this.eventdate.getElementarySchool()
    return eventsDate
  }

  displayFirstMessage() {
    console.log('\n' +
    '--------------------------------------------------------\n' +
    '                                                        \n' +
    '     🎂  子供の誕生日から行事の日付を計算します 🎂      \n' +
    '                                                        \n' +
    '--------------------------------------------------------\n' +
    '\n')
  }

  displayLastMessage() {
    console.log('\n' +
    '--------------------------------------------------------\n' +
    '            👶 誕生日から行事を計算しました！           \n' +
    '--------------------------------------------------------\n' )
  }

  async getBirthNumber() {
    const { Input } = require('enquirer')
    const input = new Input({
      name: 'birthDay',
      message: '誕生日を入力してください:',
      initial: '20220101'
    })
    const birth = await input.run()
    return birth
  }

  async getGender() {
    const { Select } = require ('enquirer')
    const select = new Select({
        message: 'お子さんの性別を選んでください',
        choices: ['男の子', '女の子', '回答しない']
      })
    const gender = await select.run()
    return gender
  }
}

class EventDate {
  constructor(birthYear, birthMonth, birthDay) {
    this.birthYear = birthYear
    this.birthMonth = birthMonth
    this.birthDay = birthDay
  }

  getBirth() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay)
  }

  getHalfBirth() {
    return new Date(this.birthYear, this.birthMonth + 5, this.birthDay)
  }

  getOkuizome() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay + 99)
  }

  getOmiyamairiForBoy() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay + 30)  
  }

  getOmiyamairiForGirl() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay + 31)  
  }

  getMomonosekku() {
    if(this.getBirth() > new Date(this.birthYear, 3, 3)) {
      return new Date(this.birthYear + 1, 3, 3)
    } else {
      return new Date(this.birthYear, 3, 3)
    }
  }

  getSekku() {
    if(this.getBirth() > new Date(this.birthYear, 5, 5)) {
      return new Date(this.birthYear + 1, 4, 5)
    } else {
      return new Date(this.birthYear, 4, 5)
    }
  }

  getSichigosanForThree() {
    if(this.getBirth() > new Date(this.birthYear, 10, 15)) {
      return new Date(this.birthYear + 4, 9, 15)
    } else {
      return new Date(this.birthYear + 3, 9, 15)
    }
  }

  getSichigosanForFive() {
    if(this.getBirth() > new Date(this.birthYear, 10, 15)) {
      return new Date(this.birthYear + 6, 9, 15)
    } else {
      return new Date(this.birthYear + 5, 9, 15)
    }
  }

  getSichigosanForSeven() {
    if(this.getBirth() > new Date(this.birthYear, 10, 15)) {
      return new Date(this.birthYear + 8, 9, 15)
    } else {
      return new Date(this.birthYear + 7, 9, 15)
    }
  }

  getElementarySchool() {
    if(this.getBirth() > new Date(this.birthYear, 4, 1)) {
      return new Date(this.birthYear + 7, 3, 1)
    } else {
      return new Date(this.birthYear + 6, 3, 1)
    }
  }
} 

new Main().run()
