import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  //   ChevronLeft,
  //   ChevronRight,
  Copy,
  FileIcon,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
// import { toast } from "../ui";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { pinFileToIPFS } from "@/hooks/storage/pinToIPFS";
import { deleteFile } from "@/hooks/storage/deleteFile";

// Renamed the custom File interface to UploadedFile
interface UploadedFile {
  _id: number;
  name: string;
  size: string;
  cid: string;
  uploadedAt: string;
}

const initialFiles: UploadedFile[] = [];

const StorageFiles: React.FC = () => {
  const { authState } = useAuth();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  //   const [rowsPerPage, setRowsPerPage] = useState<string>("10");
  const [isAddFileDialogOpen, setIsAddFileDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles);
  const [file, setFile] = useState<File | null>(null); // Use the built-in File type for uploads
  const [uploadStatus, setUploadStatus] = useState<string>("");

  // Fetch files from the server when the component mounts
  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        const userUid = authState.user.uid
          ? authState.user.uid
          : authState.user.user.uid
          ? authState.user.user.uid
          : "";
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URI}/files/${userUid}`,
          {
            method: "GET",
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFiles(data.files);
        } else {
          console.error("Failed to fetch files");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [authState.user]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]); // File is the built-in browser type
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("size", `${(file.size / 1024).toFixed(2)} KB`);
    formData.append(
      "user",
      authState.user.uid
        ? authState.user.uid
        : authState.user.user.uid
        ? authState.user.user.uid
        : ""
    );

    try {
      setIsAddFileDialogOpen(false);
      // toast({
      //   title: "Uploading file...",
      //   description: "Please wait while we upload your file.",
      // });

      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/store`, {
        method: "POST",
        body: formData,
      });

      if (response) {
        const data = await response.json();
        setUploadStatus(
          `File uploaded successfully! IPFS Hash: ${data.file.cid}`
        );
        const newFile: UploadedFile = {
          _id: data.file._id,
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          cid: data.file.cid,
          uploadedAt: new Date().toLocaleDateString(),
        };
        setFiles((prevFiles) => [...prevFiles, newFile]);
        setUploadStatus("");
        setFile(null);

        // toast({
        //   title: "File Uploaded...",
        //   description: "Your file has been uploaded successfully.",
        // });
      }
    } catch (error: any) {
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? filteredFiles.map((file) => file._id) : []);
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  const handleDeleteFile = (fileId: number) => {
    deleteFile(fileId);
    setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
  };

  return (
    <div className="p-4 md:p-6">
      {/* Search and Add File */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog
          open={isAddFileDialogOpen}
          onOpenChange={setIsAddFileDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New File
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New File</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
              />
              <br />
              <Button onClick={handleUpload}>Upload</Button>
              {uploadStatus && <p>{uploadStatus}</p>}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* File Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === filteredFiles.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>SIZE</TableHead>
              <TableHead>CID</TableHead>
              <TableHead>CREATED</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.map((file, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(index)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(index, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2 min-w-[200px]">
                    <FileIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {(parseFloat(file.size) / 1024).toFixed(2)} KB
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <span className="truncate">
                      {file.cid.slice(0, 6) + "..." + file.cid.slice(-3)}
                    </span>
                    <Button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `https://ipfs.io/ipfs/${file.cid}`
                        )
                      }
                      variant="ghost"
                      size="icon"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  {moment(file.uploadedAt).startOf("hour").fromNow()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => pinFileToIPFS(file._id)}
                        className="flex items-center gap-2"
                      >
                        <i className="ri-pushpin-line"></i> Pin to IPFS
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `https://ipfs.io/ipfs/${file.cid}`
                          )
                        }
                        className="flex items-center gap-2"
                      >
                        <i className="ri-share-line"></i> Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteFile(file._id)}
                        className="flex items-center gap-2"
                      >
                        <i className="ri-delete-bin-line"></i> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {/* <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default StorageFiles;
