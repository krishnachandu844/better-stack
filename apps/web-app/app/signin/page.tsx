"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Activity, Github, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BACKEND_URL } from "../utility";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function Signin() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const loginUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/user/signin`, {
        username,
        password,
      });

      console.log(response.data);

      const token = response.data.token;
      Cookies.set("token", token);
      router.push("/dashboard");
      toast.success("Login Successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 p-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <div className='p-2 bg-blue-500 rounded-lg shadow-lg'>
              <Activity className='h-6 w-6 text-white' />
            </div>
            <h1 className='text-2xl font-bold text-white'>BetterUptime</h1>
          </div>
          <p className='text-gray-300'>Monitor your websites with confidence</p>
        </div>

        <Card className='bg-gray-800/50 border-gray-700 backdrop-blur-sm'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-center text-white'>
              Welcome back
            </CardTitle>
            <CardDescription className='text-center text-gray-300'>
              Sign in to your account to continue monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <Button
                variant='outline'
                className='w-full bg-gray-700/50 border-gray-600 text-gray-200 hover:bg-gray-600/50 hover:text-white'
              >
                <Github className='mr-2 h-4 w-4' />
                GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full bg-gray-700/50 border-gray-600 text-gray-200 hover:bg-gray-600/50 hover:text-white'
              >
                <Mail className='mr-2 h-4 w-4' />
                Google
              </Button>
            </div>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full border-gray-600' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-gray-800 px-2 text-gray-400'>
                  Or continue with email
                </span>
              </div>
            </div>

            <form className='space-y-4' onSubmit={loginUser}>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-gray-200'>
                  Email address
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='you@company.com'
                  required
                  onChange={(e) => setUserName(e.target.value)}
                  className='bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500'
                />
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password' className='text-gray-200'>
                    Password
                  </Label>
                  <Link
                    href='/forgot-password'
                    className='text-sm text-blue-400 hover:text-blue-300'
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className='bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500'
                />
              </div>
              <Button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white'
              >
                Sign in
              </Button>
            </form>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <div className='text-sm text-center text-gray-400'>
              {"Don't have an account? "}
              <Link
                href='/signup'
                className='text-blue-400 hover:text-blue-300 font-medium'
              >
                Sign up for free
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className='mt-8 text-center text-xs text-gray-500'>
          <p>
            By signing in, you agree to our{" "}
            <Link href='/terms' className='hover:text-gray-300 text-gray-400'>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href='/privacy' className='hover:text-gray-300 text-gray-400'>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
