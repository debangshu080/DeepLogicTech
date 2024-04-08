// Import necessary modules
const http = require("http");
const https = require("https");
const { StringDecoder } = require("string_decoder");

// Create an HTTP server
const server = http.createServer((req, res) => {
  const url = "https://time.com"; // The URL of the website to fetch data from

  // Make an HTTPS GET request to the specified URL
  https
    .get(url, (response) => {
      let data = ""; // Variable to store the HTML response
      const decoder = new StringDecoder("utf-8"); // Using UTF-8 encoding

      // Add received data chunks to the 'data' variable
      response.on("data", (chunk) => {
        data += decoder.write(chunk);
      });

      // After the whole response is received, we create a DOM structure
      response.on("end", () => {
        data += decoder.end();

        // Using regular expressions to extract information from the HTML content
        const lisRegex =
          /<li\s+class\s*=\s*"latest-stories__item"[^>]*>(.*?)<\/li>/gs; // Pattern for <li> tag
        const titleRegex =
          /<h3\s+class\s*=\s*"latest-stories__item-headline"[^>]*>(.*?)<\/h3>/; // Pattern for <h3> tag
        const linkRegex = /<a\s+href="([^"]*)"[^>]*>/; // Pattern for <a> tag

        const arr = []; // Initialize an empty array to store extracted data
        let match;

        // Loop through all matches of the liRegex in the HTML content
        while ((match = lisRegex.exec(data)) !== null) {
          const liContent = match[1];
          const titleMatch = titleRegex.exec(liContent);
          const linkMatch = linkRegex.exec(liContent);

          // If title and link matches are found, extract and store the object in the array
          if (titleMatch && linkMatch) {
            const mpp = {
              title: titleMatch[1].trim(),
              link: "https://time.com" + linkMatch[1],
            };
            arr.push(mpp); // push the object into the array
          }
        }

        // Set HTTP response headers and send the extracted array data as JSON-formatted string
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(arr));
      });

      // On error, log the error message and send a 500 status with an error response
    })
    .on("error", (err) => {
      console.error(`Error: ${err.message}`);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`Failed to retrieve the webpage. Error: ${err.message}`);
    });
});

// Start the server on port 3000 or use the provided environment variable PORT
// The API endpoint is /getTimeStories
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/getTimeStories`);
});
