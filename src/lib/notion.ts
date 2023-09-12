import { StructuredPost } from '@/components/blogpost';
import { Client } from '@notionhq/client';

type Post = {
  title: {id: string; type: string; title: { text: {content: string} }[] };
  entry: {id: string; type: string; rich_text: { text: {content: string} }[] };
  createTime: {id: string; type: string; created_time: string};
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
    })
    console.log(res)

    // @ts-ignore
    const posts = res.results.map((res) => res.properties) as Row[]

    const structuredPosts = posts.map((post) => ({
      title: post.title.title[0].text.content,
      entry: post.entry.rich_text[0].text.content,
      createTime: post.createTime.created_time,
    }))

    return structuredPosts
}