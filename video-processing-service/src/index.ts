import express from "express";
import ffmpeg from "fluent-ffmpeg";
const app = express();

app.use(express.json());

app.post("/process-video", (req, res) => {
	//Get path from input video from the request body
	const inputFilePath = req.body.inputFilePath;
	const outputFilePath = req.body.outputFilePath;

	if (!inputFilePath || !outputFilePath) {
		res.status(400).send("Bad request: Missing file path.");
	}

	ffmpeg(inputFilePath)
		.outputOption("-vf", "scale=-1:360")
		.on("end", () => {
			res.status(200).send("Processing finished succesfully");
		})
		.on("error", (err) => {
			res.status(500).send(`Internal Server error: ${err.message}`);
		})
		.save(outputFilePath); //Converting the resolution to 360p
});

const PORT: number = 3000;
const HOST: string = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`);
});
