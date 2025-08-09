"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Globe,
  Clock,
  Zap,
  LogOut,
  RefreshCw,
  Search,
  MapPin,
  ExternalLink,
  DeleteIcon,
  Delete,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { BACKEND_URL, token } from "../utility";
import { toast } from "sonner";
import { Ticks } from "../website/[id]/page";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";

interface Website {
  id: string;
  websiteName: string;
  url: string;
  status: "up" | "down" | "checking";
  lastChecked: string;
  responseTime: number;
}

export default function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedRegion, setSelectedRegion] = useState<"india" | "usa">("usa");
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    name: "",
    url: "",
  });

  const router = useRouter();

  const formatTimeByRegion = (timestamp: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    const timeZone = "india";
    return timestamp.toLocaleString("en-US", { ...options, timeZone });
  };

  //Get Websites
  const getWebsites = async () => {
    console.log("Websites Called");
    const response = await axios.get(`${BACKEND_URL}/websites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    setWebsites(
      response.data.map((w: Website & { ticks?: Ticks[] }) => {
        const hasNoTicks = !w.ticks || w.ticks.length === 0;

        return {
          id: w.id,
          websiteName: w.websiteName,
          url: w.url,
          status: hasNoTicks
            ? "checking"
            : w.ticks?.[0]?.status === "Up"
              ? "up"
              : w.ticks?.[0]?.status,
          lastChecked: hasNoTicks ? Date.now() : w.ticks?.[0]?.createdAt,
          responseTime: hasNoTicks
            ? "0"
            : w.ticks?.[0]?.response_time_ms || null,
        };
      })
    );
    setLoading(false);
  };

  // Use Effect Getting Websites
  useEffect(() => {
    getWebsites();
  }, []);

  //Filtering Websites
  const filteredWebsites = useMemo(() => {
    return websites.filter(
      (website) =>
        website.websiteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        website.url.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [websites, searchQuery]);

  //Adding Website
  const handleAddWebsite = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/website`,
        {
          websiteName: newWebsite.name,
          url: newWebsite.url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalOpen(false);
      getWebsites();
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  //Deleting Website
  const handleDeleteWebsite = async (websiteId: string) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/website/${websiteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getWebsites();
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  //Refresh Websites
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    getWebsites();
    setIsRefreshing(false);
    setLoading(false);
  };

  //Logout
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  // Get Status
  const getStatusBadge = (status: "up" | "down" | "checking") => {
    return (
      <Badge
        variant={status === "up" ? "default" : "destructive"}
        className={
          status === "up"
            ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
            : "bg-red-600 hover:bg-red-700 text-white border-red-600"
        }
      >
        {status === "up" ? "Up" : "Down"}
      </Badge>
    );
  };

  return (
    <div className='min-h-screen bg-gray-950'>
      {/* Header */}
      <div className='bg-gray-900 border-b border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                <Globe className='w-5 h-5 text-white' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-white'>
                  Website Monitor
                </h1>
                <p className='text-sm text-gray-400'>
                  Keep track of your websites uptime
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-4'>
              {/* Region Selector */}
              {/* <div className='flex items-center space-x-2'>
                <MapPin className='w-4 h-4 text-gray-400' />
                <Select
                  value={selectedRegion}
                  onValueChange={(value: "india" | "usa") =>
                    setSelectedRegion(value)
                  }
                >
                  <SelectTrigger className='w-32 bg-gray-800 border-gray-700 text-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700'>
                    <SelectItem
                      value='usa'
                      className='text-white hover:bg-gray-700'
                    >
                      🇺🇸 USA
                    </SelectItem>
                    <SelectItem
                      value='india'
                      className='text-white hover:bg-gray-700'
                    >
                      🇮🇳 India
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              {/* Refresh Button */}
              <Button
                variant='outline'
                size='sm'
                onClick={handleRefresh}
                disabled={isRefreshing}
                className='border-gray-700 text-gray-300 hover:bg-white bg-transparent'
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </Button>

              {/* Add Website Button */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
                    <Plus className='w-4 h-4 mr-2' />
                    Add Website
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px] bg-gray-900 border-gray-800'>
                  <DialogHeader>
                    <DialogTitle className='text-white'>
                      Add New Website
                    </DialogTitle>
                    <DialogDescription className='text-gray-400'>
                      Add a new website to monitor its uptime and performance.
                    </DialogDescription>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='name' className='text-gray-200'>
                        Website Name
                      </Label>
                      <Input
                        id='name'
                        placeholder='My Website'
                        value={newWebsite.name}
                        onChange={(e) =>
                          setNewWebsite({ ...newWebsite, name: e.target.value })
                        }
                        className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                      />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='url' className='text-gray-200'>
                        URL
                      </Label>
                      <Input
                        id='url'
                        placeholder='https://example.com'
                        value={newWebsite.url}
                        onChange={(e) =>
                          setNewWebsite({ ...newWebsite, url: e.target.value })
                        }
                        className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                      />
                    </div>
                    <div className='grid gap-2'></div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant='outline'
                      onClick={() => setIsModalOpen(false)}
                      className='border-gray-700 text-black'
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddWebsite}
                      className='bg-blue-600 hover:bg-blue-700 text-white'
                    >
                      Add Website
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Logout Button */}
              <Button
                variant='destructive'
                size='sm'
                onClick={handleLogout}
                // className='border-red-700 text-red-400  hover:bg-black hover:text-red-500 bg-transparent'
              >
                <LogOut className='w-4 h-4 mr-2' />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Stats */}
      {loading ? (
        <div className='fixed inset-0 flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Search Bar */}
          <div className='mb-6'>
            <div className='relative max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Search websites...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500'
              />
            </div>
          </div>

          {/* Websites Table */}
          <div className='bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden'>
            <div className='px-6 py-4 border-b border-gray-800'>
              <h2 className='text-lg font-medium text-white'>
                Monitored Websites{" "}
                {searchQuery && `(${websites.length} results)`}
              </h2>
            </div>
            <Table className=' w-full table-fixed'>
              <TableHeader className='text-center'>
                <TableRow className='border-gray-800 hover:bg-gray-800/50'>
                  <TableHead className='text-gray-300 px-4'>Website</TableHead>
                  <TableHead className='text-gray-300'>Status</TableHead>
                  {/* <TableHead className='text-gray-300'>Last Checked</TableHead> */}
                  <TableHead className='text-gray-300'>Response Time</TableHead>
                  <TableHead className='text-gray-300'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {websites.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='text-center py-8 text-gray-400'
                    >
                      {searchQuery
                        ? "No websites found matching your search."
                        : "No websites to display."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWebsites.map((website) => (
                    <TableRow
                      key={website.id}
                      className='border-gray-800 hover:bg-gray-800/30'
                    >
                      <TableCell>
                        <div className='block'>
                          <div className='cursor-pointer p-2'>
                            <div className='font-medium text-white hover:text-blue-400 transition-colors'>
                              {website.websiteName}
                            </div>
                            <div className='text-sm text-gray-400'>
                              {website.url}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {website.status === "checking" ? (
                          <div className='flex gap-1'>
                            <RefreshCw
                              className={`w-4 h-4 mr-2 animate-spin text-white`}
                            />
                            <p className='font-medium text-white'>
                              Checking...
                            </p>
                          </div>
                        ) : (
                          getStatusBadge(website.status)
                        )}
                      </TableCell>
                      {/* <TableCell>
                      <div className='text-sm'>
                        <div className='text-gray-400'>
                          {website.lastChecked}
                        </div>
                        <div className='text-xs text-gray-500 font-mono'>
                          {formatTimeByRegion(website.lastChecked)}
                        </div>
                      </div>
                    </TableCell> */}
                      <TableCell>
                        <span
                          className={`text-sm font-medium ${website.status === "up" ? "text-green-400" : "text-red-400"}`}
                        >
                          {website.status === "up"
                            ? `${website.responseTime}ms`
                            : "N/A"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className='flex gap-4'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              router.push(`/website/${website.id}`);
                            }}
                            className='border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent'
                          >
                            <ExternalLink className='w-4 h-4 mr-2' />
                            View Details
                          </Button>
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => {
                              console.log("clicked");
                              handleDeleteWebsite(website.id);
                            }}
                          >
                            <Trash />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
