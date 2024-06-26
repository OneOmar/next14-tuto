import { Post } from "@/lib/models"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"


export const GET = async (req, { params }) => {
    // const { slug } = req.params
    const { slug } = params

    try {
        await connectToDb()
        const post = await Post.findOne({ slug })
        return NextResponse.json(post)

    } catch (error) {
        console.log(error)
        return NextResponse.error(error)
    }
}

// export const POST = async (req) => {
//     const { title, desc, img } = req.body

//     try {
//         await connectToDb()
//         const post = new Post({ title, desc, img })
//         await post.save()
//         return NextResponse.json(post)

//     } catch (error) {
//         console.log(error)
//         return NextResponse.error(error)
//     }
// }

// export const PUT = async (req) => {
//     const { slug } = req.params
//     const { title, desc, img } = req.body

//     try {
//         await connectToDb()
//         const post = await Post.findOne({
//             slug
//         })
//         post.title = title
//         post.desc = desc
//         post.img = img
//         await post.save()
//         return NextResponse.json(post)
//     } catch (error) {
//         console.log(error)
//         return NextResponse.error(error)
//     }
// }

export const DELETE = async (req, { params }) => {
    const { slug } = params

    try {
        await connectToDb()
        await Post.deleteOne({ slug })
        return NextResponse.json({ message: "Post deleted successfully" })
    } catch (error) {
        console.log(error)
        return NextResponse.error(error)
    }
}