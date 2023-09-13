import Image from 'next/image'
import type { GetServerSideProps, NextPage } from 'next';
import { getBlogPosts } from '../lib/notion'
import BlogPost, { StructuredPost } from '@/components/blogpost';
import '../app/globals.css'

type BlogProps = {
  posts: StructuredPost[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  console.log("Initializing blog")
  return (
    <main className="dark:bg-primary dark: text-text h-full">
      <div className="p-5 text-center font-bold font-sans">
        <div className="text-5xl">
          Dev Journal
        </div>
        <div className="text-3xl">
          Trevor Guo
      </div>
      </div>
      {posts.map((post) => {
        return (
          <BlogPost
            key={post.createTime}
            title={post.title}
            createTime={post.createTime}
            richText={post.richText}
          />
        )
      })}
    </main>
  );
};

export async function getServerSideProps() {
  console.log("Fetching server side props");
  const posts = await getBlogPosts();
  console.log("Posts")

  return {
    props: {
      posts,
    },
  };
};

export default Blog;