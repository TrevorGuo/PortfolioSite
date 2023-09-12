import Image from 'next/image'
import type { GetServerSideProps, NextPage } from 'next';
import { getBlogPosts } from '../lib/notion'
import BlogPost, { StructuredPost } from '@/components/blogpost';
import '../app/globals.css'

type BlogProps = {
  posts: StructuredPost[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  console.log(posts)
  return (
    <main className="my-5">
      <div className="text-center text-5xl font-bold font-sans">
        Dev Journal
      </div>
      {posts.map((post) => {
        return (
          <BlogPost
            key={post.createTime}
            title={post.title}
            entry={post.entry}
            createTime={post.createTime}
          />
        )
      })}
    </main>
  );
};

export async function getServerSideProps() {
  console.log("Fetching server side props");
  const posts = await getBlogPosts();
  console.log(posts)

  return {
    props: {
      posts,
    },
  };
};

export default Blog;