"use client";
import { authClient } from "@/app/utils/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthButton() {
  const router = useRouter();
  const { data: session, isPending, error, refetch } = authClient.useSession();

  async function handleLogOut(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          router.push("/auth/login");
        },
      },
    });
  }

  if (session?.user) {
    return (
      <>
        <form onSubmit={handleLogOut}>
          <button className="btn btn-error btn-outline">Log Out</button>
        </form>
      </>
    );
  }

  return (
    <>
      <Link href="/auth/login" className="btn btn-info">
        Login
      </Link>
    </>
  );
}
