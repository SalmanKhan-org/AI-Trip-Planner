import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export function LoginDialog({ open, onOpenChange, onGoogleLogin,fetchUserData }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
              <DialogHeader>
                  <img src="/logo.png" alt="Company_logo" className="h-10 w-40" />
          <DialogTitle className="text-xl font-semibold text-center">
            Sign in to continue
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Login is required to generate and save your personalized trips.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex flex-col gap-4">
          <Button
            onClick={() => {
              onGoogleLogin(fetchUserData);
              onOpenChange(false); // close after login
            }}
            className="flex items-center justify-center gap-3 bg-white text-black border border-gray-300 hover:bg-gray-100"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
