const { MongoClient, ObjectId } = require("mongodb");
let mongoDB = null;

(async function () {
  const urlMongoDB = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/?maxPoolSize=${process.env.MONGODB_LIMIT}`;
  const client = new MongoClient(urlMongoDB, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("MongoDB에 정상적으로 접속되었습니다.");
    mongoDB = client.db(process.env.MONGODB_DB);
  } catch (err) {
    console.log(err);
  }
})();

const find = async (collectionName, condition = {}) => {
  const r = await mongoDB.collection(collectionName).find(condition).toArray();
  return r;
};

const findById = async (collectionName, _id) => {
  const r = await mongoDB
    .collection(collectionName)
    .findOne({ _id: ObjectId(_id) });

  return r;
};

const insertOne = async (collectionName, data) => {
  const r = await mongoDB.collection(collectionName).insertOne(data);
  return r;
};

const insertMany = async (collectionName, data) => {
  const r = await mongoDB.collection(collectionName).insertMany(data);
  return r;
};

const updateById = async (collectionName, data, _id) => {
  const r = await mongoDB
    .collection(collectionName)
    .updateOne(
      { _id: ObjectId(_id) },
      { $set: data, $currentDate: { lastModified: true } }
    );

  return r;
};

const deleteById = async (collectionName, _id) => {
  const r = await mongoDB
    .collection(collectionName)
    .deleteOne({ _id: ObjectId(_id) });

  return r;
};

const deleteMany = async (collectionName, condition) => {
  // {"email": /gmail/}
  const r = await mongoDB.collection(collectionName).deleteMany(condition);

  return r;
};

module.exports = {
  find,
  findById,
  insertOne,
  insertMany,
  updateById,
  deleteById,
  deleteMany,
};
