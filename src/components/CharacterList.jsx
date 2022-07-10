
import { useState, useEffect} from 'react';

import Character from './Character';

function NavedorPaginas(props){
  return (
    <header className='d-flex justify-content-between aling-items-center'>
      <p>Pagina: {props.page}</p>
      <button className='btn btn-primary btn-sm'
       onClick={() => props.setpage(props.page + 1)}
      >
        Page {props.page + 1}
      </button>

     
    </header>
  )
}

function NavedorPaginaAtras(props){
  return (
    <header className='d-flex justify-content-between aling-items-center'>
      
      <button className='btn btn-primary btn-sm'
       onClick={() => props.setpage(props.page - 1)}
      >
        Back Page
      </button>

     
    </header>
  )
}


function CharacterList() {

  const [character, setcharacter] = useState([]);

  const [loading, setloading] = useState(true);

  //aqui creo una constante para guardar el primer valor de la pagina cuando se incia al principio
  //este valor cambia al cambiar de pagina

  const [page , setpage]=useState(1);

    useEffect(()=>{

      async function fechData(){

        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        setloading(false);
        setcharacter(data.results);


      }

      fechData();
     //aqui le agrego el page para que cuando vuelva a cargar y consultar los datos a la api
    },[page]);


  return (
    //el primer div con la className container los coloca uno debajo del otro
    //el otro div con la claseName row coloca uno a la par del otro
    //el col-md-4 los coloca de tres en tres
    <div className='container'>

      <NavedorPaginas page={page} setpage={setpage}/>
      <NavedorPaginaAtras page={page} setpage={setpage}/>
    

        {
          loading ? (
            <div>Loading...</div>
          ):(
            <div className="row">
        
            {
              character.map((character)=>{
                return(
                  <div className="col-md-4" key={character.id}>
                    <Character  character={character}/>
                  </div>
                
                );
              })
            }
    
          </div>
          )
        }
     
    
    </div>
  );
}

export default CharacterList