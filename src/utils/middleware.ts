
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token) 
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token 
    },
  }
)


export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    'dashboard/projects/addProject',
    'dashboard/projects/addBlog',
    'dashboard/projects/manageProject',
    'dashboard/projects/manageBlog',
    'dashboard/projects/manageBlog/update/:id',
    'dashboard/projects/manageProject/update/:id',
  ]
}