export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.isAdmin = user.isAdmin
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.user.isAdmin = token.isAdmin
            return session
        },
        authorized({ auth, request }) {
            const user = auth?.user

            // CHECK THE PANELS 
            const isAdminPage = request.nextUrl?.pathname.startsWith('/admin')
            const isPostsPage = request.nextUrl?.pathname.startsWith('/posts')
            const isLoginPage = request.nextUrl?.pathname.startsWith('/login')

            // ONLY ADMIN CAN ACCESS ADMIN PAGE
            if (isAdminPage && !user?.isAdmin) {
                return false
            }

            // ONLY AUTHENTICATED USERS CAN ACCESS POSTS PAGE
            if (isPostsPage && !user) {
                return false
            }

            // ONLY GUESTS CAN ACCESS LOGIN PAGE
            if (isLoginPage && user) {
                // REDIRECT TO THE HOME PAGE
                return Response.redirect(new URL('/', request.nextUrl))


            }

            return true
        }
    }
}
