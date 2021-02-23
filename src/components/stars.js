import React from 'react';

const Starts = (props) => {
  const { numberStarts } = props;

  const starts = [];
  for (let i = 0; i < 5; i++) {
    i <= numberStarts ?
    starts.push(
      <svg key={i} className="start-full" width="100%" height="100%" viewBox="0 0 10 10">
        <path fill="#3483fa" fillRule="evenodd" d="M5.056 8L1.931 9.648l.597-3.49L0 3.684l3.494-.509L5.056 0l1.562 3.176 3.494.51-2.528 2.471.597 3.491z"></path>
      </svg>
    )  :
    starts.push(
      <svg key={i} width="100%" height="100%" viewBox="0 0 10 10">
        <path fill="#ddd" fillRule="evenodd" d="M5.056 8L1.931 9.648l.597-3.49L0 3.684l3.494-.509L5.056 0l1.562 3.176 3.494.51-2.528 2.471.597 3.491z"></path>
      </svg>
    )

  }
  return(
    <>
      <span className="rating">
        {starts}
      </span>
    </>
  )
}

export default Starts;
