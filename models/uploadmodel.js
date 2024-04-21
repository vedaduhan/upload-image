const sharp = require("sharp");
const fs = require("fs");

const QueryBuilder = require("node-querybuilder");

const dbConfig = require("../utils/dbconfig");

const pool = new QueryBuilder(dbConfig, "mysql", "pool");

class UploadModel {
	async uploadImage(image) {
    const acceptedMimeTypes = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    const resizeWidth = 500;

    if (acceptedMimeTypes.includes(image.mimetype)) {
        // Image has an accepted mimetype
        const imageDestinationPath = __dirname + "/../assets/uploads/" + image.name;
        await image.mv(imageDestinationPath);

        const resizedImagePath = __dirname + "/../assets/uploads/resized/" + image.name;
        await sharp(imageDestinationPath)
            .resize(resizeWidth)
            .toFile(resizedImagePath);

        // Wait for sharp operation to complete before deleting the original image
				console.log('__dirname', __dirname);
				console.log("Image uploaded and resized");
				console.log("Image Destination Path->" + imageDestinationPath);
				console.log("Resized Image Path->" + resizedImagePath);
        // await fs.promises.unlink(imageDestinationPath);
        // console.log(imageDestinationPath + " deleted");

        return true;
    } else {
        console.log("Unable to upload image");
        return false;
    }
}

	async storeUploadData(data) {
		let querybuilder;
		try {
			querybuilder = await pool.get_connection();
			querybuilder.insert("uploads", data, (err, res) => {
				console.log("Query Ran: " + querybuilder.last_query());

				if (err) return console.error(err);
				console.log("insert id:", res.insert_id);
				return true; //we've managed to store data in the dbase
			});
		} catch (error) {
			console.log("insert upload error", error);
			return false; //we've NOT managed to store data in the dbase
		} finally {
			if (querybuilder) querybuilder.release(data);
		}
	}

    async getUploads() {
        try {
            // const uploads = await pool.query("SELECT * FROM uploads");
            // return uploads;
            // TODO - Use the QueryBuilder to get all uploads
            let querybuilder = await pool.get_connection();
            // order by upload id desc
            let uploads = await querybuilder.select("*").order_by("upload_id", "desc").get("uploads");
            querybuilder.release();
    
            console.log("uploads", uploads);
            return uploads;
        } catch (error) {
            console.error("Error fetching uploads:", error);
            return false;
        }
    }
}

module.exports = new UploadModel();
