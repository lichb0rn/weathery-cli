import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.error(chalk.bgRed('Error') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen('OK') + ' ' + message);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.blue('Help')}
        Without arguments - print current weather
        -c <city name> - set city name
        -h - print help
        -t <api key> - set openweather.com api key
        `
    );
};

const printWeather = (weather, icon) => {
    console.log(
        dedent`${chalk.yellowBright('Current weather')} for ${chalk.bgBlue(weather.name)}
        ${icon}  ${weather.weather[0].description}
        Temperature: ${weather.main.temp}, feels like: ${chalk.gray(weather.main.feels_like)}
        Humidity: ${weather.main.humidity}%
        Wind speed: ${weather.wind.speed} m/sec
        `
    );
};

export { printError, printSuccess, printHelp, printWeather };
