import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";

import type { RouterOutputs } from "@/utils/api";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const {
    post: { content, createdAt, id },
    author: { username, profileImageUrl },
  } = props;

  return (
    <div className="flex items-center gap-3 border-b border-slate-400 p-4">
      <Image
        src={profileImageUrl}
        alt="Author profile picture"
        className="h-12 w-12 rounded-full"
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <div className="flex gap-2 text-slate-300">
          <Link href={`/@${username}`}>
            <span className="font-bold">{`@${username}`}</span>
          </Link>
          <Link href={`/post/${id}`}>
            <span className="font-thin">
              {`· ${dayjs(createdAt).fromNow()}`}
            </span>
          </Link>
        </div>
        <span className="text-xl">{content}</span>
      </div>
    </div>
  );
};

export default PostView;
