import { JSONObject } from 'puppeteer'

export interface ISelectors {
  [title: string]: string
  image: string
  price: string
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
    description: '#productDescription p',
    url: '',
  },
  'americanas.com.br': {
    title: '.product-title__Title-sc-1hlrxcw-0',
    image: '.main-image__Container-sc-1i1hq2n-1 .src__LazyImage-sc-xr9q25-0',
    price: '.priceSales',
    description: '.src__SpecsCell-sc-70o4ee-5',
    url: '',
  },
  'submarino.com.br': {
    title: 'h1.src__Title-sc-1xq3hsd-0',
    image: 'div.image__WrapperImages-sc-oakrdw-1 img',
    price: '.priceSales',
    description: '.product-description__Description-sc-ytj6zc-1',
    url: '',
  },
}
