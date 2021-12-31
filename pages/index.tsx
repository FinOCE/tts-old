import Client from '../models/Client'

export default function Index() {
  const client = new Client()
  client.login(process.env.clientId, process.env.clientSecret)

  return <main></main>
}
