const express = require("express")
const router = express.Router();
const methodOverride = require('method-override')
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js")
const flash = require("connect-flash")
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listing.js")
const multer  = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })
// const.use

router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    // validateListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.createListing))

router.get('/v2/list', async (req, res) => {
        const category = req.query.category;
         // Get category from query string
        let filteredListings;
      
        if (category) {
          // Fetch listings matching the category
          
          filteredListings = await Listing.find({ category });
          console.log(filteredListings);
        } 
        if(filteredListings.length === 0)
        {
            req.flash("error","No listings available for this category.")
            return res.redirect("/Listing")
        }
        else{
            res.render("./listing/index.ejs",{allListing:filteredListings});
        }
      
        
      });
// router.get("/map",(req,res)=>{
//     const longitude = req.body.query;
//     const latitude = req.body.query;
//     const map = L.map('map').setView([latitude, longitude], 13);
// })
router.get("/search",wrapAsync(listingController.searchListing))

router.get("/new",isLoggedIn,listingController.newListing);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put( isLoggedIn,isOwner,upload.single('listing[image]'),
// validateListing,
    wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.deleteListing))
// router.get("/",wrapAsync(listingController.index));
//  new route
 

//  create route
//  router.post("/",validateListing,wrapAsync(listingController.createListing));
 // show route
//  router.get("/:id",wrapAsync(listingController.showListing));
 
 
 // Edit
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));
 // Update Route
//  router.put("/:id",validateListing, isLoggedIn,isOwner,
//      wrapAsync(listingController.updateListing));
 
 
 // delete route
//  router/;
 module.exports = router;