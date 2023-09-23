import { getProjects } from "@/lib/notion";
import { Roboto } from "next/font/google";
import ProjectPost, { StructuredProjectPost } from "./projectpost";
import Up from "@heroicons/react/24/outline/ChevronUpIcon"
import Link from "next/link";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['300','400','700']
})

const Projects = ({ posts }: {posts: StructuredProjectPost[]}) => {
    console.log(posts)
    return(
        <div className="bg-primary text-text dark:bg-dark-primary dark:text-dark-text \
            h-fit min-h-screen">
            <div className={roboto.className + 
                " lg:text-lg \
                mx-8 md:mx-32 lg:mx-48 xl:mx-64"}>
                <div className="text-center text-5xl p-7 font-light">
                    Experiences
                </div>
                {posts.map((post => {
                    return (
                        <ProjectPost
                            title={post.title}
                            description={post.description}
                            pictures={post.pictures}
                        />
                    );
                }))}
                
            </div>
            <div className="h-10 flex flex-row justify-center">
                <Link href="#home"><Up className="h-full"> </Up></Link>
            </div>
            <div className="text-center text-sm">
                <Link href="#home">Return to Top</Link>
            </div>
        </div>
    )
}

export default Projects;