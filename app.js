const express = require('express');
const app = express();
const dotenv = require('dotenv')

const shortURL = require('./models/shortURL')
const mongoose = require('mongoose');
const cors = require('cors')
dotenv.config()
    
var path = require('path');

const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(port, () => {console.log("Server is running on port " + port)}))
    .catch((error) => console.log(error));

app.use(cors());

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended:false }))
app.use(express.static('public'));

app.get("/", async (req, res) => {
    const ShortURLS = await shortURL.find();
    res.render('index', { ShortURLS : ShortURLS});
});


app.post("/shortURLS", async (req,res) => {
    await shortURL.create({ full: req.body.fullURL})
    res.redirect("/#resultContainerShortURL")
});


app.get("/shortURLS/:id", async (req, res) => {
    const id = req.params.id;
    await shortURL.findByIdAndDelete(id);
    res.redirect("/#resultContainerShortURL");
})

app.get("/:id", async (req, res) => {
    const ShortURL = await shortURL.findOne({ short: req.params.id})
    if (ShortURL == null) return res.sendStatus(404)

    ShortURL.clicks++
    ShortURL.save()

    res.redirect(ShortURL.full)
})


