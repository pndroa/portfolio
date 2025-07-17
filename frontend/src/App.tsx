import { useEffect, useState } from 'react'
import { apiInstance } from './lib/axios'

function App() {
  const [data, setData] = useState<{ message: string } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get('/')
        console.log(response)
        setData(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return <div>Hello from Frontend and Backend {data?.message}</div>
}

export default App
