let database = require("./database.js")

// database.end();
async function addCompany(company) {
	let error = "Error:",flag = false;
	if (company.name == undefined) {
		error += "`name` => undefined ; ";
		flag = true;
	}
	if (company.headquater == undefined) {
		error += "`headquater` => undefined ; ";
		flag = true;
	}

	if (company.career_link == undefined) {
		error += "`career_link` => undefined ; ";
		flag = true;
	}

	if (flag) {
		// database.end()
		throw {
			code : 12,
			message : error,
		}
		return;
	}
	let response = await database.query(`
		INSERT INTO companies(id,name,headquater,career_link) 
		VALUES((SELECT MAX(id) from companies) + 1,'${company.name}','${company.headquater}','${company.career_link}')
		`);
	// await console.log("Hello")
	// database.end();
	return response;
}

async function close() {
	await database.end();
}

async function updateJobs(JobsArray) {
	let query = `
			DELETE FROM jobs WHERE company_id = ${JobsArray.id};
			INSERT INTO jobs (title,company_id,location,category,description,apply_link) VALUES 
		`;
	JobsArray.jobs.forEach(job => {
		query += `('${job.title}',${JobsArray.id},'${job.location}','${job.category}','${job.description}','${job.apply_link}'),`;
	})
	query = query.slice(0,-1)
	// console.log(query)
	return await database.query(
		query
	);
}

module.exports = {
	"addCompany" : addCompany,
	"close" : close,
	"updateJobs" : updateJobs
}