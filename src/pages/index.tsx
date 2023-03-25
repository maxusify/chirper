import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { SignInButton, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type NextPage } from "next";
import Image from "next/image";
import { z } from "zod";

import { LoadingPage, LoadingSpinner } from "@/components/LoadingSpinner";
import PageContainer from "@/components/PageContainer";
import PostView from "@/components/PostView";
import { api } from "@/utils/api";

dayjs.extend(relativeTime);

type Inputs = {
  content: string;
};

const CreatePostWizard = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>({
    resolver: zodResolver(
      z
        .object({
          content: z
            .string()
            .min(1, "Post must contain at least one character!")
            .max(250, "Your post is too long."),
        })
        .required()
    ),
  });

  const { user } = useUser();
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
      // reset();
    },
    onError: (error) => {
      const errorMessage = error.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Something went wrong! Try again later.");
      }
    },
  });

  if (!user) return null;

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs, event) => {
    if (event) event.preventDefault();
    mutate({ content: data.content });
  };

  const onError: SubmitErrorHandler<Inputs> = (error, event) => {
    if (event) event.preventDefault();
    if (error && error.content && error.content.message)
      toast.error(error.content.message);
    reset();
  };

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.profileImageUrl}
        alt="Profile image"
        className="h-16 w-16 rounded-full"
        width={64}
        height={64}
      />
      <form
        className="flex grow justify-center"
        onSubmit={(e) => void handleSubmit(onSubmit, onError)(e)}
      >
        <input
          placeholder="Type something"
          className="grow bg-transparent outline-none"
          type="text"
          disabled={isPosting}
          {...register("content", { required: true })}
        />
        {!isPosting && <button type="submit">Submit</button>}
        {isPosting && (
          <div className="flex items-center justify-center">
            <LoadingSpinner size={20} />
          </div>
        )}
      </form>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;
  if (!data) return <div>Something wen wrong.</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching as soon as possible
  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <PageContainer>
        <div className="flex border-b border-slate-400 p-4">
          <div>{!isSignedIn && <SignInButton />}</div>

          {!!isSignedIn && (
            <div className="flex w-full">
              <CreatePostWizard />
            </div>
          )}
        </div>

        <Feed />
      </PageContainer>
    </>
  );
};

export default Home;
