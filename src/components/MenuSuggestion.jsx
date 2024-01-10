import React, { useState } from 'react';
import * as config from "../config.js";
import Loader from './Loader.jsx';
import OutputMenu from './OutputMenuSuggestion.jsx';

const MenuSuggestion = () => {
  const [servings, setServings] = useState('');
  const [output, setOuput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiHit, setApiHit] = useState(false);

  const handleInputChange = (e) => {
    setServings(e.target.value);
  };

  const handleButtonClick = () => {
    setApiHit(true)
    setLoading(true)
    const recipeData = JSON.parse(localStorage.getItem('recipe'));
    console.log("recipeData",recipeData)
    fetch(`${config.baseUrl}/get_menu_suggestion`,{
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ingredients": recipeData.ingredients,
            "instructions": recipeData.instructions,
            "yields": recipeData.yields,
            "servings": servings
        })
    })
    .then((response) =>{
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        response.json()
        .then((data) => {
            console.log(data);
            setOuput(data)
        })
    }).finally(() => {
        setLoading(false);
        setApiHit(false);
    })
  };
  return (
    <div>
    <div className="flex justify-center items-center mt-8 ">
    <h1 className="flex-start font-bold mr-10"> Suggest Menu</h1>
      <input
        type="text"
        placeholder="Enter Servings"
        value={servings}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
      />
      
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:ring focus:border-blue-300"
      >
        Submit
      </button>
      
    </div>
    <div className="flex justify-center mt-4">
        {loading && <Loader /> }
        {output.scaled_recipe && <OutputMenu output={output}/>}
    </div>
    </div>
  );
};

export default MenuSuggestion;