import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "HOSPITAL_MANAGEMENT_SYSYTEM",
    })
    .then(() => {
      console.log("connected to database!");
    })
    .catch((err) => {
      console.log(`some error occured while connecting to the database ${err}`);
    });
};
