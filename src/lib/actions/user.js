import UserModel from "../Models/UserModel";
import { connectDB } from "../config/ConnectDB";

export async function createOrUpdateUser(
  id,
  first_name,
  last_name,
  image_url,
  email_addresses
) {
  try {
    await connectDB();
    const user = await UserModel.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePic: image_url,
          email: email_addresses[0].email_address,
        },
      },
      // upsert: true - if no previous info, just create a new one
      { upsert: true, new: true }
    );
  } catch (err) {
    console.log("Could not update or add users", err.message);
  }
}

export async function deleteUser(id) {
  try {
    await connectDB();
    await UserModel.findOneAndDelete({ clerkId: id });
  } catch (err) {
    console.log("Error: cannot delete user");
  }
}
