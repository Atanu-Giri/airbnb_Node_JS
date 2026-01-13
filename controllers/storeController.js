const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes, fields) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })});
  }


exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes, fields) => {
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
  Favourite.getFavourites().then((favourites => {
     favourites = favourites.map(fav => fav.homeId);
    Home.fetchAll().then((registeredHomes) => {
      console.log(favourites, registeredHomes);
      const favouriteHomesList = registeredHomes.filter(home => favourites.includes(home._id.toString()));
      console.log(favouriteHomesList)
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomesList,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    }
    );
  }));
};

exports.getHomeDetail = (req, res, next) => {
  const homeId = req.params.homeId;
console.log("At home details page", homeId);
Home.findById(homeId)
.then((home) => {
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
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav.save().then(result => {
    console.log("Fav added:", result);
  }).catch(error => {
    console.log("Error while marking favourites", error);
  }).finally(() => {
    console.log("redirecting to favourites")
    res.redirect('/favourites');
  }) 
}


exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId).then(result => {
    console.log("Fav removed:", result);
  }).catch(error => {
    console.log("Error while removing favourite", error);
  }).finally(() => {
    console.log("redirecting to favourites")
    res.redirect('/favourites');
  });
}
