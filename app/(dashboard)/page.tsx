
'use client'
import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { onOpen } = useNewAccount();
  return (
  <Button onClick={onOpen}>
  Add an account
  </Button> 
  );
}
