import { type PropsWithChildren } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineProfile,
} from "react-icons/ai";
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
        <p className="mb-2 text-center text-sm">
          This app was created for educational and demonstration purposes. I am
          not responsible for the content posted by other users on this app.
        </p>
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

const SidebarMobileItem = (props: PropsWithChildren) => {
  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      {props.children}
    </div>
  );
};

export const SidebarMobile = () => {
  const { user, isSignedIn } = useUser();

  const itemsStyling = "text-3xl cursor-pointer";

  return (
    <div className="fixed bottom-0 left-0 h-16 w-full border-t border-slate-400 bg-slate-800">
      <div className="flex h-full grow items-center justify-center">
        <SidebarMobileItem>
          <Link href="/">
            <AiOutlineHome className={itemsStyling} />
          </Link>
        </SidebarMobileItem>
        {isSignedIn && (
          <SidebarMobileItem>
            <Link href={`/@${user.username || ""}`}>
              <AiOutlineProfile className={itemsStyling} />
            </Link>
          </SidebarMobileItem>
        )}
        {!isSignedIn && (
          <SidebarMobileItem>
            <SignInButton>
              <AiOutlineLogin className={itemsStyling} />
            </SignInButton>
          </SidebarMobileItem>
        )}
        {isSignedIn && (
          <SidebarMobileItem>
            <SignOutButton>
              <AiOutlineLogout className={itemsStyling} />
            </SignOutButton>
          </SidebarMobileItem>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
