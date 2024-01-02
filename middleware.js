const Listing = require("./models/listing");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require('./utils/ExpressError.js');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        // redirect url
        req.session.redirectUrl = req.originalUrl;

        req.flash("error", "you must me logged in to create listing");
        return res.redirect("/login");
    }
    next();
};

// save redirect url in locals
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// check listing owner
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "you are not the owner of this listing");
      return res.redirect(`/listings/${id}`);
    }

    next();
}

// form validation
module.exports.validateListing =(req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
      let errMsg = error.details.map((e) => e.message).join(",");
      throw new ExpressError(400, errMsg)
    } else {
      next();
    }
  };

  // review validation
module.exports.validateReview =(req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
      let errMsg = error.details.map((e) => e.message).join(",");
      throw new ExpressError(400, errMsg)
    } else {
      next();
    }
  };


  // check review owner for delete review
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the Author of this Review");
    return res.redirect(`/listings/${id}`);
  }

  next();
}