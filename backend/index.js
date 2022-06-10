require("dotenv").config();
const connectDb = require("./Startup/db");
const express = require("express")
const cors = require("cors");
const comments = require("./routes/comments"); 
//const videoValidate = require("./middleware/video-validation")
const app = express();

connectDb();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended:true }));
app.use('/api/comments', comments);

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
  console.log(`Server running. Listening on PORT: ${PORT}`);
});

