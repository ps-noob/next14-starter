import { Post } from "@/lib/models";
import { connectToDB } from "@/lib/utlis";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { slug } = params;
  try {
    connectToDB();
    const post = await Post.findOne({slug});
    console.log()
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get Post Data");
  }
};
