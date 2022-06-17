import Link from "next/link";

export default function Post({ post }) {
  return (
    <div class="card">
      <img src={post.frontmatter.cover_image} alt="" />

      <div class="post-date">Posted on {post.frontmatter.date}</div>

      <h3>{post.frontmatter.title}</h3>

      <p>{post.frontmatter.excerpt}</p>

      <Link href={`/blog/${post.slug}`}>
        <a class="btn">Read More</a>
      </Link>
    </div>
  );
}
