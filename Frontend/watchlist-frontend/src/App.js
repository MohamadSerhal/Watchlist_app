import 'bootstrap/dist/css/bootstrap.css';
//import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import {useState} from 'react';
import AnimeAdder from './Adding/AddAnime.js';
import MangaAdder from './Adding/AddManga.js';
import WatchedAnime from './fetching/watchedAnime.js';
import ToWatchAnime from './fetching/toWatchAnime.js';
import WatchingAnime from './fetching/watchingAnime.js';
import ToReadManga from './fetching/toReadManga.js';
import ReadingManga from './fetching/readingManga.js';
import ReadManga from './fetching/ReadManga.js';


const States = {
  ANIME: "ANIME",
  MANGA: "MANGA",
 };

const AnimeStates = {
  WATCHED: "Watched",
  TOWATCH: "To watch",
  WATCHING: "Watching",
  ADDANIME: "Add anime",
}

const MangaStates = {
  READ: "Read",
  TOREAD: "To read",
  READING: "Reading",
  ADDMANGA: "Add manga",
}



function App() {

  let [currState, setCurrentState] = useState(States.ANIME);
  let [animeStatus, setAnimeStatus] = useState(AnimeStates.TOWATCH);
  let [mangaStatus, setMangaStatus] = useState(MangaStates.TOREAD);

  function setComponent(){
    if (currState===States.ANIME && animeStatus===AnimeStates.ADDANIME) {
      return <AnimeAdder/>
    }
    else if (currState===States.MANGA && mangaStatus===MangaStates.ADDMANGA) {
      return <MangaAdder/>
    }
    else if (currState===States.ANIME && animeStatus===AnimeStates.WATCHED) {
      return <WatchedAnime/>
    }
    else if (currState===States.ANIME && animeStatus===AnimeStates.TOWATCH) {
      return <ToWatchAnime/>
    }
    else if (currState===States.ANIME && animeStatus===AnimeStates.WATCHING) {
      return <WatchingAnime/>
    }
    else if (currState===States.MANGA && mangaStatus===MangaStates.TOREAD) {
      return <ToReadManga/>
    }
    else if (currState===States.MANGA && mangaStatus===MangaStates.READING) {
      return <ReadingManga/>
    }
    else if (currState===States.MANGA && mangaStatus===MangaStates.READ) {
      return <ReadManga/>
    }
    else return null;
  }

  return (
    <div>

    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Anime And Manga List Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" variant="pills">
          <NavDropdown title={currState===States.ANIME? "Anime" : "Manga"} id="basic-nav-dropdown" style={{marginRight:"40"}}>
            <NavDropdown.Item onClick={()=> setCurrentState(States.ANIME)}>Anime</NavDropdown.Item>
            <NavDropdown.Item onClick={()=> setCurrentState(States.MANGA)}>Manga</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link onClick={()=> {currState===States.ANIME? setAnimeStatus(AnimeStates.TOWATCH): setMangaStatus(MangaStates.TOREAD)}}>
                    {currState===States.ANIME? "To Watch" : "To Read"}</Nav.Link>
          <Nav.Link onClick={()=> {currState===States.ANIME? setAnimeStatus(AnimeStates.WATCHING): setMangaStatus(MangaStates.READING)}}>
                    {currState===States.ANIME? "Watching" : "Reading"}</Nav.Link>
          <Nav.Link onClick={()=> {currState===States.ANIME? setAnimeStatus(AnimeStates.WATCHED): setMangaStatus(MangaStates.READ)}}>
                    {currState===States.ANIME? "Watched" : "Read"}</Nav.Link>
          <Nav.Link onClick={()=> {currState===States.ANIME? setAnimeStatus(AnimeStates.ADDANIME): setMangaStatus(MangaStates.ADDMANGA)}}>
                    {currState===States.ANIME? "Add Anime" : "Add Manga"}</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
  </Navbar>

  <div> {setComponent()} </div>
  
  </div>
  );
}

export default App;
