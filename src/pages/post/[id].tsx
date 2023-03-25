import { type NextPage } from "next";
import Head from "next/head";
import PageContainer from "@/components/PageContainer";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <PageContainer>
        <div>Single Post Page</div>
      </PageContainer>
    </>
  );
};

export default SinglePostPage;
