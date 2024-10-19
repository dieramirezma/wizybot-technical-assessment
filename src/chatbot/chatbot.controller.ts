import { Controller, Post, Body, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { Response } from 'express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { ChatMessageDto } from './dto/chat-message.dto';
// Swagger Documentation
@ApiTags('chatbot')
@Controller('chatbot')
export class ChatbotController {
  chatbotService: ChatbotService;

  constructor(chatbotService: ChatbotService) {
    this.chatbotService = chatbotService;
  }

  // Endpoint to handle chat messages
  @Post('message')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Interact with the chatbot' })
  @ApiResponse({
    status: 200,
    description: 'Successful response from the chatbot'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input'
  })
  @ApiResponse({
    status: 500,
    description: 'Server error'
  })
  async handleChatMessage(@Body() enquiry: ChatMessageDto, @Res() res: Response) {
    try {
      const response = await this.chatbotService.openaiChatbotResponse(enquiry);
      return res.status(200).json({ response })
    } catch (error) {
      return res.status(500).json({ response: 'An error occurred. Try later' })
    }
  }
}
