import './App.css'
import { useEffect } from 'react'
import { request, gql } from 'graphql-request'

function App() {
  const query = gql`
   {
      People {
        results {
          name: String
        }
      }
   }
  `
  const getData = async () => {
    let request = await fetch('https://swapi.dev/api/people')
    let data = await request.json()
    console.log(data)
  }

  useEffect(() => {
    //request('https://swapi.dev/api/people', query).then((data) => console.log(data))
    getData()
  }, [])

  return (
    <div className="App">
      
    </div>
  )
}

export default App
