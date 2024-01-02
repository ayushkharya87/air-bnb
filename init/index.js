
// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({
//     ...obj, owner: "65918894b129507c3aea9763"
//   }));
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };

// const initDB = async () => {
//   // await Listing.deleteMany({});

//   const updatedData = initData.data.map((item) => ({
//     ...item,
//     image: item.image.url || item.image,
//   }));

//   initData.data = initData.data.map((obj) => ({...obj, owner: "65918894b129507c3aea9763"}));
  
//   await Listing.insertMany(updatedData);
//   console.log("Data was initialized");
// };

// initDB();



const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, 
    useUnifiedTopology: true });
}

// const initDB = async () => {
//   await Listing.deleteMany({});

//   const updatedData = initData.data.map((item) => ({
//     ...item,
//     image: item.image.url || item.image,
//   }));

//   initData.data = updatedData.map((obj) => ({ ...obj, owner: "65918894b129507c3aea9763" }));

//   await Listing.insertMany(initData.data);

//   console.log("Data was initialized");
// };
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj, owner: "65918894b129507c3aea9763"
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
