# DeepLogicTech
Assingment
# Web Scraping with Node.js
This README provides users with the necessary steps to clone the repository, run the code, and access the API endpoint.
This project demonstrates a simple web scraping implementation in Node.js. The code fetches data from the Time website and extracts information from the HTML content using regular expressions.

## Prerequisites

Before running the code, make sure you have the following installed:

- [Node.js](https://nodejs.org/)

## Installation and Running the Server

1. Clone the repository to your local machine:
```
git clone https://github.com/ankush050720/DeepLogicTech.git
```
2. Navigate to the project directory:
```
cd DeepLogicTech
```

3. To start the HTTP server and fetch data from the Time website, run the following command:
```
node index.js / node .
```

The server will start on http://localhost:3000/getTimeStories. Open this URL in a web browser or use a tool like curl or Postman to make a GET request.

## Endpoint

* Endpoint: http://localhost:3000/getTimeStories
* Method: GET

The response will be in JSON format, containing an array of objects with titles and links extracted from the Time website.

***Note - No need to run command 'npm install' as no external module used
