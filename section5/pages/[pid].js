import path from "path";
import fs from "fs/promises";
import Link from "next/link";
import { Fragment } from "react";

function ProductDetailPage(props) {
  const { product } = props;

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <br />
      <Link href="/">Back</Link>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticPaths() {
  const data = await getData();

  return {
    // paths: data.products.map((p) => `/${p.id}`),
    paths: data.products.map((p) => ({ params: { pid: p.id } })),
    fallback: false,

    //usando fallback
    // paths: ["/p1", "/p2"],
    // fallback: true,

    // fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();
  const product = data.products.find((p) => p.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
}

export default ProductDetailPage;
