let Axios = require("axios");

async function sendBackHTML(requestURL) {
	return await Axios.get(requestURL).then(res => res);
}

module.exports = sendBackHTML;