import { IsString, MinLength } from "class-validator";

export class ChatMessageDto {
  @IsString()
  @MinLength(10)
  enquiry: string;
}