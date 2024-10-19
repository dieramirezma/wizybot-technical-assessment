import { Injectable } from '@nestjs/common';
import { ExchangeRates } from 'src/currency/interfaces/exchange-rates.interface';

@Injectable()
export class CurrencyService {
  // Get the latest exchange rates from the Open Exchange Rates API as an object
  async getLatestExchangeRates(): Promise<ExchangeRates> {
    try {
      const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATES_APP_ID}`)

      const data = await response.json()

      // Return only the rates object
      return data.rates
    } catch (error) {
      console.error('Error:', error)
      return {};
    }
  }

  // Convert currencies
  async convertCurrencies(amount: number, fromCurrency: string, toCurrency: string): Promise<number | undefined> {
    // Get the latest exchange rates as an object
    const exchangeRates: ExchangeRates = await this.getLatestExchangeRates()

    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      // Get the exchange rate for the two currencies
      const exchangeRate = Number(exchangeRates[toCurrency]) / Number(exchangeRates[fromCurrency])
      return amount * exchangeRate
    }
  }
}
