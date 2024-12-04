import Header from './components/header/Header';
import SearchBar from "./components/search/Searchbar";
import PostsList from "./components/posts/PostsList";
import './index.css';
import Banner from "./components/banner/Banner";

function App() {
  return (
    <div className="App">
        <Header />
        <Banner />
        <SearchBar />
        <PostsList />
    </div>
  );
}

export default App;
