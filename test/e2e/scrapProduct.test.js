require('express-async-errors')

const { describe, it, expect } = require('@jest/globals')
const request = require('supertest')

const { Database } = require('../../src/config/database')
const app = require('../../src/server')

const database = Database.getInstance(true)

// eslint-disable-next-line no-undef
jest.setTimeout(30000)

database.createAppDataSource()

describe('End To End - GET /scrap', () => {
  it('Should return the product info succesfully', async () => {
    const response = await request(app.default)
      .get('/scrap/?url=https://www.amazon.com.br/Novo-Echo-Dot-4%C2%AA-gera%C3%A7%C3%A3o/dp/B084DWCZY6/ref=sr_1_3?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91%26crid=10ZVMMI1OEPW%26keywords=alexa%26qid=1648584790%26sprefix=a%2Caps%2C375%26sr=8-3%26ufe=app_do%3Aamzn1.fos.95de73c3-5dda-43a7-bd1f-63af03b14751')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      title: 'Echo Dot (4ª Geração): Smart Speaker com Alexa - Cor Preta',
      description: '',
      url: 'https://www.amazon.com.br/Novo-Echo-Dot-4ª-geração/dp/B084DWCZY6/ref=sr_1_3',
      image: 'https://m.media-amazon.com/images/I/61gufBsGK7L._AC_SX425_.jpg',
      price: 379.05,
      requestType: 'Scrap',
    })
  })

  it('Should throw an error that the URL is malformed', async () => {
    const response = await request(app.default)
      .get('/scrap/?url=www.amazon.com.br/Novo-Echo-Dot-4%C2%AA-gera%C3%A7%C3%A3o/dp/B084DWCZY6/ref=sr_1_3?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91%26crid=10ZVMMI1OEPW%26keywords=alexa%26qid=1648584790%26sprefix=a%2Caps%2C375%26sr=8-3%26ufe=app_do%3Aamzn1.fos.95de73c3-5dda-43a7-bd1f-63af03b14751')

    expect(response.statusCode).toBe(400)
    expect(response.body).toStrictEqual({
      message: "The URL parameter informed is malformed (insert the 'http://' or 'https://')",
    })
  })

  it('Should throw an error that the URL was not informed', async () => {
    const response = await request(app.default)
      .get('/scrap')

    expect(response.statusCode).toBe(400)
    expect(response.body).toStrictEqual({
      message: 'The URL parameter was not informed.',
    })
  })
})
