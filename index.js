import express from "express";
import got from "got";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8090;

app.get("/tweet/:tweetId", async (req, res) => {
  const tweetId = req.params.tweetId;

  const data = await got
    .get(
      `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=created_at,public_metrics&user.fields=description,profile_image_url&expansions=author_id`,
      {
        headers: {
          Authorization: "Bearer " + process.env.TWITTER_BEARER_TOKEN,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    )
    .json();

  res.json(data);
});

app.listen(PORT, () => console.log("listening on port " + PORT));
