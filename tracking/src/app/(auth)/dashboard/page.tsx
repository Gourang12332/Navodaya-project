'use client'
import { useSession, signOut } from "next-auth/react";


export default function Dashboard() {
  const { data: session } = useSession();
    // if (!session) {
  //   return <>
  //   <p>Not authenticated</p>
  //   </>;
  // }

  return (
    <div>
      {/* make complete div here and give the feature of updating the status to only one who have the sessions */}
      {
        session ? (
        <>
        <h1>Welcome, {session.user.username}</h1>
        <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (<>
          <button onClick={() => window.location.href = '/sign-in'}>Sign in</button>
      </>)
      }
    </div>
  );
}
