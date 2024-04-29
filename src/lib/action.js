"use server";



import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDB } from "./utlis";
import { signIn, signOut } from "./auth";

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
  await signIn("github")
}

export const handleLogout = async () => {
  await signOut()
}