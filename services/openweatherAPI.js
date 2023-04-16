import { getValueByKey, TOKEN_DICT } from './storage.js';

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
    }
}

const fetchWeatcher = async (city) => {
    const token = process.env.TOKEN ?? (await getValueByKey(TOKEN_DICT.token));
    if (!token) {
        throw new Error(
            'Token is undefined, Please, provide a valid opeanweather token with "-t <token>".'
        );
    }
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('q', city);
    url.searchParams.append('appid', token);
    url.searchParams.append('units', 'metric');

    const response = await fetch(url);
    if (!response.ok) {
        throw new NetworkError(
            `Could not fetch weather data. Status code: ${response.status} - Not found.`
        );
    }
    const weatherData = await response.json();
    if (weatherData.cod === 401) {
        throw new APIError(`Incorrect API token key: ${token}.`);
    }
    return weatherData;
};

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
        default:
            return '';
    }
};

export { fetchWeatcher, NetworkError, APIError, getIcon };
