import React from 'react';

const Output = (props) => {
    const data = props.output;
  return (
    <div className="flex flex-row w-full h-auto">
        
      <div className="flex flex-col w-3/6 text-start m-2">
        <h1 className="font-bold">Ingredients</h1>
        <ol>
        {data && data.ingredients.map((data, i)=>{
           return  (<li key={i}> {data}</li>)
        })}
        </ol>
      </div>
      <div className="flex flex-col w-3/6 text-start m-2">
      <h1 className="font-bold">Instructions</h1>
        {data && data.instructions}
      </div>
    </div>
  );
};

export default Output;