import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";

const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {next:{revalidate: 3600}});
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const getDataWithAPIroute = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {next:{revalidate:3600}});
  if(!res.ok){
    throw new Error("Something is wrong");
  }

  return res.json();
}

const BlogPage = async ({ params, searchParams }) => {
  //console.log(params, searchParams)

  //FETCH DATA FROM API
  // const posts = await getData();

  //FETCH FROM SERVER ACTION
  //const posts = await getPosts();

  //FETCH DATA FROM API ROUTE
  const posts = await getDataWithAPIroute();
  console.log(posts)

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
