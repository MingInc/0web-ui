import { toast } from "@/components/ui";

export const deleteFile = async (fileId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/files/${fileId}`,
        {
          method: "DELETE",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (response.ok) {
        toast({
          title: "File Deleted",
          description: "The file has been successfully deleted.",
        });
      } else {
        toast({
          title: "Deleting Failed",
          description: "Failed to delete the file.",
        });
      }
    } catch (error) {
      console.error("Error deleting file from IPFS:", error);
      toast({
        title: "Error",
        description: "An error occurred while pinning the file to IPFS.",
      });
    }
  };