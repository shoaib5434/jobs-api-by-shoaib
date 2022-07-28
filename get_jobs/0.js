let Cheerio = require("cheerio");
let getBackHTML = require("./get_html.js")
let updateJobs = require("./../database/company.js").updateJobs;

async function company_2(url = "https://careers.smartrecruiters.com/Devsinc/") {
	return getBackHTML(url).then(html => {
		try {
			let $ = Cheerio.load(html.data);
			let Jobs = [];
			let jobsArray = $(".js-openings-load")[0].children;
			jobsArray.forEach(li => {
				Jobs.push({
					title : li.children[0].children[0].children[0].data,
					location : li.children[0].children[1].children[0].children[0].data,
					category : null,
					description : null
				})
			})
			if (Jobs.length > 0) {
				return updateJobs({id : 1,jobs : Jobs}).then(res => {
					return {
						error : false,
						message : "Jobs Updated"
					}
				}).catch(err => {
					return {
						error : true,
						message : "There Was an Error Occured While Writing to the database"
					}
				})
			}
			else return {
				error : false,
				message : "No Job Is There"
			}
		}
		catch (err) {
			return {
				error : true,
				message : "There Is Some Unexpected Error While Fetching From Website"
			}
		}
	})
}

async function company_4(url = "https://careers.brainxtech.com/") {
	return getBackHTML(url).then(html => {
		try {
			let $ = Cheerio.load(html.data);
			let Jobs = [];
			let jobsArray = $(".jobs-list")[0].children;
			jobsArray.forEach(li => {
				if (li.name == 'li') {
					Jobs.push({
						apply_link : "https://careers.brainxtech.com" + li.children[1].attribs.href,
						title : li.children[1].children[0].data,
						location : "Lahore, Pakistan",
						category : null,
						description : null
					})
				}
			})
			if (Jobs.length > 0) {
				return updateJobs({id : 4,jobs : Jobs}).then(res => {
					return {
						error : false,
						message : "Jobs Updated"
					}
				}).catch(err => {
					console.log(err)
					return {
						error : true,
						message : "There Was an Error Occured While Writing to the database"
					}
				})
			}
			else return {
				error : false,
				message : "No Job Is There"
			}
		}
		catch (err) {
			return {
				error : true,
				message : "There Is Some Unexpected Error While Fetching From Website",
			}
		}
	})
}

async function company_5(url = "https://nextbridge.com/current-openings/") {
	return getBackHTML(url).then(html => {
		try {
			let $ = Cheerio.load(html.data);
			let Jobs = [];
			let jobsArray = $(".table-job-listing tbody")[0].children;
			jobsArray.forEach(li => {
				if (li.name == 'tr') {
					// console.log(li.children[2].children[3].attribs.href)
					Jobs.push({
						title : li.children[1].children[1].children[0].data,
						description : li.children[1].children[2].children[0].data,
						apply_link : li.children[2].children[3].attribs.href,
						category : null,
						location : "Lahore/Islamabad Pakistan"
					})
				}
				// console.log(li.children[2].children[1])
			})
			if (Jobs.length > 0) {
				return updateJobs({id : 5,jobs : Jobs}).then(res => {
					return {
						error : false,
						message : "Jobs Updated"
					}
				}).catch(err => {
					console.log(err)
					return {
						error : true,
						message : "There Was an Error Occured While Writing to the database"
					}
				})
			}
			else return {
				error : false,
				message : "No Job Is There"
			}
		}
		catch (err) {
			return {
				error : true,
				message : "There Is Some Unexpected Error While Fetching From Website",
			}
		}
	})
}

module.exports = {
	id_2 : company_2,
	id_4 : company_4,
	id_5 : company_5
}