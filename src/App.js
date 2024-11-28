import Header from './components/header/Header';
import SearchBar from "./components/search/Searchbar";
import PostsList from "./components/posts/PostsList";
import './index.css';

function App() {
  return (
    <div className="App">
        <Header />
        <SearchBar />
        <PostsList />
    </div>
  );
}

export default App;
