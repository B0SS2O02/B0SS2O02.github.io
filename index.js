const { spawn } = require('child_process')
const fs = require('fs')

function alarm (soundFile) {
  while (true) {
    const mpg123 = spawn('mpg123', [soundFile])

    mpg123.on('close', () => {
      console.log('Sound finished playing')
    })
  }
}

const logger = text => {
  fs.promises.appendFile(
    'log.txt',
    `[${new Date().toLocaleString()}]${JSON.stringify(text)}\n`
  )
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

const sleep = second => {
  return new Promise(resolve => setTimeout(resolve, second * 1000))
}

const runPeriodically = async () => {
  try {
    while (true) {
      if (await main()) {
        break
      }
      await sleep(9)
    }
    alarm('sound.mp3')
  } catch (error) {
    runPeriodically()
  }
}

runPeriodically()
