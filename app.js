const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URI = 'mongodb://localhost:27017/wanderlust';

main()
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));
async function main() {
    await mongoose.connect(MONGO_URI);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get('/', (req, res) => {
    
    res.send('Hello  i am root');
});
//Index route
app.get('/listings',  async(req, res) => {
  const allListings = await Listing.find({});
  res.render("Listings/index.ejs", { allListings });

    });

    //New route
app.get('/listings/new', (req, res) => {
    res.render('Listings/new.ejs');
});
 
    //show rouye
    

    app.get('/listings/:id', async (req, res) => {
    // Option A: Destructuring (Cleaner)
    const { id } = req.params; 
    
    // Option B: Direct Access
    // let id = req.params.id; 

    const listing = await Listing.findById(id);
    res.render('Listings/show.ejs', { listing });
});

//CREATE ROUTE

    app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Edit route
// app.get('/listings/:id/edit', async (req, res) => {
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
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