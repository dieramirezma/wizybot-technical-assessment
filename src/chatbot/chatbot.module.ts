import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { CurrencyService } from 'src/currency/currency.service';
import { CsvService } from 'src/csv/csv.service';

@Module({
  providers: [ChatbotService, CurrencyService, CsvService],
  controllers: [ChatbotController]
})
export class ChatbotModule {}
