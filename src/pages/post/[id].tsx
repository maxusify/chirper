import { api } from "@/utils/api";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PageContainer from "@/components/PageContainer";
import PostView from "@/components/PostView";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";

const SinglePostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const { data } = api.posts.getById.useQuery({
    postId,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`Post - @${data.author.username} | Chirper`}</title>
      </Head>
      <PageContainer>
        <PostView {...data} />
      </PageContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const postId = context.params?.id;

  if (typeof postId !== "string") throw new Error("No slug");

  await ssg.posts.getById.prefetch({ postId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      postId,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default SinglePostPage;
