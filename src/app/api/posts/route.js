
import { Post } from "@/lib/models"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    // FETCH ALL POSTS
    try {
        await connectToDb()
        const posts = await Post.find()
        return NextResponse.json(posts)
    } catch (error) {
        console.log(error)
        return NextResponse.error(error)
    }
}
