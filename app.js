const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");

const MONGO_URI = 'mongodb://localhost:27017/wanderlust';

main()
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));
async function main() {
    await mongoose.connect(MONGO_URI);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    
    res.send('Hello  i am root');
});

app.get('/listings',  async(req, res) => {
  const allListings = await Listing.find({});
  res.render("Listings/index.ejs", { allListings });

    });
 
// app.get('/testListing', async (req, res) => {
//     let newListing = new Listing({
//         title: "Beautiful Beach House",
//         description: "A stunning beach house with ocean views.",    
//         price: 250,
//         location: "Malibu, California",
//         country: "USA"
    
// });
//   await newListing.save();
//   console.log('Sample listing saved to database');
//   res.send('Sample listing created and saved to database');
// });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});