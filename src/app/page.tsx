'use client';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  // const { data: session } = useSession()
  // if (session) {
  //   return <>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  // return <>
  //   Not signed in <br />
  //   <button onClick={() => signIn()}>Sign in</button>
  // </>
  return (
    <section className="py-24 h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
      </div>
    </section>
  )
}