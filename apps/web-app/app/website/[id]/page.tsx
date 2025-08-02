"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Clock,
  Globe,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { BACKEND_URL, token } from "@/app/utility";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Up":
      return <CheckCircle className='h-4 w-4 text-green-500' />;
    case "Down":
      return <XCircle className='h-4 w-4 text-red-500' />;
    default:
      return <Clock className='h-4 w-4 text-gray-500' />;
  }
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Up":
      return "default";
    case "down":
      return "destructive";
    default:
      return "outline";
  }
};

function formatDate(isoString: string) {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short", // Aug
    day: "numeric", // 2
    hour: "2-digit", // 08
    minute: "2-digit", // 01
    hour12: true, // AM/PM
  });
}

interface Ticks {
  id: string;
  response_time_ms: string;
  status: string;
  createdAt: string;
}

interface Websites {
  id: string;
  websiteName: string;
  url: string;
  timeAdded: string;
  ticks: Ticks[];
}

export default function WebsiteDetail() {
  const params = useParams();
  const websiteId = params.id;
  const [website, setWebsites] = useState<Websites>();
  const [loading, setLoading] = useState(true);

  const getWebsites = async () => {
    const response = await axios.get(`${BACKEND_URL}/status/${websiteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    setWebsites(response.data);
    setLoading(false);
  };
  console.log(website);

  // Use Effect Getting Websites status for single website
  useEffect(() => {
    getWebsites();
  }, []);

  useEffect(() => {
    // Simulate loading data from database
    // const loadTicks = async () => {
    //   setLoading(true);
    //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    //   const websiteTicks = generateTicks(websiteId);
    //   setTicks(websiteTicks);
    //   setLoading(false);
    // };
    // if (website) {
    //   loadTicks();
    // }
  }, [websiteId]);

  //   if (!website) {
  //     return (
  //       <div className='min-h-screen bg-gray-950 text-white flex items-center justify-center'>
  //         <div className='text-center'>
  //           <h1 className='text-2xl font-bold mb-4'>Website Not Found</h1>
  //           <Link href='/'>
  //             <Button variant='outline'>
  //               <ArrowLeft className='h-4 w-4 mr-2' />
  //               Back to Dashboard
  //             </Button>
  //           </Link>
  //         </div>
  //       </div>
  //     );
  //   }

  // const recentTicks = ticks.slice(-10);
  // const avgResponseTime =
  //   ticks.length > 0
  //     ? Math.round(
  //         ticks
  //           .filter((t) => t.responseTime > 0)
  //           .reduce((acc, t) => acc + t.responseTime, 0) /
  //           ticks.filter((t) => t.responseTime > 0).length
  //       )
  //     : 0;
  // const successfulChecks = ticks.filter(
  //   (t) => t.status === "operational"
  // ).length;
  // const uptimePercentage =
  //   ticks.length > 0
  //     ? Math.round((successfulChecks / ticks.length) * 100 * 10) / 10
  //     : 0;

  if (!website) {
    return <p>Loading....</p>;
  }
  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      {/* Header */}
      {/* <header className='border-b border-gray-800 bg-gray-900/50'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Link href='/'>
                <Button variant='ghost' size='icon'>
                  <ArrowLeft className='h-5 w-5' />
                </Button>
              </Link>
              <div className='flex items-center gap-2'>
                <Activity className='h-8 w-8 text-blue-500' />
                <h1 className='text-xl font-bold'>StatusMonitor</h1>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Avatar>
                <AvatarFallback className='bg-blue-600'>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header> */}

      <div className='container mx-auto px-4 py-8'>
        {/* Website Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            {/* {getStatusIcon(website.status)} */}
            <div>
              <h1 className='text-3xl font-bold text-white'>
                {website.websiteName}
              </h1>
              <p className='text-gray-400 font-mono'>{website.url}</p>
            </div>
            {/* <Badge
              variant={getStatusBadgeVariant(website.status)}
              className='capitalize ml-auto'
            >
              {website.status}
            </Badge> */}
          </div>
        </div>

        {/* Stats Cards */}
        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Card className='bg-gray-900 border-gray-800'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-400'>
                Current Status
              </CardTitle>
              {getStatusIcon(website.status)}
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold capitalize ${
                  website.status === "operational"
                    ? "text-green-500"
                    : website.status === "degraded"
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {website.status}
              </div>
              <p className='text-xs text-gray-500'>
                Last checked: {website.lastChecked}
              </p>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-800'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-400'>
                Response Time
              </CardTitle>
              <Zap className='h-4 w-4 text-blue-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-blue-500'>
                {avgResponseTime}ms
              </div>
              <p className='text-xs text-gray-500'>
                Average from last 50 checks
              </p>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-800'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-400'>
                Uptime
              </CardTitle>
              <TrendingUp className='h-4 w-4 text-green-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-green-500'>
                {uptimePercentage}%
              </div>
              <p className='text-xs text-gray-500'>Last 50 checks</p>
            </CardContent>
          </Card>

          <Card className='bg-gray-900 border-gray-800'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-400'>
                Total Checks
              </CardTitle>
              <Globe className='h-4 w-4 text-purple-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-purple-500'>
                {ticks.length}
              </div>
              <p className='text-xs text-gray-500'>Monitoring history</p>
            </CardContent>
          </Card>
        </div> */}

        {/* Recent Checks Table */}
        {/* <Card className='bg-gray-900 border-gray-800'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Clock className='h-5 w-5' />
              Recent Monitoring Checks
            </CardTitle>
            <CardDescription className='text-gray-400'>
              Latest monitoring data from the database showing response times
              and status
            </CardDescription>
          </CardHeader>
          <CardContent className='p-0'>
            {loading ? (
              <div className='p-8 text-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4'></div>
                <p className='text-gray-400'>Loading monitoring data...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className='border-gray-800 hover:bg-gray-800/50'>
                    <TableHead className='text-gray-400'>Timestamp</TableHead>
                    <TableHead className='text-gray-400'>Status</TableHead>
                    <TableHead className='text-gray-400'>
                      Response Time
                    </TableHead>
                    <TableHead className='text-gray-400'>Status Code</TableHead>
                    <TableHead className='text-gray-400'>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ticks.ticks.map((tick) => (
                    <TableRow
                      key={tick.id}
                      className='border-gray-800 hover:bg-gray-800/30'
                    >
                      <TableCell>
                        <div className='text-white font-mono text-sm'>
                          {formatDate(tick.timestamp)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          {getStatusIcon(tick.status)}
                          <Badge
                            variant={getStatusBadgeVariant(tick.status)}
                            className='capitalize'
                          >
                            {tick.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`font-medium ${
                            tick.responseTime === 0
                              ? "text-red-500"
                              : tick.responseTime > 500
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        >
                          {tick.responseTime === 0
                            ? "Timeout"
                            : `${tick.responseTime}ms`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`font-medium ${
                            tick.statusCode === 200
                              ? "text-green-500"
                              : tick.statusCode === 0
                                ? "text-red-500"
                                : "text-yellow-500"
                          }`}
                        >
                          {tick.statusCode === 0
                            ? "No Response"
                            : tick.statusCode}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='text-gray-400 text-sm'>
                          {tick.location}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card> */}
        {/* Recent Checks Table */}
        <Card className='bg-gray-900 border-gray-800'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Clock className='h-5 w-5' />
              Recent Monitoring Checks
            </CardTitle>
            <CardDescription className='text-gray-400'>
              Latest monitoring data from the database showing response times
              and status
            </CardDescription>
          </CardHeader>
          <CardContent className='p-0'>
            {loading ? (
              <div className='p-8 text-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4'></div>
                <p className='text-gray-400'>Loading monitoring data...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className='border-gray-800 hover:bg-gray-800/50'>
                    <TableHead className='text-gray-400'>Timestamp</TableHead>
                    <TableHead className='text-gray-400'>Status</TableHead>
                    <TableHead className='text-gray-400'>
                      Response Time
                    </TableHead>
                    <TableHead className='text-gray-400'>Status Code</TableHead>
                    {/* <TableHead className='text-gray-400'>Location</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {website.ticks &&
                    website.ticks.map((tick: Ticks) => (
                      <TableRow
                        key={tick.id}
                        className='border-gray-800 hover:bg-gray-800/30'
                      >
                        {/* TimeStamp */}
                        <TableCell>
                          <div className='text-white font-mono text-sm'>
                            {/* {formatDate(tick.createdAt)} */}
                            {formatDate(tick.createdAt)}
                          </div>
                        </TableCell>
                        {/* status */}
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            {getStatusIcon(tick.status)}
                            <Badge
                              variant={getStatusBadgeVariant(tick.status)}
                              className='capitalize text-white'
                            >
                              {tick.status}
                            </Badge>
                          </div>
                        </TableCell>
                        {/* resposne-time */}
                        <TableCell>
                          <div
                            className={`font-medium ${
                              tick.response_time_ms
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {tick.response_time_ms === undefined
                              ? "Timeout"
                              : `${tick.response_time_ms}ms`}
                          </div>
                        </TableCell>
                        {/* status-code */}
                        <TableCell>
                          <div
                            className={`font-medium ${
                              tick.status === "Up"
                                ? "text-green-500"
                                : tick.status === "Down"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                            }`}
                          >
                            {tick.status === "Down" ? "No Response" : 200}
                          </div>
                        </TableCell>
                        {/* <TableCell>
                    <div className='text-gray-400 text-sm'>{tick.location}</div>
                  </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
