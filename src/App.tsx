import { BrowserRouter as Router } from "react-router-dom"

import { PostsManager as PostsManagerPage } from "@pages/post-manager"

import { Footer } from "@widgets/footer"
import { Header } from "@widgets/header"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
