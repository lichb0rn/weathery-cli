# Simple cli node.js app for getting weather

Simple node.js app for getting weather from openweathermap.org
For using it you have to register at the website and provide API token (free with limitations).

The app saves setting directly to `$HOME/weathery.json` file, but you can use it with environment variables:
`alias weathery="TOKEN=<token> CITY=<city> node weathery.js"`