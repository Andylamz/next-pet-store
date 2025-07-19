import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex w-full justify-center items-center mt-[70px] ">
      <SignIn />
    </div>
  );
}
