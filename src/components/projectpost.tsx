import RichText from '@madebyconnor/rich-text-to-jsx';
import { BLOCKS, INLINES } from "@contentful/rich-text-types"

export type StructuredProjectPost = {
    title: string,
    description: NotionRichText[],
    pictures: Image[],
}

//refactor to notion.ts
type NotionRichText = {
    type: string,
    text: {content: string, link: string | undefined},
    plain_text: string,
    href: string | undefined,
    annotations: {bold: boolean, italic: boolean, strikethrough: boolean, underline: boolean, code: boolean, color: string},
}

type Image = {
    name: string,
    type: string,
    file: {url: string, expiry_time: string},
}

const ProjectPost = (post: StructuredProjectPost) => {
    return (
        <div className="flex flex-row p-5 m-5">
            <div className="w-1/4 mx-5">
                <div className="text-3xl mb-3">
                    {post.title}
                </div>
                {
                    post.pictures.length > 0 ?
                        <div className="w-1/2">
                            <img src={post.pictures[0].file.url}></img>
                        </div> :
                        null
                }
            </div>
            <pre className="w-2/3 ml-5 whitespace-pre-wrap font-light">
                {post.description.map((richText) => {
                    return richText2HTML(richText)
                })}
            </pre>
            <div>
                {post.pictures.slice(1).map((picture) => {
                    return (
                        <img src={picture.file.url}></img>
                    )
                    })
                }
            </div>
        </div>
    )
}

// TODO: Refactor this later
const annotationKeys = ["bold", "italic", "strikethrough", "underline", "code"]

const richText2HTML = (richText: NotionRichText) => {
    const marks = annotationKeys.filter((annotation) => 
        // @ts-ignore
        richText.annotations[annotation]
        ).map((annotation) => {
            return {type: annotation}
        })

    const nodeType = richText.href ? INLINES.HYPERLINK : "text"

    const data = richText.href ? {
        target: {
            value: richText.text,
            marks: marks,
        }
    } : {}
        
    const rt = {
        data: data,
        content: [
            {
            data: data,
            marks: marks,
            value: richText.text.content,
            nodeType: nodeType,
            },
        ],
        nodeType: BLOCKS.PARAGRAPH,
    };

    return <RichText richText={rt} overrides={overrides}/>
}

const overrides = {
    [INLINES.HYPERLINK]: (node: any) => {
        const annotations = node.target.marks.map((annotation: any) => {
            return annotation.type
        })

        return (
        <a href={node.target.value.link.url}
            className={"text-blue-500 underline " + annotations}
            target="_blank"
        >
            {node.target.value.content}
        </a>
    )},
}

export default ProjectPost;