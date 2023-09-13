import RichText from '@madebyconnor/rich-text-to-jsx';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export type StructuredPost = {
    title: string,
    createTime: string,
    richText: NotionRichText[],
}

type NotionRichText = {
    type: string,
    text: {content: string, link: string | undefined},
    plain_text: string,
    href: string | undefined,
    annotations: {bold: boolean, italic: boolean, strikethrough: boolean, underline: boolean, code: boolean, color: string},
}

const annotationKeys = ['bold', 'italic', 'strikethrough', 'underline', 'code']

const BlogPost = (post: StructuredPost) => {
    return (
    <div className="flex flex-col mx-10 my-3 border-b-2 p-2">
        <div className="flex flex-row justify-between my-1">
            <div className="font-bold text-2xl">
                {post.title}
            </div>
            <div>
                {iso2Common(post.createTime)}
            </div>
        </div>
        <pre className="whitespace-pre-wrap font-sans text-xl">
            {post.richText.map((richText) => {
                return richText2HTML(richText)
                })
            }</pre>
    </div>
    )
    }

const iso2Common = (isoString : string): string => {
    const year = isoString.substring(0, 4)
    const month = months.get(isoString.substring(5, 7))
    const day = isoString.substring(8, 10)

    return `${month} ${day}, ${year}`
}

const richText2HTML = (richText: NotionRichText) => {
    console.log(richText)
    const marks = annotationKeys.filter((annotation) => 
        // @ts-ignore
        richText.annotations[annotation]
        ).map((annotation) => {
            return {type: annotation}
        })

    const nodeType = richText.href ? INLINES.HYPERLINK : 'text'

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
            className={'text-blue-500 underline ' + annotations}
            target='_blank'
        >
            {node.target.value.content}
        </a>
    )}
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