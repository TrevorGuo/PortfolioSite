export type StructuredPost = {
    title: string,
    entry: string,
    createTime: string,
};

const BlogPost = (post: StructuredPost) => 
    <div className="flex flex-col mx-10 my-3 border-b-2 p-2">
        <div className="flex flex-row justify-between my-1">
            <div className="font-bold text-2xl">
                {post.title}
            </div>
            <div>
                {iso2Common(post.createTime)}
            </div>
        </div>
        <div className="w-full">
            <pre className="w-full whitespace-pre-wrap"
            >{post.entry}</pre>
        </div>
    </div>

const iso2Common = (isoString : string): string => {
    const year = isoString.substring(0, 4)
    const month = months.get(isoString.substring(5, 7))
    const day = isoString.substring(8, 10)

    return `${month} ${day}, ${year}`
}

const months = new Map<string, string>([
    ["01", "January"],
    ["02", "February"],
    ["03", "March"],
    ["04", "April"],
    ["05", "May"],
    ["06", "June"],
    ["07", "July"],
    ["08", "August"],
    ["09", "September"],
    ["10", "October"],
    ["11", "November"],
    ["12", "December"],
]);




export default BlogPost;