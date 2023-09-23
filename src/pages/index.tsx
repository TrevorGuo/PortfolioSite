import Navbar from '@/components/navbar'
import '../app/globals.css'
import { Lato } from "next/font/google"
import Down from "@heroicons/react/24/outline/ChevronDownIcon"
import Projects from '@/components/projects'
import Link from 'next/link'
import { getProjects } from '@/lib/notion'
import { NextPage } from 'next/types'
import { StructuredProjectPost } from '@/components/projectpost'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300','400','700']
})

type ProjectProps = {
  posts: StructuredProjectPost[];
};

const Index: NextPage<ProjectProps> = ({posts}) => {
  console.log("Displaying landing page")
  return(
    <main className="
      bg-secondary text-text dark:bg-dark-secondary dark:text-dark-text 
        block overflow-auto
        h-screen scroll-smooth">
      <div id="home"></div>
      <Navbar />
      <div className={lato.className + " h-4/5 text-6xl font-thin"}>
        <div className="relative top-1/2 -translate-y-full text-center">
          Trevor Guo
        </div>
      </div>
      <div className="h-1/10 flex justify-center items-center group">
        <p className="hidden text-right group-hover:block">Scroll Down</p>
        <Link href="#experience" className="w-[7.5%]"><Down className="h-full mx-4 animate-bounce"/></Link>
        <p className="hidden group-hover:block">For More&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </div>
      <div id="experience">
        <Projects posts={posts}/>
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  console.log("Fetching server side props");
  const posts = await getProjects();

  return {
    props: {
      posts,
    },
  };
};

export default Index;