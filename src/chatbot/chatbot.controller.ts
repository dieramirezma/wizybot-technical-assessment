import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { EnquiryDto } from './dto/enquiry.dto';

@Controller('chatbot')
export class ChatbotController {
  chatbotService: ChatbotService;

  constructor(chatbotService: ChatbotService) {
    this.chatbotService = chatbotService;
  }

  @Post('message')
  @UsePipes(new ValidationPipe())
  async handleChatMessage(@Body() enquiry: EnquiryDto) {
    try {
      const response = await this.chatbotService.openaiChatbotResponse(enquiry);
      return { response };
    } catch (error) {
      return { response: 'An error occurred. Try later' };
    }
  }
}
