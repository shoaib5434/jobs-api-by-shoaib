let Company = require('./database/company.js');
let express = require("express");
let Update = require("./get_jobs/0.js")
let getJobs = require("./get_jobs/jobs.js")
let app = express();


let server;
app.use(express.json());

app.post("/company", (req,res) => {
	console.log(req.body)
	Company.addCompany(req.body).
	then(
		result => {
			server.close()
			return res.status(200).json({
				error : false,
				databse_eror : false,
				message : "Success"
			})
		}
	).
	catch(
		err => {
			console.log(err)
			if (err.code == 12) {
				return res.status(200).json({
					error : true,
					databse_eror : false,
					message : err.message
				})
			}
			else {
				return res.status(200).json({
					error : true,
					databse_eror : true,
					message : err
				})
			}
		}
	);
	// console.log(P);
})

app.put("/jobs",async (req,res) => {
	console.log(req.body.id)
	Update['id_' + req.body.id]().then(result => {
		res.status(200).json(result)
	});
})

app.get("/jobs",async(req,res) => {
	console.log(req.query)
	getJobs(req.query).then(result => {
		return res.status(200).json(result.rows)
	}).catch(err => {
		console.log(err)
		return res.status(200).json({
			error : true,
			// errorCode : err.code,
			message : "Something Went Wrong"
		})
	})
})

app.get("/close",(req,res) => {
	Company.close();
	server.close();
})

server = app.listen(process.env.PORT || 3000,() => {
	console.log("Running....")
})