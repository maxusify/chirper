import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Sidebar = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="relative flex h-screen flex-col border-l border-slate-400 p-4">
      <div className="flex w-full justify-center">
        <Link href="/">
          <h1 className="text-4xl font-extrabold">Chirper</h1>
        </Link>
      </div>
      <div>
        {isSignedIn && (
          <div className="flex flex-col gap-4">
            <div className="h-3rem"></div>
            <Link
              href={`/${user.username || ""}`}
              className="w-full text-center text-2xl"
            >
              Profile
            </Link>
            <SignOutButton />
          </div>
        )}
        {!isSignedIn && (
          <div className="w-full p-3 text-center text-2xl">
            <SignInButton />
          </div>
        )}
      </div>
      <footer className="absolute bottom-0 left-0 flex w-full flex-col items-center justify-center p-5">
        <p>
          Made by{" "}
          <a href="https://github.com/maxusify" className="text-orange-300">
            @maxusify
          </a>
        </p>
        <p>
          <a href="https://github.com/maxusify/chirper" className="font-bold">
            GitHub Repository
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
