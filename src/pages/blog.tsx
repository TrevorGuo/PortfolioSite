import Image from 'next/image'
import type { GetServerSideProps, NextPage } from 'next';
import { getBlogPosts } from '../lib/notion'
import BlogPost, { StructuredPost } from '@/components/blogpost';
import '../app/globals.css'
import { Roboto } from 'next/font/google'
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/20/solid';

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
        lg:text-lg \
        mx-8 md:mx-32 lg:mx-48 xl:mx-64"}> 
      <div className="h-1/10 my-5 w-[2%]">
        <Link href="/">
          <HomeIcon />
        </Link>
      </div>
      <div>
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

  return {
    props: {
      posts,
    },
  };
};

export default Blog;