# Mashup Data Source Service
All data sources unite! 
A uniform JavaScript API for processing multiple data sources across the web.

**Note**: This project is under active development, so stay tuned!

### What is it?
Have you ever had too many web services and data sources all over the internet 
and found it too cumbersome to save every single one of them?

No worries no more! The Mashup Data Source Service is a library to manage and organize data sources on the web in one place. 
We define a general concept to support almost all popular data sources online. 
Not only can such data sources be imported from different providers and places, 
they can be combined as one single mashup data source for your convenience.
You just need to declare the data source(s) in your code, we take care of the rest.

For example, you'd like to query your own tables hosted in the following services:
+ Google Spreadsheets
+ PostgreSQL
+ Oracle

Normally you would have to treat them separately in your code because they have different API syntax structures and protocols.
Using the Mashup Data Source Service: 
+ You only need to declare these data sources once;
+ You can then query your data easily in one place regardless of the syntax and structure differences between the different APIs;
+ You can even treat all of them as one single data source and query/display their data in one single call.

### Installation
Copy and import the JavaScript folder [js](src/js) or the TypeScript folder [ts](src/ts) into your web project. 
(We are working on providing an import link such as or similar to CDN.) And that's it, you're all set up!

[comment]: <> (TODO Provide a CDN link.)

### How do I use this?
1. First declare an ``options`` object for your data source:
    ```javascript
    var options = {
        name: "My Data Source 1",
        type: "Table",
        provider: "The Provider",
        uri: "https://link.to.your.datasource"
    };
    ```
    where:
    + ``name`` ``(optional)``: the name of your data source 
    + ``type`` ``(optional)``: the type of your data source
    + ``provider`` ``(optional)``: the provider of your data source
    + ``uri`` ``(required)``: the URL to your data source

1. Initialize data source:
    ```javascript
    // Google Spreadsheets
    var googleSpreadsheets = new GoogleSheets(options);
    
    // Google Spreadsheets
    var postgreSQL = new PostgreSQL(options);
    ```

[comment]: <> (TODO Provide a more detailed documentation on the options.)

[comment]: <> (TODO Provide a more detailed documentation on the getCapabilities.)

### How do I declare my own data sources?
For your convenience, we already include Google Spreadsheets and PostgreSQL (more to come!) both in JavaScript and TypeScript.
But if you know a popular data source that is not included, please let us know in the 
[issue section](https://github.com/tum-gis/mashup-data-source-service/issues), 
and perhaps we could define it for you!

Otherwise if you are a power user, you can declare your own data source(s) in a JavaScript or TypeScript file. 
Have a look at our codes [here](src/js/application) for JavaScript and [here](src/ts/application) for TypeScript.
We are working on a more detailed documentation on this, so stay tuned!

[comment]: <> (TODO Provide a more detailed documentation on how to declare own data sources.)


