import React from 'react'

function HomePage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div>
        <h1 className="text-white text-5xl">Home Page</h1>
        <p className="text-gray-400 mt-4">Welcome to the SignFlow App!</p>
        <p className="text-gray-400 mt-4">Please login or register to continue</p>
        <p className="text-gray-400 mt-4">This is a simple signin document app using Next.js and NextAuth</p>
      </div>
    </section>
  )
}

export default HomePage
