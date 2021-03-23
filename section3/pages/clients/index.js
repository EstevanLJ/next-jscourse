import Link from "next/link";

function ClientsPage() {
  let clients = [
    { id: "estevan", name: "Estevan Junges" },
    { id: "jackson", name: "Jackson Majolo" },
    { id: "fabricio", name: "Fabrício Pretto" },
    { id: "artur", name: "Artur Comunello" },
    { id: "matheus", name: "Matheus Agnes Dias" },
    { id: "nataniel", name: "Nataniel Rabaioli" },
  ];

  return (
    <div>
      <h1>Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {/* <Link href={`/clients/${client.id}`}>{client.name}</Link> */}
            <Link
              href={{
                pathname: `/clients/[id]`,
                query: {
                  id: client.id,
                },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
