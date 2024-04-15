import Image from "next/image";
import styles from "./singlepost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

const getData = async ({ params }) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${params.slug}`;
  // console.log(url);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const getPostByAPIRoute = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/blog/${params.slug}`);
  console.log(res);
  if (!res.ok) {
    throw new Error("Something is wrong");
  }

  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};

const SinglePostPage = async ({ params, searchParams }) => {
  // const { slug } = { params };
  // console.log(params, searchParams);

  //FETCH DATA USING server action
  //const post = await getData({ params });

  //FETCH DATA FROM DB
  // const post = await getPost(params.slug);

  //FETCH DATA USING API ROUTE
  const post = await getPostByAPIRoute({ params });
  console.log(post);

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post?.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post?.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
