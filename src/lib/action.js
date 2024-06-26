'use server'

import { revalidatePath } from "next/cache"
import { signIn, signOut } from "./auth"
import { Post, User } from "./models"
import { connectToDb } from "./utils"
import bcrypt from "bcrypt"


export const addPost = async (prevState, formData) => {
    const { title, desc, slug, userId } = Object.fromEntries(formData)

    try {
        await connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
        })

        await newPost.save()
        console.log("saved to db")
        revalidatePath("/blog")
        revalidatePath("/admin")
        return { success: "Post added successfully!" }

    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" }
    }
}

// export const editPost = async (prevState, formData) => {
//     const { id, title, desc, slug } = Object.fromEntries(formData)

//     try {
//         connectToDb()
//         await Post.findByIdAndUpdate(id, { title, desc, slug })
//         console.log("updated in db")
//         revalidatePath("/posts")
//         revalidatePath("/admin")
//     }
//     catch (err) {
//         console.log(err)
//         return { error: "Something went wrong!" }
//     }
// }

export const deletePost = async (formData) => {
    try {
        const { id } = Object.fromEntries(formData)

        await connectToDb()
        await Post.findByIdAndDelete(id)
        console.log("deleted from db")
        revalidatePath("/posts") // to update the blog page after deleting a post 
        revalidatePath("/admin")
    } catch (err) {
        console.log(err)
        return { error: "Something went wrong!" }
    }
}

export const addUser = async (prevState, formData) => {
    const { username, email, password, img } = Object.fromEntries(formData)

    try {
        connectToDb()
        const newUser = new User({
            username,
            email,
            password,
            img,
        });

        await newUser.save()
        console.log("saved to db")
        revalidatePath("/admin")
    } catch (err) {
        console.log(err)
        return { error: "Something went wrong!" }
    }
}

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb()

        await Post.deleteMany({ userId: id }) // delete all posts by the user first 
        await User.findByIdAndDelete(id)
        console.log("deleted from db")
        revalidatePath("/admin")
    } catch (err) {
        console.log(err)
        return { error: "Something went wrong!" }
    }
};

// Login function with social media providers (GitHub)
export const handleGithubLogin = async () => {
    await signIn('github')
}

// Logout function
export const handleLogout = async () => {
    await signOut()
}

// Login function with credentials
export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData)

    try {
        await signIn('credentials', { username, password })
        // return { success: true }

    } catch (err) {
        // if (err.message.includes("CredentialsSignin")) {
        //     return { error: 'Invalid username or password!' }
        // }
        return { error: 'Something went wrong!' }
    }
}

export const register = async (prevState, formData) => {
    const { username, email, img, password, confirmPassword } = Object.fromEntries(formData)

    if (password !== confirmPassword) {
        return { error: 'Passwords do not match!' }
    }

    connectToDb()
    try {
        // check if user exists in the database by username
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return { error: 'User already exists!' }
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create a new user
        await new User({
            email,
            username,
            img,
            password: hashedPassword
        }).save()

        return { success: 'User created successfully' }

    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong!' }
    }
}
