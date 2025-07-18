import Link from "next/link";

function notFound() {
  return (
    <div className="flex items-center justify-center min-h-screen text-[#ababab] ">
      <div className="-translate-y-[100%] flex flex-col items-center ">
        <div>404 Page Not Found</div>
        <div>
          Click{" "}
          <Link href="/" className="underline">
            here
          </Link>{" "}
          to redirect to the Homepage
        </div>
      </div>
    </div>
  );
}

export default notFound;
