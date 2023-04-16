// Naive approach for parsing argv
const parseArgs = (args) => {
    const result = {};
    const [executor, file, ...rest] = args;
    rest.forEach((value, index, array) => {
        if (value.charAt(0) === '-') {
            if (index === array.length - 1) {
                result[value.substring(1)] = true;
            } else if (array[index + 1].charAt(0) !== '-') {
                result[value.substring(1)] = array[index + 1];
            } else {
                result[value.substring(1)] = true;
            }
        }
    });
    return result;
};

export { parseArgs };
