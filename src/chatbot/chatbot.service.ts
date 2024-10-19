import { Injectable } from '@nestjs/common';
import { ExchangeRates } from '../currency/interfaces/exchange-rates.interface';
import { CurrencyService } from 'src/currency/currency.service';
import { CsvService } from 'src/csv/csv.service';
import { Product } from 'src/csv/interfaces/product.interface';
import OpenAI from 'openai';
import { EnquiryDto } from './dto/enquiry.dto';
import { plainToInstance } from 'class-transformer';
import { ProductSearchDto } from 'src/csv/dto/product-search.dto';
import { validate } from 'class-validator';
import { CurrencyConversionDto } from 'src/currency/dto/currency-conversion.dto';

@Injectable()
export class ChatbotService {
  private openai: OpenAI;

  constructor(
    private readonly csvService: CsvService,
    private readonly currencyService: CurrencyService
  ) {
    // Initialize OpenAI API
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  // Implementation of OpenAI Chat Completion API using Function Calling
  async openaiChatbotResponse(enquiry: EnquiryDto): Promise<string> {
    // Function descriptions for OpenAI API
    const tools: OpenAI.Chat.ChatCompletionTool[] = [
      {
        type: 'function',
        function: {
          name: 'searchProducts',
          description: 'Searches for products related to the query',
          parameters: {
            type: 'object',
            properties: {
              keyword: {
                type: 'string',
                description: 'Product search keyword'
              }
            },
            required: ['keyword'],
            additionalProperties: false
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'convertCurrencies',
          description: 'Converts an amount from one currency to another',
          parameters: {
            type: 'object',
            properties: {
              amount: {
                type: 'number',
                description: 'Amount to convert',
              },
              fromCurrency: {
                type: 'string',
                description: 'Currency to convert from (3-letter currency code)',
              },
              toCurrency: {
                type: 'string',
                description: 'Currency to convert to (3-letter currency code)',
              },
            },
            required: ['amount', 'fromCurrency', 'toCurrency'],
            additionalProperties: false,
          },
        }
      }
    ]

    // Messages to send to the OpenAI API
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: 'You are an AI Customer Support and Sales Agent. Use the supplied tools to assist the user.' },
      {
        role: 'user', content: `A user asks: ${enquiry.enquiry}.`
      }
    ]

    // Call the OpenAI API
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      tools: tools
    })

    const toolCall = response.choices[0].message.tool_calls

    let functionResponse: string

    console.log(toolCall)
    // Check if the tool call is valid
    if (!toolCall) {
      return response.choices[0].message.content;
    }

    // Desctructure the function name and arguments
    const { name, arguments: functionArguments } = toolCall[0].function

    functionResponse = await this.executeFunctions(name, functionArguments)

    // Call the OpenAI API with the function call result
    const final_response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user', content: `A user asks: ${enquiry.enquiry}. You have two functions available to assist the user: searchProducts and convertCurrencies. You chose to execute the function
          ${name}. The result was: ${functionResponse}. Formulate a final response.`
        },
      ]
    })

    return final_response.choices[0].message.content;
  }

  async executeFunctions(functionName: string, functionArguments: string): Promise<string> {
    // Variable to store the function response
    let functionResponse: string

    // Validate the function name and call the appropriate function
    if (functionName === 'searchProducts') {
      // Validate data using DTO
      const productSearchDto = plainToInstance(ProductSearchDto, JSON.parse(functionArguments));
      const errors = await validate(productSearchDto);

      if (errors.length > 0) {
        throw new Error('Validation failed for product search');
      }

      const { keyword } = productSearchDto
      const products: Product[] = this.csvService.searchProducts(keyword)

      // Convert the products array to a JSON string
      functionResponse = JSON.stringify(products)
    }

    if (functionName === 'convertCurrencies') {
      const currencyConversionDto = plainToInstance(CurrencyConversionDto, JSON.parse(functionArguments));
      const errors = await validate(currencyConversionDto);

      if (errors.length > 0) {
        throw new Error('Validation failed for currency conversion');
      }

      const { amount, fromCurrency, toCurrency } = currencyConversionDto
      const convertedAmount = await this.currencyService.convertCurrencies(amount, fromCurrency, toCurrency)

      // Convert the converted amount to a JSON string
      functionResponse = JSON.stringify(convertedAmount)
    }

    return functionResponse || ''
  }
}

