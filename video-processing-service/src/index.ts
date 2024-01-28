import express from "express";
import ffmpeg from "fluent-ffmpeg";
const app = express();

app.post("/process-video", (req, res) => {
  //Get path from input video from the request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("Bad request: Missing file path.");
  }

  try {
    ffmpeg(inputFilePath)
      .outputOption("-vf", "scale=-1:360")
      .on("end", () => {
        return res.status(200).send("Processing finished succesfully");
      })
      .on("error", (err) => {
        throw new Error(
          `An error occured while trying to convert video:${err.message}`
        );
      })
      .save(outputFilePath); //Converting the resolution to 360p
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(`Internal Server error: ${error.message}`);
    }
  }
});

const port = process.env.PORt || 3000;

app.listen(port, () => {
  console.log(
    `Video processing service listening at https://localhost:${port}`
  );
});
