import Image from "next/image";
import { Loader2} from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create an account to get back to your dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8 w-full max-w-md mx-auto">
          <ClerkLoaded>
            <div className="w-full flex justify-center">
              <SignIn path="/sign-in" />
            </div>
          </ClerkLoaded>
          <ClerkLoading>
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin text-muted-foreground" />
            </div>
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" height={100} width={100} alt="logo"/>
      </div>
    </div>
  )
}