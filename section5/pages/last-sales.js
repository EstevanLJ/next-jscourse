import { useEffect, useState } from "react";
import useSWR from "swr";

const API_URL =
  "https://reactjs-course-97d43-default-rtdb.firebaseio.com/sales.json";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(API_URL);

  useEffect(() => {
    if (data) {
      let transformedSales = [];
      for (const sid in data) {
        transformedSales.push({
          ...data[sid],
          id: sid,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <h3>Failed to load</h3>;
  }

  if (!data && !sales) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Sales</h3>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.username}: {sale.volume} boxes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LastSalesPage;

export async function getStaticProps() {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      let transformedSales = [];
      for (const sid in data) {
        transformedSales.push({
          ...data[sid],
          id: sid,
        });
      }
      return {
        props: {
          sales: transformedSales,
        },
        // revalidate: 10,
      };
    });
}
