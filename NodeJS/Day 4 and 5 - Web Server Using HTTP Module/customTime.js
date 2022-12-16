const getLocalString = () => new Date().toLocaleString();
const getLocalTime = () => new Date().toLocaleTimeString();
const getLocalDate = () => new Date().toLocaleDateString();

module.exports = {
    getLocalString,
    getLocalTime,
    getLocalDate
};