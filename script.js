const locations = {
  'Ak ýol': '120',
  Akjadepe: '107',
  Akjaguýma: '9',
  'Akmaýanyň ýoly': '112',
  Aksuw: '97',
  Akýaýla: '140',
  'Altyn asyr': '115',
  'Altyn köl': '110',
  'Altyn sährä': '30',
  Amyderýa: '64',
  Andalyp: '73',
  Arkaç: '80',
  Armansagat: '99',
  Artyk: '21',
  Arzuw: '121',
  Arçman: '14',
  Ata: '117',
  Atamyrat: '63',
  Awlamyş: '127',
  Azatlyk: '144',
  Aýdyň: '81',
  Aşgabat: '17',
  Babadurmaz: '98',
  Balguýy: '105',
  Balhana: '91',
  Balkanabat: '8',
  Bamy: '13',
  Baýramaly: '45',
  Belek: '6',
  Bereket: '10',
  Berkararlyk: '129',
  Boýnyuzyn: '51',
  Bugdaýly: '104',
  Burgun: '123',
  Burguçy: '143',
  Bäherden: '15',
  Darganata: '94',
  Daşköpri: '40',
  Daşoguz: '27',
  Daşrabat: '139',
  Duşak: '24',
  Däneata: '102',
  Dänew: '52',
  Dörtguýy: '69',
  Döwletýar: '103',
  Düýeli: '86',
  Etrek: '68',
  Farap: '50',
  Gabakly: '55',
  Galaýmor: '42',
  Galkynyş: '53',
  Garabekewül: '60',
  Garatengir: '82',
  Garawulguýy: '90',
  Garybata: '31',
  Gazojak: '57',
  Gowşut: '22',
  Goç: '78',
  Gulanly: '119',
  Gurbangala: '87',
  Guşa: '5',
  Gyzylarbat: '12',
  Gyzylgaýa: '126',
  Gäwers: '19',
  Gökdepe: '16',
  Gökdere: '125',
  Göksüýri: '101',
  Görogly: '28',
  Halaç: '62',
  Halkabat: '92',
  Hazar: '130',
  Isgender: '76',
  Içoguz: '71',
  Janahyr: '79',
  Jebel: '7',
  Kaka: '23',
  Kelete: '77',
  Kelif: '67',
  Kerki: '70',
  Kerkiçi: '138',
  Kerwen: '84',
  Kuwwat: '131',
  Köneürgenç: '25',
  Köýtendag: '66',
  Kükürtli: '93',
  Lawak: '26',
  Lebap: '95',
  Madow: '106',
  Mary: '32',
  Maslahat: '137',
  Maýski: '108',
  Mukry: '65',
  Oguzabat: '74',
  Oguzhan: '118',
  Owadandepe: '146',
  Parahat: '132',
  Pelwert: '61',
  Peski: '89',
  Polatly: '133',
  Repetek: '48',
  Ruhnama: '72',
  'RZD. 156': '145',
  Sandykgaçy: '38',
  Sarahs: '116',
  Saryýazy: '39',
  Sazakin: '96',
  Saýat: '59',
  Semenik: '33',
  Serhetabat: '44',
  Serhetýaka: '135',
  Seýdi: '54',
  Soltanbent: '36',
  Sähra: '109',
  Tagtabazar: '41',
  Tahiýataş: '111',
  Takyr: '100',
  Talhatanbaba: '34',
  Tejen: '29',
  Tellimerjen: '142',
  Türkmenabat: '49',
  Türkmenbaşy: '4',
  Uzboý: '124',
  Uzynsuw: '11',
  Ymambaba: '37',
  Ymamnazar: '141',
  Zarpçy: '136',
  Zerger: '58',
  Zähmet: '46',
  Änew: '18',
  Ärsarybaba: '128',
  Çemenibit: '43',
  Çigajy: '88',
  Üçaji: '47',
  Ýangaja: '83',
  Ýasga: '122',
  Ýaşlyk: '20',
  Ýerbent: '85',
  Ýolöten: '35',
  Şamülki: '113',
  Şanly: '134',
  Şasenem: '114',
  Şaumýan: '75'
}
const source = document.querySelector('#source')
const destination = document.querySelector('#destination')
const start = document.querySelector('#start')
const terminal = document.querySelector('.console')
let launch = false

for (const location in locations) {
  const text = `<option value="${locations[location]}">${location}</option>`
  source.innerHTML += text
  destination.innerHTML += text
}

const logger = text => {
  terminal.innerHTML += `<p>[${new Date().toLocaleString()}]${JSON.stringify(
    text
  )}</p>`
}

const main = async () => {
  const data = await fetch('https://railway.gov.tm/railway-api/trips', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/json',
      'sec-ch-ua':
        '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      cookie:
        '_ga=GA1.1.1585648548.1719330533; _ym_uid=1719330556168380790; _ym_d=1719330556; i18n_redirected=tm; _ym_isad=2; _ga_GX66NJH3T7=GS1.1.1722704308.2.1.1722705034.0.0.0; vuex=eyJ0cmlwIjp7InNlYXJjaCI6eyJ0cmlwVHlwZSI6IjEiLCJhZHVsdCI6MSwiY2hpbGQiOjAsImluZmFudCI6MCwic3JjSWQiOiIyNyIsImRlc3RJZCI6IjE3Iiwib3V0Ym91bmREYXRlIjoiMjAyNC0wOC0xOCIsImluYm91bmREYXRlIjoiIn0sIm91dGJvdW5kIjp7ImlkIjoiIiwid2Fnb25UeXBlSWQiOiIifSwiaW5ib3VuZCI6eyJpZCI6IiIsIndhZ29uVHlwZUlkIjoiIn19LCJwYXNzZW5nZXIiOnsiY29udGFjdFBob25lIjoiIiwiY29udGFjdEVtYWlsIjoiIiwicGFzc2VuZ2VycyI6W3siaWQiOjAuMTAyODM0NzM3MjM0OTk0MjYsImdlbmRlciI6IiIsIm5hbWUiOiIiLCJzdXJuYW1lIjoiIiwiYmlydGhEYXkiOiIiLCJiaXJ0aE1vbnRoIjoiIiwiYmlydGhZZWFyIjoiIiwidGFyaWZmIjoiIiwiaWRlbnRpdHlUeXBlIjoicGFzc3BvcnQiLCJpZGVudGl0eU51bWJlclByZWZpeCI6IiIsImlkZW50aXR5TnVtYmVyIjoiIiwiY292aWRDZXJ0IjoiIiwiYXZhemFDZXJ0IjoiIiwib3V0Ym91bmQiOm51bGwsImluYm91bmQiOm51bGx9XX19',
      Referer: 'https://railway.gov.tm/outbound',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    body: '{"source":"27","destination":"17","date":"2024-08-19","adult":1,"child":0}',
    method: 'POST'
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      logger(data)
      return data
    })
    .catch(err => {
      console.log(err)
      logger(err)
    })
  if (!data) {
    return true
  }
  if (!Object.keys(data).length) {
    return true
  }

  for (const trip of data.data.trips) {
    console.log(trip.wagon_types)
    if (trip.wagon_types.length) {
      return true
    }
    return false
  }
  return true
}

const buttonFunction = async () => {
  launch = !launch
  if (launch) {
    try {
      while (true) {
        if (await main()) {
          break
        }
        await sleep(9)
      }
    //   alarm('sound.mp3')
    } catch (error) {
      console.log(error)

      //   buttonFunction()
    }
  }
}

const sleep = second => {
  return new Promise(resolve => setTimeout(resolve, second * 1000))
}

start.addEventListener('click', buttonFunction)
