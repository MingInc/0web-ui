import { toast } from "@/components/ui";

export const pinFileToIPFS = async (fileId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/files/${fileId}/pin`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (response.ok) {
        toast({
          title: "File Pinned",
          description: "The file has been successfully pinned to IPFS.",
        });
      } else {
        toast({
          title: "Pinning Failed",
          description: "Failed to pin the file to IPFS.",
        });
      }
    } catch (error) {
      console.error("Error pinning file to IPFS:", error);
      toast({
        title: "Error",
        description: "An error occurred while pinning the file to IPFS.",
      });
    }
  };