import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ChevronLeft,
  ChevronRight,
  Copy,
  FileIcon,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Renamed the custom File interface to UploadedFile
interface UploadedFile {
  id: number;
  name: string;
  size: string;
  cid: string;
  created: string;
}

const initialFiles: UploadedFile[] = [
  {
    id: 1,
    name: "Screenshot from 2024-12-20 08-15-56.png",
    size: "67.48 KB",
    cid: "bafkr...03xti",
    created: "12/20/2024",
  },
];

const StorageFiles: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<string>("10");
  const [isAddFileDialogOpen, setIsAddFileDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles);
  const [file, setFile] = useState<File | null>(null); // Use the built-in File type for uploads
  const [uploadStatus, setUploadStatus] = useState<string>("");

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

    const user = JSON.parse(localStorage.getItem("mowhq_cookie_user") || "");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("size", `${(file.size / 1024).toFixed(2)} KB`);
    formData.append("user", user.uid);

    try {
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
          id: files.length + 1,
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          cid: data.file.cid,
          created: new Date().toLocaleDateString(),
        };
        setFiles((prevFiles) => [...prevFiles, newFile]);
        setIsAddFileDialogOpen(false);
        setUploadStatus("");
        setFile(null);
      }
    } catch (error: any) {
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? filteredFiles.map((file) => file.id) : []);
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
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
            {filteredFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(file.id)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(file.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2 min-w-[200px]">
                    <FileIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">{file.size}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <span className="truncate">{file.cid}</span>
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{file.created}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
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
        </div>
      </div>
    </div>
  );
};

export default StorageFiles;
