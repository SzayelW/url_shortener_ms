A URL Shortener Microservice 

User stories
    I can pass a URL as a parameter and I will receive a shortened URL in the JSON response
    When I visit that shortened URL, it will redirect me to my original link.
    If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead
    
Creation Usage
    https://short-url-ms.herokuapp.com/new/http://www.github.com/

Creation output
    {"original_url":"http://www.github.com","short_url":"https://short-url-ms.herokuapp.com/9421"}

Usage
    https://short-url-ms.herokuapp.com/9421
    
Will redirect to:
    http://www.github.com
