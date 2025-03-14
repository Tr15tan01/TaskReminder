import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDemo() {
  return (
    <Alert className="w-full my-6">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Oooopsss!</AlertTitle>
      <AlertDescription>No collections yet here!!!</AlertDescription>
    </Alert>
  );
}
