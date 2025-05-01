import { auth } from '@/auth'
import Dashboard from "./DashboardComponent"
const Session = async () => {
    const session = await auth();
  return (
    <Dashboard session={session}/>
  )
}

export default Session