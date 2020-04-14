const axios = require("axios");

const getUser = (github, handleData) => {
    
    const githubUrl = `https://api.github.com/users/${github}`;

axios.get(githubUrl).then((githubData) => {
// console.log(githubData);
// data.avatar_url
// data.email
// data.location
handleData(githubData.data);
})

}

module.exports = {getUser: getUser}

