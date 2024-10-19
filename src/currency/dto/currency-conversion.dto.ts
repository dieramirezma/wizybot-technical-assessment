import { IsNumber, IsString, Length } from 'class-validator';

export class CurrencyConversionDto {
  @IsNumber()
  amount: number;

  @IsString()
  @Length(3,3)
  fromCurrency: string;

  @IsString()
  @Length(3,3)
  toCurrency: string;
}
