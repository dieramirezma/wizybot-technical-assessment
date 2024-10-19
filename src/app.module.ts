import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatbotModule } from './chatbot/chatbot.module';
import { CsvModule } from './csv/csv.module';
import { CurrencyService } from './currency/currency.service';
import { CurrencyModule } from './currency/currency.module';
import { CsvService } from './csv/csv.service';

@Module({
  imports: [ConfigModule.forRoot(), ChatbotModule, CsvModule, CurrencyModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
