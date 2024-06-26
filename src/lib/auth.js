import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { connectToDb } from "./utils"
import { User } from "./models"
import bcrypt from "bcrypt"

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    // debug: true,
    providers:
        [
            GitHub(
                {
                    clientId: process.env.GITHUB_ID,
                    clientSecret: process.env.GITHUB_SECRET
                }
            ),
            Credentials({
                authorize: async (credentials) => {
                    try {
                        await connectToDb()
                        const user = await User.findOne({ username: credentials.username })
                        if (!user) {
                            throw new Error("No user found!")
                        }

                        const isValid = await bcrypt.compare(credentials.password, user.password)
                        if (!isValid) {
                            throw new Error("Password is incorrect!")
                        }

                        return user
                    } catch (error) {
                        console.log(error)
                        return null
                    }
                }
            })
        ],
    callbacks: {
        //     async signIn({ account, profile }) {
        //         if (account.provider === "github") {
        //             connectToDb()
        //             // check if user exists in the database
        //             try {
        //                 const existingUser = await User.findOne({ email: profile.email })
        //                 if (existingUser) {
        //                     return true
        //                 }
        //                 // create a new user
        //                 await new User({
        //                     email: profile.email,
        //                     username: profile.login,
        //                     image: profile.avatar_url
        //                 }).save()
        //                 return true

        //             } catch (error) {
        //                 console.log(error)
        //                 return false
        //             }
        //         }
        //     }
        ...authConfig.callbacks
    }
})
