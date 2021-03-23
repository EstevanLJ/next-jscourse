import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();

  function loadProjectHandler() {
    router.push('/clients/' + router.query.clientId + '/projecta')
  }

  return (
    <div>
      <h1>Client Projects Page</h1>
      <p>{router.query.clientId}</p>
      <button onClick={loadProjectHandler}>Load Projects A</button>
    </div>
  );
}

export default ClientProjectsPage;
