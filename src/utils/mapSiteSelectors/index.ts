import { JSONObject } from 'puppeteer'

export interface ISelectors {
  title: string
  image: string
  price: string
  priceHasCents?: boolean
  description: string
  url?: string
}

interface IMapSelectors {
  [siteHost: string]: JSONObject & ISelectors
}

export const mapSitesSelectors: IMapSelectors = {
  'amazon.com.br': {
    title: '#productTitle',
    image: '#main-image-container ul.list li.selected img',
    price: '.a-price .a-offscreen',
    priceHasCents: true,
    description: '#productDescription p',
    url: '',
  },
}
