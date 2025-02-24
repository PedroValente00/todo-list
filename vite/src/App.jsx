import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])

  useEffect(()=> {
    fetch("/api/data")
    .then(data => data.json())
    .then(results => setData(results))
  }, [])

  return (
    <>
      <h1>Products</h1>
      {data.map(p => {
        return <p key={p.id}> {p.product} - {p.price} €</p>
      })}
    </>
  )
}

export default App
