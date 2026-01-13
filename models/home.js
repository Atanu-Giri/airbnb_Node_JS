const { ObjectId } = require('mongodb');
const { getDB } = require('../utils/databaseUtil');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if(_id){
      this._id = _id;
    }
  }

  save() {
    const db = getDB();
    const updatedFields = {
      houseName: this.houseName,
      price: this.price,
      location: this.location,
      rating: this.rating,
      photoUrl: this.photoUrl,
      description: this.description
    };
    if(this._id){
      return db.collection("homes").updateOne({_id: new ObjectId(String(homeId))}, {
        $set: updatedFields
      });
    } else {
    return db.collection("homes").insertOne(this).then((result) => {
      console.log(result);
    });
    }  
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray();   
  }

  static findById(homeId) {
    const db = getDB();
    return db.collection("homes").find({_id: new ObjectId(String(homeId))}).next(); 
  }

  static deleteById(homeId, callback) {
    const db = getDB();
    return db.collection("homes").deleteOne({_id: new ObjectId(String(homeId))});
    }
}

