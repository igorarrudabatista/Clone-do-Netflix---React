import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';



export default () => {

const [movieList, setMovieList] = useState([]);
const [FeaturedData, setFeaturedData] = useState(null);
const [blackheader, setBlackHeader] = useState(false);
  useEffect (() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      //Receber o Featured       
  
      let originals = list.filter(i=>i.slug ==='originals');
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');  
      setFeaturedData(chosenInfo);
    }


  loadAll();
  

  },  []);

useEffect(()=> {
  const scrollListener = () =>{
    if(window.scrollY > 200) {
      setBlackHeader(true);
    
    } else {
      setBlackHeader(false);
    }
  }
    window.addEventListener('scroll', scrollListener);
    return()=> {
      window.removeEventListener('scroll', scrollListener);
    }
  },

[]);

 // heaader
 //Destaque
//As listas
//Rodapé

  return( 
  
<div className='page'>
<Header black={blackheader} />
  {FeaturedData && 
    <FeaturedMovie item={FeaturedData} /> }
    <section className='lists'>
      {movieList.map((item, key) => (
    
    <MovieRow key={key} title={item.title} items={item.items} />
    
    ))}
  </section>

  <footer>
      <center> 
      Feito com <span role="img" aria-label="coração"> HEART </span>
      </center>
  </footer>

        {movieList.length <= 0 && 
  <div className='loading'>
    <img src="/img/netflix.gif" />
  </div>
  }
</div>

  )
}