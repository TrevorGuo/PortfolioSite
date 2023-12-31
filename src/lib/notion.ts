import { StructuredPost } from '@/components/blogpost';
import { Client } from '@notionhq/client';

type BlogPost = {
  title: {id: string; type: string; title: { text: {content: string} }[] };
  entry: {id: string; type: string; rich_text: { text: {content: string} }[] };
  systemCreateTime: {id: string; type: string; created_time: string};
  createTime: {id: string; type: string; date: {start: string; end: string | undefined; time_zone: string | undefined}}
};

type ProjectPost = {
  title: {id: string; type: string; title: { text: {content: string} }[] };
  description: {id: string; type: string; rich_text: { text: {content: string} }[] };
  pictures: {id: string; type: string; files: { name: string; type: string; file: {url: string; expiry_time: string;}}[] };
};


const notionAPIKey = process.env.NOTION_API_KEY
const notionBlogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID
const notionProjectDatabaseId = process.env.NOTION_PROJECT_DATABASE_ID

const notion = new Client({ auth: notionAPIKey });
export async function getBlogPosts() {
  console.log("Getting blog posts");

  if (!notionAPIKey) throw new Error("Missing Notion Secret Key. Find it at www.notion.so/my-integrations")
  if (!notionBlogDatabaseId) throw new Error("Missing Notion Database ID. Find it on the database webview")

  const res = await notion.databases.query({
    database_id: notionBlogDatabaseId
  });

  // @ts-ignore
  const posts = res.results.map((res) => res.properties) as Row[]

  const structuredPosts = posts.map((post: BlogPost) => ({
    title: post.title.title[0].text.content,
    createTime: post.createTime.date ? post.createTime.date.start : post.systemCreateTime.created_time,
    richText: post.entry.rich_text,
  }))

  return structuredPosts
}

export async function getProjects() {
  console.log("Getting projects!");
  if (!notionAPIKey) throw new Error("Missing Notion Secret Key. Find it at www.notion.so/my-integrations")
  if (!notionProjectDatabaseId) throw new Error("Missing Notion Database ID. Find it on the database webview")

  const res = await notion.databases.query({
    database_id: notionProjectDatabaseId,
    sorts: [
      {
        property: "order",
        direction: "ascending"
      }
    ]
  });

  // @ts-ignore
  console.log(res.results.forEach((res) => console.log(res.properties)))

  // @ts-ignore
  const posts = res.results.map((res) => res.properties) as Row[]

  const structuredPosts = posts.map((post: ProjectPost) => ({
    title: post.title.title[0].text.content,
    description: post.description.rich_text,
    pictures: post.pictures.files,
  }))

  return structuredPosts
}