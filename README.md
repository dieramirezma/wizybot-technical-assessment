# Wizybot Chatbot API
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://www.wizybot.com/" target="blank"><img src="https://static.wixstatic.com/media/0abc3f_b5e76ac0d0dc4735929512bf0543bf07~mv2.png/v1/fill/w_84,h_71,al_c,lg_1,q_85,enc_auto/Logo%20Wizy.png" width="120" alt="Wizybot Logo" /></a>
</p>

![Version](https://img.shields.io/badge/version-1.0.0-blue)

  <p align="center">AI Customer Support and Sales Agent developed with <a href="http://nodejs.org">Nest</a> for <a href="https://www.wizybot.com/">Wizybot</a>.</p>

## Description

The Wizybot Chatbot API is a powerful application designed to facilitate seamless interactions between users and a chatbot. This API enables users to perform product searches and currency conversions through natural language queries, leveraging the capabilities of OpenAI's Chat Completion API

## Clone repository

```bash
$ git clone https://github.com/dieramirezma/wizybot-technical-assessment.git
$ cd wizybot-technical-assessment
```

## Project setup

Install dependencies of the project
```bash
$ npm install
```

## Environment variables
You must have the following environment variables in a `.env` file in the root folder: 

```bash
OPEN_EXCHANGE_RATES_APP_ID=<Your Open Exchange Rates App ID>  # Required for currency conversion
OPENAI_API_KEY=<Your OpenAI API Key>                         # Required for OpenAI API calls
PORT=<Port number>                                           # Port to run the server (default is 3000)

```

Check `.example.env` file for an example

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

Go to `http://localhost:PORT/api/v1/chatbot/message` to use the API. Check API documentation at `http://localhost:PORT/docs`.
> [!NOTE]  
> You must change `PORT` for the number port in your `.env` file. The default port is 3000

## API Endpoints
- Send a message to the chatbot
  - Endpoint: `POST api/v1/chatbot/message`
  - Request Body: 
    ```json
    {
      "enquiry": "I am looking for a phone"
    }
    ```

  - Response: 
    ```json
    {
      "response": "Here are two great options for phones that you might be interested in:\n\n1. **iPhone 12**\n   - **Price:** $900.00 USD\n   - **Colors Available:** Black, Blue, Red, Green, White\n   - **Capacity Options:** 64GB, 128GB\n   - **Discount:** Yes\n   - **Product Link:** [View iPhone 12](https://wizybot-demo-store.myshopify.com/products/iphone-12)\n   - ![iPhone 12](https://cdn.shopify.com/s/files/1/0779/8125/3922/files/ScreenShot2023-06-21at4.49.19PM.png?v=1687384318)\n  \n2. **iPhone 13**\n   - **Price:** $1099.00 USD\n   - **Colors Available:** Black, Blue\n   - **Capacity Options:** 256GB, 128GB\n   - **Discount:** Yes\n   - **Product Link:** [View iPhone 13](https://wizybot-demo-store.myshopify.com/products/iphone-13)\n   - ![iPhone 13](https://cdn.shopify.com/s/files/1/0779/8125/3922/files/ScreenShot2023-06-21at5.00.26PM.png?v=1687384930)\n\nFeel free to click on the links for more details! Let me know if you need any further assistance."
    }
    ```
