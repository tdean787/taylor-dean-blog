import fs from "fs";
import path from "path";
import Head from "next/head";
import matter from "gray-matter";
import Link from "next/link";
import Post from "../components/Post";

export default function Home({ blogs }) {
  return (
    <div>
      <Head>
        <title>Taylor Dean</title>
      </Head>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link href={`/blog/${blog.slug}`}>
              <a>
                {blog.date}:{blog.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the posts dir
  const blogFiles = fs.readdirSync("./content/blogs");

  // Get slug and frontmatter from posts
  const blogs = blogFiles.map((filename) => {
    const file = fs.readFileSync(`./content/blogs/${filename}`, "utf8");
    const matterData = matter(file);

    return {
      ...matterData.data,
      slug: filename.slice(0, filename.indexOf(".")),
    };
  });

  return {
    props: {
      blogs,
    },
  };
}
