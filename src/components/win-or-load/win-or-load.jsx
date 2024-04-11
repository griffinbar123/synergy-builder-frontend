import React, {useState, useEffect} from 'react'
import "./win-or-load.css"
import {useQuery} from "react-query"
import WinPercantage from '../win-percentage/win-percentage';

async function getWinner(tier, champs) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      xhrFields : {withCredentials: true},
      body: JSON.stringify({"tier":tier, "participants": champs})
  };
  let url = "https://synergy-builder-server.onrender.com"
  // let url = "http://localhost:5000"

  var res = await fetch(`${url}/api/champs`, requestOptions)
  return await res.json()
  }
  

function WinOrLoad({tier, champs}) {
    const { isLoading, data } = useQuery({
        queryKey: ['getWin', tier, champs],
        queryFn: () => getWinner(tier, champs),
        throwOnError: true,
        // onError: () => {console.log("erro")}
      })
    // console.log(data)

    // const ref = useRef(null);
    const [width, setWidth] = useState(100);
    const [count, setCount] = useState(0);

    useEffect(() => {
      const id = setInterval(() => setCount((oldCount) => oldCount + 1), 1000);
  
      return () => {
        clearInterval(id);
      };
    }, []);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => {
            // Depending on the layout, you may need to swap inlineSize with blockSize
            // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
            setWidth(event[0].contentBoxSize[0].inlineSize);
        });

        resizeObserver.observe(document.getElementById("win-or-load"));
    });

  return (
    <div id="win-or-load" className='win-or-load'>
        {isLoading && <span className='loading-text'>Loading... (For the inititial request, loading may take up to 50 seconds): {count} </span>}
        {!isLoading && data != null && data.status_code === 200 && <WinPercantage width={width} percentage={data.win}/>}
        {!isLoading && data != null && data.status_code === 400 && <span className='error-text'>Error: {data.message}</span>}
    </div>
  )
}

export default WinOrLoad