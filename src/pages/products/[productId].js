import RootLayout from "@/components/layouts/RootLayout";
import { connectToDatabase } from "@/utils/mongodb";
import { Descriptions, Card, Space, Tag, Row, Col } from "antd";
import { ObjectId } from "mongodb";

import Image from "next/image";

export default function ProductDetails({ product }) {
  const { Meta } = Card;
  return (
    <Row
      gutter={[20]}
      style={{
        placeContent: "center",
        placeItems: "center",
        gap: 10,
        padding: 10,
      }}>
      <Col lg={10} className="gutter-col">
        <Image
          style={{
            objectFit: "cover",
          }}
          src={product?.image_url}
          width={400}
          height={400}
          responsive
          alt="product image"
        />
      </Col>
      <Col lg={10} className="gutter-col">
        <Meta
          title={
            <>
              <p
                style={{
                  fontSize: "18px",
                  color: "blue",
                  fontWeight: 500,
                }}>
                {product?.title}
              </p>
              <div
                className="line"
                style={{
                  height: "2px",
                  margin: "10px 0",
                  background: "#000",
                  width: "100%",
                }}></div>
            </>
          }
          description={
            <Space
              size={[0, 8]}
              wrap
              style={{
                marginBottom: "12px",
              }}>
              <Tag
                style={{
                  color: "black",
                  fontSize: "14px",
                  backgroundColor: "#DCE5D7",
                  borderRadius: "12px",
                  padding: "3px 10px",
                }}>
                Price:{" "}
                <span
                  style={{
                    fontWeight: 600,
                  }}>
                  {product?.price}৳
                </span>
              </Tag>
              <Tag
                style={{
                  color: "black",
                  fontSize: "14px",
                  backgroundColor: "#DCE5D7",
                  borderRadius: "12px",
                  padding: "3px 10px",
                }}>
                Regular Price:{" "}
                <span
                  style={{
                    fontWeight: 600,
                  }}>
                  {product?.regular}৳
                </span>
              </Tag>
              <Tag
                style={{
                  color: "black",
                  fontSize: "14px",
                  backgroundColor: "#DCE5D7",
                  borderRadius: "12px",
                  padding: "3px 10px",
                }}>
                Status:{" "}
                <span
                  style={{
                    fontWeight: 600,
                  }}>
                  {product?.status}
                </span>
              </Tag>

              <Tag
                style={{
                  color: "black",
                  fontSize: "14px",
                  backgroundColor: "#DCE5D7",
                  borderRadius: "12px",
                  padding: "3px 10px",
                }}>
                Brand:{" "}
                <span
                  style={{
                    fontWeight: 600,
                  }}>
                  {product?.brand}
                </span>
              </Tag>
            </Space>
          }
        />
        <Meta
          title={
            <>
              <p
                style={{
                  fontWeight: 600,

                  textDecoration: "solid underline",
                }}>
                Key Features
              </p>
            </>
          }
          description={
            <>
              <p
                style={{
                  fontWeight: 400,
                }}>
                <span
                  style={{
                    fontWeight: 600,
                  }}>
                  Category:
                </span>{" "}
                {product?.category}
              </p>
              <p
                style={{
                  fontWeight: 400,
                }}>
                <span
                  style={{
                    fontWeight: 600,
                  }}>
                  Model:
                </span>{" "}
                {product?.model}
              </p>

              {product?.features.map((dsc, i) => (
                <p
                  key={i}
                  style={{
                    fontWeight: 500,
                  }}>
                  {dsc}
                </p>
              ))}
            </>
          }></Meta>
        <Descriptions bordered>
          <Descriptions.Item label="Description">
            {product?.description}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
}

ProductDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getServerSideProps(context) {
  const { params } = context;
  const productId = params.productId;

  const db = await connectToDatabase();
  const collection = db.collection("products");

  // Find the product based on the productId
  const product = await collection.findOne({ _id: new ObjectId(productId) });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
