import React from 'react'
import "../CSS/loader.css";
import { 
    FaGamepad 
} from 'react-icons/fa';


const Loader = () => {
  return (
    <div className='mainContainer loader'>
        <section className="loaderContainer">
            {/* <h3><FaGamepad className='faIcons'/></h3> */}
            <img src={require('../assets/imgs/GifLoader.gif')} alt="" />
            <h6>LOADING...</h6>
        </section>
    </div>
  )
}

export default Loader