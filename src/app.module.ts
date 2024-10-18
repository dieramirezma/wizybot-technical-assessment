import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotModule } from './chatbot/chatbot.module';
import { CsvModule } from './csv/csv.module';
import { CurrencyService } from './currency/currency.service';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [ConfigModule.forRoot(), ChatbotModule, CsvModule, CurrencyModule],
  controllers: [AppController],
  providers: [AppService, CurrencyService],
})
export class AppModule { }
