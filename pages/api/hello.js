/** @format */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/** @format */

// export default (req, res) => {
//   res.status(200).json({ name: "John Doe" })
// }

const MongoClient = require("mongodb").MongoClient

const MONGODB_URI =
  "mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/analytics?retryWrites=true&w=majority"

let cachedDb = null

function connectToDatabase(uri) {
  console.log("=> connect to database")
  if (cachedDb) {
    console.log("=> using cached database instance")
    return Promise.resolve(cachedDb)
  }
  return MongoClient.connect(uri).then((db) => {
    cachedDb = db
    return cachedDb
  })
}

function recordView(db, host) {
  //{ item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
  db.db("analytics")
    .collection("product_views")
    .insertOne({
      item: "view",
      host: host,
      tags: ["cotton"],
      size: { h: 28, w: 35.5, uom: "cm" },
    })
}

function queryDatabase(db, collection) {
  console.log("=> query database")
  let project = {
    id: 1,
    coordinates: 1,
    categories: 1,
    name: 1,
    image_url: 1,
    _id: 0,
  }
  return (
    db
      .db("analytics")
      .collection("product_views")
      .find({})
      //.project(project)
      .toArray()
      .then((result) => {
        return result
      })
      .catch((err) => {
        console.log("=> an error occurred: ", err)
        return { statusCode: 500, body: "error" }
      })
  )
}
console.log("aaaa")

export default (req, res) => {
  console.log(req.headers["x-vercel-id"])
  console.log(req.headers["x-vercel-signature"])
  if (req.method === "POST") {
  }

  connectToDatabase(MONGODB_URI)
    .then((_) => recordView(_, req.headers.host))
    .then((result) => res.status(200).json({ success: "yay" }))
  //
  //     .then((db) => queryDatabase(db))
  //     .then((result) => {
  //       res.status(200).json(result)
  //       return result
  //     })
  //     .catch((err) => {
  //       console.log("=> an error occurred: ", err)
  //       return err
  //     })
}
