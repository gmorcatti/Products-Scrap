import { Product } from '../../../src/modules/products/entities/productEntity'
import { IScrapRepository } from '../../../src/modules/products/repositories/Interfaces/IScrapRepository'
import { formatCurrencyToNumber } from '../../../src/utils/currency/formatCurrencyToNumber'
import { ISelectors } from '../../../src/utils/mapSiteSelectors'

export class MockScrapRepository implements IScrapRepository {
  async scrapProduct (url: string): Promise<Product> {
    const productInfo = mockInfo[url]

    const treatedProduct = {
      ...productInfo,
      price: formatCurrencyToNumber(productInfo.price),
    }

    return treatedProduct as unknown as Product
  }
}

const mockInfo : {
  [site: string]: ISelectors
} = {
  'https://www.amazon.com.br/Novo-Echo-Dot-4ª-geração/dp/B084DWCZY6/ref=sr_1_3': {
    title: 'Echo Dot (4ª Geração): Smart Speaker com Alexa - Cor Preta',
    description: '',
    url: 'https://www.amazon.com.br/Novo-Echo-Dot-4ª-geração/dp/B084DWCZY6/ref=sr_1_3',
    image: 'https://m.media-amazon.com/images/I/61gufBsGK7L._AC_SX425_.jpg',
    price: '379.05',
  },
  'https://www.amazon.com.br/Computador-IntelCore-500GB-Windows-Wi-Fi/dp/B08WJHZBKM/ref=sr_1_1_sspa': {
    title: 'Computador IntelCore i5, 3,2G, com HMDI, 500GB, Windows 10 e Wi-Fi',
    description: 'INFO HERTZ INFORMATICA PROMOÇÃO COMPUTADOR CORE I5  SUPER CPU DESKTOP WIFI PLACA MÃE H61M PROCESSADOR I5 INTEL MEMORIA 8GB HD 500GB, GABINETE ATX COM FONTE, WIFI USB  NÃO PERCA A OPORTUNIDADE PLACA MÃE H61M FOXCON PROCESSADOR CORE I5 QUAD CORE INTEL MEMORIA 8GB DO TAMANHO TOTAL HD 500GB DE MUITO ESPAÇO PARA VOCÊ GABINETE COM FONTE USB WIFI NÃO PERCA ESSA OPORTUNIDADE',
    url: 'https://www.amazon.com.br/Computador-IntelCore-500GB-Windows-Wi-Fi/dp/B08WJHZBKM/ref=sr_1_1_sspa',
    image: 'https://m.media-amazon.com/images/I/41-c3JqqJrL._AC_SY355_.jpg',
    price: '1659.95',
  },

}
