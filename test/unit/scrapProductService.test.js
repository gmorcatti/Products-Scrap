const { describe, it, expect } = require('@jest/globals')

const { AppError } = require('../../src/config/errors/AppError')

const { Cache } = require('../../src/modules/products/cache/productsCache')

const { ScrapProductService } = require('../../src/modules/products/services/ScrapProductService')

const { inMemoryMockDatabase } = require('../mocks/database')

const { MockDatabaseRepository } = require('../mocks/repositories/databaseRepository')
const { MockScrapRepository } = require('../mocks/repositories/scrapRepository')

const mockScrapRepository = new MockScrapRepository()
const mockDatabaseRepository = new MockDatabaseRepository()

const scrapProductService = new ScrapProductService(mockScrapRepository, mockDatabaseRepository)

describe('Unit - ScrapProductService', () => {
  it('Should return the product info', async () => {
    const productUrl = 'https://www.amazon.com.br/Novo-Echo-Dot-4ª-geração/dp/B084DWCZY6/ref=sr_1_3'
    const productInfo = await scrapProductService.execute(productUrl)

    expect(productInfo).toStrictEqual({
      title: 'Echo Dot (4ª Geração): Smart Speaker com Alexa - Cor Preta',
      description: '',
      url: 'https://www.amazon.com.br/Novo-Echo-Dot-4ª-geração/dp/B084DWCZY6/ref=sr_1_3',
      image: 'https://m.media-amazon.com/images/I/61gufBsGK7L._AC_SX425_.jpg',
      price: 379.05,
      requestType: 'Scrap',
    })
  })

  it('Should throw an error that the URL was not informed', async () => {
    try {
      await scrapProductService.execute()
    } catch (error) {
      expect(error instanceof AppError).toBe(true)
      expect(error.message).toBe('The URL parameter was not informed.')
    }
  })

  it('Should throw an error that the URL was malformed', async () => {
    try {
      const malformedUrl = 'www.amazon.com.br/Novo-Echo-Dot-4%C2%AA-gera%C3%A7%C3%A3o/dp/B084DWCZY6/ref=sr_1_3'
      await scrapProductService.execute(malformedUrl)
    } catch (error) {
      expect(error instanceof AppError).toBe(true)
      expect(error.message).toBe("The URL parameter informed is malformed (insert the 'http://' or 'https://')")
    }
  })

  it('Should throw an error that the website is not accepted', async () => {
    try {
      const invalidUrl = 'https://produto.mercadolivre.com.br/MLB-2164695456-airfryer-fritadeira-eletrica-sem-oleo-multilaser-4l-127220v-_JM#reco_item_pos=2&reco_backend=promotions-sorted-by-score-mlb-A&reco_backend_type=low_level&reco_client=home_seller-promotions-recommendations&reco_id=721b31e3-44f0-4af8-b88c-ca133ade7d6d&c_id=/home/promotions-recommendations/element&c_element_order=3&c_uid=ed9bb75b-1508-4677-bdbd-b998a9f8336b'
      await scrapProductService.execute(invalidUrl)
    } catch (error) {
      expect(error instanceof AppError).toBe(true)
      expect(error.message).toBe("The website 'produto.mercadolivre.com.br' is not accepted in this API request yet")
    }
  })

  it('Should get the product inserted in cache memory', async () => {
    const alreadyInsertedUrl = 'https://www.amazon.com.br/Novo-Echo-Dot-4ª-geração/dp/B084DWCZY6/ref=sr_1_3'
    const productInfo = await scrapProductService.execute(alreadyInsertedUrl)

    expect(productInfo.requestType).toBe('Cache')
  })

  it('Should get the product inserted in database when cache memory is clean', async () => {
    const cacheInstance = Cache.getInstance()
    cacheInstance.cleanAll()

    const alreadyInsertedUrl = 'https://www.amazon.com.br/Novo-Echo-Dot-4ª-geração/dp/B084DWCZY6/ref=sr_1_3'
    const productInfo = await scrapProductService.execute(alreadyInsertedUrl)

    expect(productInfo.requestType).toBe('Database')
  })

  it('Should scrap the product when it is expired', async () => {
    const cacheInstance = Cache.getInstance()
    cacheInstance.cleanAll()

    const productUrl = 'https://www.amazon.com.br/Novo-Echo-Dot-4ª-geração/dp/B084DWCZY6/ref=sr_1_3'

    const moreThanOneHourAgo = new Date(2020, 2, 30)

    inMemoryMockDatabase.product = [{
      title: 'Echo Dot (4ª Geração): Smart Speaker com Alexa - Cor Preta',
      description: '',
      url: 'https://www.amazon.com.br/Novo-Echo-Dot-4ª-geração/dp/B084DWCZY6/ref=sr_1_3',
      image: 'https://m.media-amazon.com/images/I/61gufBsGK7L._AC_SX425_.jpg',
      price: 379.05,
      updated_at: moreThanOneHourAgo,
    }]

    const productInfo = await scrapProductService.execute(productUrl)

    expect(productInfo.requestType).toBe('Scrap')
  })
})
