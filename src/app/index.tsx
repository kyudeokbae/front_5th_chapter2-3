import { BrowserRouter as Router } from "react-router-dom"
import PostsManagerPage from "../pages/PostsManagerPage.tsx"
import { Footer } from "../widgets/footer/footer.ui.tsx"
import { Header } from "../widgets/header/header.ui.tsx"

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
