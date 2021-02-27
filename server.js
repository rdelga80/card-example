const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const faker = require('faker')

const app = express()

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', ws => {
  ws.isAlive = true

  ws.on('pong', () => {
    ws.isAlive = true
  })

  ws.on('message', message => {
    console.log(`received ${message}`)

    let count = 0

    const sendInterval = setInterval(() => {
      const currentDate = new Date(2021, 1, 26)

      const games = [...Array(3000)].map((_, i) => ({
        id: i,
        teams: {
          home: `Home ${i}`,
          away: `Away ${i}`
        },
        dateString: currentDate.toLocaleDateString(),
        moneyLine: i !== 5 ? faker.random.number({ min: -500, max: 500 }) : 40,
        homeLine: i !== 5 ? faker.random.number({ min: -500, max: 500 }) : 100,
        awayLine: i !== 5 ? faker.random.number({ min: -500, max: 500 }) : 200
      }))

      console.log(`sending ${count}`)
      ws.send(JSON.stringify(games))
      count++

      if (count > 50) {
        clearInterval(sendInterval)
        ws.terminate()
      }
    }, 3000)
  })

  ws.send('Hi there, I am a Websocket server')
})

server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port}`)
})
