import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { onGoogleLogin } from "@/helper/onGoogleLogin";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { MyContext } from "@/helper/context";
import { LoginDialog } from "./LoginDialog";
import { Link } from "react-router-dom";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { userData, setUserData, fetchUserData } = useContext(MyContext);
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUserData(null);
    toast.error("User Logout successfully");
  };

  return (
    <div className="w-full lg:px-20 md:px-10 h-14 p-4 flex items-center justify-between shadow-sm sticky top-0 z-50 bg-white">
      <Link to={"/"}>
        <img src="\logoCopy.PNG" alt="NeuroTrip Logo" className="h-10" />
      </Link>
      <div className="flex flex-row items-center space-x-2 md:space-x-5">
        <Link
          to={"/create-trip"}
          className="text-black/80 hover:text-black transition-colors duration-300"
        >
          Create Trip
        </Link>
        <Link
          to={"/my-trips"}
          className="text-black/80 hover:text-black transition-colors duration-300"
        >
          My Trips
        </Link>
        {!token ? (
          <>
            <Button onClick={() => setShowLogin(!showLogin)}>Sign In</Button>
            <LoginDialog
              open={showLogin}
              onOpenChange={setShowLogin}
              onGoogleLogin={onGoogleLogin}
              fetchUserData={fetchUserData}
            />
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={userData?.imageUrl || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end" // Align to the right edge of the trigger
              sideOffset={8} // Small gap from the avatar
              className="w-56" // Optional: set width for consistency
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <p className="font-semibold">
                  {userData?.username || "John Doe"}
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p className="text-neutral-400">
                  {" "}
                  {userData?.email || "johndoe@gmail.com"}
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
