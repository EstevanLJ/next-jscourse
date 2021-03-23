import { useRouter } from "next/router";

function ClientProjectId() {
  const router = useRouter();

  return (
    <div>
      <h1>Client Project</h1>
      <p>{router.query.clientId}</p>
      <p>{router.query.clientProjectId}</p>
    </div>
  );
}

export default ClientProjectId;
