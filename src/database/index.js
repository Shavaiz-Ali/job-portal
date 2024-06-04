import mongoose from "mongoose";

export const dbConnecttion = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connection established");
    })
    .catch((error) => {
      console.log(error);
    });
};
