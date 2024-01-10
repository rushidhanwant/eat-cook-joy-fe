import React from 'react';

const OutputMenu = (props) => {
    const data = props.output;
    
    const lines = data.suggested_menu.content.split("\n")
    
  return (
    <div className="flex flex-row w-full h-auto flex-start">
        
      {/* <div className="flex flex-col w-3/6 justify-start text-start m-2">
        <h1 className="font-bold">Ingredients</h1>
        <ol>
        {data && data.ingredients.map((data, i)=>{
            console.log(data)
           return  (<li key={i}> {data}</li>)
        })}
        </ol>
      </div> */}
      <div className="flex flex-col w-3/6  text-start m-2 h-full">
      <h1 className="font-bold">Scaled Ingredients</h1>
        {data && data.scaled_recipe.content}
      </div>
      <div className="flex flex-col w-3/6  text-start m-2 h-full">
            <h1 className="font-bold">Menu Suggestion</h1>
            {lines.length > 0 && lines.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
            </div>
    </div>
  );
};

export default OutputMenu;