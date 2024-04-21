const uploadModel = require("../models/uploadmodel");

const mysql = require("mysql");

class UploadController {
	async uploadFile(req, res) {
		let renderParameters = {};
		try {
			console.log(req.body, req.files.picture);
			let image = req.files.picture;
			let userData = req.session.user;




			if (await uploadModel.uploadImage(image)) {
				//we have an image that's not too big
				//we accept it to be an image
				//store it in the database
				const data = {
					upload_file_name: image.name,
					upload_path_org: "/uploads/" + image.name,
					upload_path: "/uploads/resized/" + image.name,
					upload_author_id: userData.id,
					upload_author: userData.username,
					upload_description: req.body.caption,
				};

				if (!uploadModel.storeUploadData(data)) {
					console.log(
						"We were unable to store the upload metadata in the database"
					);
				}

				console.log('data->', data);

							// TODO - get the userData from the session
			// TODO - get all the uploads from the database
			// TODO - pass the userData and the uploads to the view

			let responseData = await uploadModel.getUploads();

				renderParameters = {
					title: req.body.caption,
					caption: req.body.caption,
					page: "uploadedpicture.ejs",
					image: data.upload_path,
					user: userData,
					responseData: responseData,
				};


			} else {
				// return an error flash message
				renderParameters = {
					title: "Uploads",
					page: "uploadform.ejs",
					messages: { error: "Not an image" },
					caption: req.body.caption,
				};
			}
		} catch (error) {
			console.log(error);

			renderParameters = {
				title: "Uploads",
				page: "uploadform.ejs",
				messages: { error: "Something went wrong, please try again" },
				caption: req.body.caption,
			};
		}
		// return res.render("templates/index.ejs", renderParameters);
		return res.redirect("/");
	}

	async getUploads(req, res) {
		//get all uploads from the database
		let uploads = await uploadModel.getUploads();
		return res.render("templates/index.ejs", {
			title: "Uploads",
			page: "uploads.ejs",
			uploads: uploads,
		});
	}

	async getUpload(req, res) {
		//get a single upload from the database
		let upload = await uploadModel.getUpload();
		return res.render("templates/index.ejs", {
			title: "Upload",
			page: "uploadform.ejs",
			upload: upload,
		});
	}
}

module.exports = new UploadController();
