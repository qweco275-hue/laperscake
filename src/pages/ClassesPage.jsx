import { useParams } from 'react-router-dom'
import ExplorePage from './ExplorePage'

function ClassesPage() {
  const { id } = useParams()

  if (id) {
    return <ExplorePage />
  }

  return <ExplorePage />
}

export default ClassesPage