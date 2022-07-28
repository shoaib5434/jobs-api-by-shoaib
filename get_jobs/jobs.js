let database = require("./../database/database.js");

async function getJobs(searchObject) {
	let query = `
		SELECT jobs.*,companies.name AS comapnyName FROM jobs INNER JOIN companies ON companies.id = jobs.company_id
	`;
	let flag = false;
	if (searchObject.searchText != null && searchObject.searchText != undefined) {
		searchObject.searchText = searchObject.searchText.toLowerCase()
		query += ` WHERE jobs.title LIKE '%${searchObject.searchText}%'`;
		flag = true;
	}
	if (searchObject.searchLocation != null && searchObject.searchLocation != undefined) {
		searchObject.searchLocation = searchObject.searchLocation.toLowerCase()
		if (!flag) query += ` WHERE`;
		else query += ` AND`;
		query += ` lower(jobs.location) LIKE '%${searchObject.searchLocation}%'`;
		flag = true;
	}
	if (searchObject.searchCompany != null && searchObject.searchCompany != undefined) {
		searchObject.searchCompany = searchObject.searchCompany.toLowerCase()
		if (!flag) query += ` WHERE`;
		else query += ` AND`;
		query += ` lower(companies.name) LIKE '%${searchObject.searchCompany}%'`;
	}
	// console.log(query)
	return await database.query(query);
}

module.exports = getJobs;