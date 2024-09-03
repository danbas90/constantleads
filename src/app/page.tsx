import Link from "next/link";
import { getAuthUrl } from "@/lib/googleAuth";

export default function Home() {
  const authUrl = getAuthUrl();

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800">
        <div className="flex mb-5">
          <img className="rounded-lg w-48 h-48" src="https://i.imgflip.com/9291vn.jpg" alt="yoda login" />
          
        </div>
        <Link href={authUrl}>
          <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google logo"
            />
            <span>Login with Google</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
