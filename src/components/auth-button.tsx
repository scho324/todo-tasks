import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "./ui/button";

export default function AuthButton() {
  const { signIn, signOut } = useAuthActions();
  return (
    <div className="p-4 flex justify-end">
      <AuthLoading>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </AuthLoading>
      <Unauthenticated>
        <Button onClick={() => void signIn("github")}>
          Sign in with GitHub
        </Button>
      </Unauthenticated>
      <Authenticated>
        <Button onClick={() => void signOut()}>Sign out</Button>
      </Authenticated>
    </div>
  );
}
