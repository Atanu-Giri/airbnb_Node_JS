const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes, fields]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })});
  }


exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes, fields]) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  }
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {
    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomesList = registeredHomes.filter(home => favourites.includes(home.id.toString()));
      console.log(favouriteHomesList)
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomesList,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    }
    );
  })
};

exports.getHomeDetail = (req, res, next) => {
  const homeId = req.params.homeId;
console.log("At home details page", homeId);
Home.findById(homeId)
.then(([homes]) => {
  const home = homes[0];
  if (!home){
    console.log("Home not found");
    res.redirect("/homes");
  }
else{
  // const homes = home[0];
  console.log("home found", home);
  res.render("store/home-detail", {
    home: home,
    pageTitle: "Home Detail",
    currentPage: "Home",
  })}
})}


exports.postAddToFavourite = (req, res, next) => {
  console.log("came to add to favourites", req.body);
  Favourite.addToFavourite(req.body.id, error => {
    if(error){
    console.log("error while marking to favourites:", error);
    } 
    res.redirect('/favourites')
  });
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    }
    res.redirect("/favourites");
  })
}
