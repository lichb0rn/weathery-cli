#!/usb/bin/env node

import { printHelp, printSuccess, printError, printWeather } from './services/logger.js';
import { fetchWeatcher, NetworkError, APIError, getIcon } from './services/openweatherAPI.js';
import { saveValueByKey, getValueByKey, TOKEN_DICT } from './services/storage.js';
import { parseArgs } from './utils/arguments.js';

const init = async () => {
    const args = parseArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.c) {
        saveCity(args.c);
    }

    if (args.t) {
        return saveToken(args.t);
    }

    await getForecast();
};

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token has not been provided');
        return;
    }
    try {
        await saveValueByKey(TOKEN_DICT.token, token);
        printSuccess('Token saved');
    } catch (e) {
        printError(e.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError('City has not been provided');
        return;
    }
    try {
        await saveValueByKey(TOKEN_DICT.city, city);
        printSuccess('City saved');
    } catch (e) {
        printError(e.message);
    }
};

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? getValueByKey(TOKEN_DICT.city);
        const weatherJson = await fetchWeatcher(city);
        const icon = getIcon(weatherJson.weather[0].icon);
        printWeather(weatherJson, icon);
    } catch (e) {
        printError(e.message);
    }
};

init();
