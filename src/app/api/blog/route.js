import { Post } from "@/lib/models";
import { connectToDB } from "@/lib/utlis";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDB();
    const posts = await Post.find();
    // console.log(posts)
    return NextResponse.json(posts);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts");
  }
};
