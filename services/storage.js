import { homedir } from 'os';
import { join } from 'path';
import { promises, read } from 'fs';

const settingsFile = join(homedir(), 'weathery.json');

const TOKEN_DICT = {
    token: 'token',
    city: 'city',
};

// Save key-value data to a user's home directory
const saveValueByKey = async (key, value) => {
    let data = {};
    if (await isFileExist(settingsFile)) {
        data = await readFile(settingsFile);
    }
    data[key] = value;
    await promises.writeFile(settingsFile, JSON.stringify(data));
};

const getValueByKey = async (key) => {
    if (await isFileExist(settingsFile)) {
        const data = await readFile(settingsFile);
        return data[key];
    }
    return undefined;
};

const isFileExist = async (filePath) => {
    try {
        await promises.stat(filePath);
        return true;
    } catch (e) {
        return false;
    }
};

const readFile = async (filePath) => {
    const file = await promises.readFile(settingsFile);
    return JSON.parse(file);
};

export { saveValueByKey, getValueByKey, TOKEN_DICT };
