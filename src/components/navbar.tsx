import Link from "next/link"

const buttons = [{name: "Experience", link: "#experience"}, 
                 {name: "Blog", link: "/blog"},
                 {name: "Contact", link: "/contact"}]

const Navbar = () => {
    return (
    <div className="h-1/10">
        <div className="hidden md:flex flex-row justify-end 
            m-5 font-sans">
            {buttons.map((button, idx) => {
                return(
                    <Link href={button.link} className="mx-5" scroll={false} key={idx}>
                        {button.name}
                    </Link>
                )
            })}
        </div>
    </div>
    )
}

export default Navbar