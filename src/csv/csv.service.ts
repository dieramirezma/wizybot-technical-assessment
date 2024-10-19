import { Injectable } from '@nestjs/common';
import { Product } from 'src/csv/interfaces/product.interface';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class CsvService {
  private products: Product[] = [];

  constructor() {
    this.transformCsv();
  }

  /*
   * This method reads the csv file and transforms it into an array of Product objects
  */
  private transformCsv(): void {
    fs.createReadStream('data/products_list.csv')
      .pipe(csv())
      .on('data', (row: Product) => this.products.push(row))
      .on('end', () => {
        console.log('Finish transforming csv file');
      })
  }

  /*
   * This method searches for products based on a keyword.
   * keyword is a parameter given by the AI chatbot
  */
  searchProducts(keyword: string): Product[] {
    // Convert the keyword to lowercase for easier search
    const lowerCaseKeyword = keyword.toLowerCase();

    /*
     * Filter the products array based on the keyword
     * Only return products that contain the keyword in the following fields:
     * displayTitle, embeddingText and productType
    */

    const filteredProducts = this.products.filter((product) => {
      return (
        product.displayTitle.toLowerCase().includes(lowerCaseKeyword) ||
        product.embeddingText.toLowerCase().includes(lowerCaseKeyword) ||
        product.productType.toLowerCase().includes(lowerCaseKeyword)
      )
    })

    return [filteredProducts[0], filteredProducts[1]];
  }
}
