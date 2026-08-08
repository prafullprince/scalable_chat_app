import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-wa-bg-dark text-wa-bg max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 mt-20 items-center">
        <h1 className="text-2xl font-extrabold">Welcome to WhatsApp Clone</h1>
        <Link href={"/chat"} className="border-[2px] border-wa-border-dark rounded-xl px-3 py-2 text-wa-bg">Start Chat</Link>
      </div>
    </div>
  );
}
