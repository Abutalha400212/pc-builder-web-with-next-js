import ProductCard from "@/components/UI/ProductCard";
import RootLayout from "@/components/layouts/RootLayout";
import { Col, Row } from "antd";
import Head from "next/head";
export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>PC-Builder</title>
        <meta
          name="description"
          content="This is PC Builder website of Missile ltd"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1
          style={{
            textAlign: "center",
          }}>
          Hello, Im Abu Talha
        </h1>
        <Row
          style={{
            placeContent: "center",
            padding: 10,
          }}
          gutter={24}>
          {products?.map((news) => (
            <Col
              xl={6}
              lg={8}
              md={8}
              sm={24}
              xs={24}
              key={news._id}
              className="gutter-row">
              <ProductCard news={news} />
            </Col>
          ))}
        </Row>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  // const res = await fetch("http://localhost:3000/api/news"); // internal API connected with mongoDB
  const res = await fetch("http://localhost:3000/api/products"); // --> json server
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      products: data?.data,
      // allNews: data.data, // when using internal API connected with mongoDB
    },
    revalidate: 10,
  };
};
