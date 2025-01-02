import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <img className="w-[80vw] lg:w-[30vw]" src="https://ik.imagekit.io/lexy/Ming/404?updatedAt=1735853175162" alt="" />

      <div className="text-center space-y-2 mb-4">
        <p className="text-neutral-700 text-sm">
          The page you're looking for couldn't be found!
        </p>
        <p className="text-neutral-700 text-sm">
          You might want to go back home.
        </p>
      </div>
      <Button
        variant="default"
        className="bg-black hover:bg-neutral-800 text-white rounded-none px-8"
        onClick={() => window.location.href = '/'}
      >
        Back To Home
      </Button>
    </div>
  )
}

