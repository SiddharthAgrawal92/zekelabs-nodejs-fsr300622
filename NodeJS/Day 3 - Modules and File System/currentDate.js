const getCurrentDate = () => {
    return new Date();
}

const getLocaleString = () => {
    return new Date().toLocaleString();
}

module.exports = {
    getCurrentDate,
    getLocaleString
};