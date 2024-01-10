import React, { useState } from 'react';
import * as config from "../config.js";
import Loader from './Loader.jsx';
import Output from './Output.jsx';

const UrlInput = () => {
  const [url, setUrl] = useState('');
  const [output, setOuput] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleButtonClick = () => {
    setLoading(true)
    fetch(`${config.baseUrl}/scrape_recipe`,{
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "link": url
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
            localStorage.setItem('recipe', JSON.stringify(data));
        })
    }).finally(() => {
        setLoading(false);
    })
  };
  return (
    <div>
    <div className="flex justify-center items-center mt-8 ">
        <h1 className="flex-start font-bold mr-10"> Scrape Recipe</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
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
        {output.ingredients && <Output output={output}/>}
    </div>
    </div>
  );
};

export default UrlInput;