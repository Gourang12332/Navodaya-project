'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { data: session, status } = useSession(); // Get session data using useSession hook
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>; // Show a loading state while session is being checked
  }

  if (!session) {
    router.push("/auth/signin"); // Redirect to sign-in page if not authenticated
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {session.user?.name}</h1>
    </div>
  );
};

export default Dashboard;
