import Image from 'next/image'
import type { GetServerSideProps, NextPage } from 'next';
import { getBlogPosts } from '../lib/notion'
import BlogPost, { StructuredPost } from '@/components/blogpost';
import '../app/globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300','400','700']
})


type BlogProps = {
  posts: StructuredPost[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  console.log("Initializing blog")
  return (
    <main className={roboto.className + 
      " bg-primary text-text dark:bg-dark-primary dark:text-dark-text h-full \
        lg:text-lg\
        mx-8 md:mx-32 lg:mx-96"}> 
      <div className="pt-10">
        <div className="text-2xl lg:text-4xl">
          Dev Journal
        </div>
        <div>
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