import { StructuredPost } from '@/components/blogpost';
import { Client } from '@notionhq/client';

type Post = {
  title: {id: string; type: string; title: { text: {content: string} }[] };
  entry: {id: string; type: string; rich_text: { text: {content: string} }[] };
  systemCreateTime: {id: string; type: string; created_time: string};
  createTime: {id: string; type: string; date: {start: string; end: string | undefined; time_zone: string | undefined}}
};

const notionAPIKey = process.env.NOTION_API_KEY
const notionDatabaseId = process.env.NOTION_DATABASE_ID

const notion = new Client({ auth: notionAPIKey });
export async function getBlogPosts() {
  console.log("Getting blog posts");
    if (!notionAPIKey) throw new Error("Missing Notion Secret Key. Find it at www.notion.so/my-integrations")
    if (!notionDatabaseId) throw new Error("Missing Notion Database ID. Find it on the database webview")

    const res = await notion.databases.query({
        database_id: notionDatabaseId
    });
    // @ts-ignore
    console.log(res.results.forEach((res) => console.log(res.properties)))

    // @ts-ignore
    const posts = res.results.map((res) => res.properties) as Row[]

    const structuredPosts = posts.map((post: Post) => ({
      title: post.title.title[0].text.content,
      createTime: post.createTime ? post.createTime.date.start : post.systemCreateTime.created_time,
      richText: post.entry.rich_text,
    }))

    return structuredPosts
}