//Vite is the dev server that runs your React code locally, converts it into browser-readable JavaScript, and serves it on localhost so you can see your app while developing.
import Navbar from "../components/navbar";
const HomePage = () => {
  const [rateLimited, setIsRateLimited] = useState(false);
    return (
      <div className="min-h-screen">
        <Navbar />
        {isRateLImited && <RateLimitedUI />}
      </div>
    )
  }
  
  export default HomePage;