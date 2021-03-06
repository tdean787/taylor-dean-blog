import fs from "fs";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import Head from "next/head";

import React from "react";

export default function Blog({ frontmatter, markdown }) {
  return (
    <div>
      <Head>
        <title>Taylor Dean | {frontmatter.title}</title>
      </Head>
      <h1>{frontmatter.title}</h1>
      <span>{frontmatter.date}</span>
      <hr />

      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const fileContent = matter(
    fs.readFileSync(`./content/blogs/${slug}.md`, "utf8")
  );
  let frontmatter = fileContent.data;
  const markdown = fileContent.content;

  return {
    props: { frontmatter, markdown },
  };
}

export async function getStaticPaths() {
  const filesInProjects = fs.readdirSync("./content/blogs");

  const paths = filesInProjects.map((file) => {
    const filename = file.slice(0, file.indexOf("."));
    return { params: { slug: filename } };
  });

  return {
    paths,
    fallback: false,
  };
}
