import mongoose from "mongoose";

const dbConnection = async () : Promise<void> => {
  mongoose.connect(
    "mongodb+srv://himanshudoes:Himanshu12@cluster0.cjcbcbp.mongodb.net/DevMatch?retryWrites=true&w=majority&appName=Cluster0"
  );
};

export default dbConnection
