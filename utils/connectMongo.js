import mongoose from "mongoose";

let mongoConnection;

const connectMongo = async () => {
  if (mongoConnection) {
    return mongoConnection;
  }

  const uri = process.env.URI;
  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside.env.local"
    );
  }

  const options = {
    dbName: "e-pharmacy",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    family: 4, // Use IPv4, node driver's default server selection method prior to v3.6
  };

  try {
    mongoConnection = await mongoose.connect(uri, options);
    console.log("Connected to MongoDB");
    return mongoConnection;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    throw error;
  }
};

export default connectMongo;
