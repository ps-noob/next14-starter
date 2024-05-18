"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDB } from "./utlis";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);
  // console.log(formData);
  console.log(title, desc, slug, userId);
  try {
    connectToDB();
    const newPost = new Post({
      title: title,
      desc: desc,
      slug: slug,
      userId: userId,
    });
    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
  } catch (err) {
    console.log(err);
    return { error: "something went wrong" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
  } catch (err) {
    console.log(err);
    return { error: "something went wrong" };
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (formData) => {
  const { username, password, email, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return {error: "Passwords do not match"};
  }
  try {
    connectToDB();
    const user = await User.findOne({ username });
    if (user) {
      return {error: "User Already Exists"};
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("saved to db");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};

export const login = async (formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);
  }
};
