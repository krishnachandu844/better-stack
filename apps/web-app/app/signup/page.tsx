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
import { Checkbox } from "@/components/ui/checkbox";
import { Activity, Github, Mail, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utility";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const createUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, {
        firstName,
        lastName,
        username,
        password,
      });

      console.log(response.data);
      router.push("/signin");
    } catch (error) {
      console.error("Signup failed", error);
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
          <p className='text-gray-300'>Start monitoring your websites today</p>
        </div>

        <Card className='bg-gray-800/50 border-gray-700 backdrop-blur-sm'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-center text-white'>
              Create your account
            </CardTitle>
            <CardDescription className='text-center text-gray-300'>
              Get started with website monitoring in minutes
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

            <form className='space-y-4' onSubmit={createUser}>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName' className='text-gray-200'>
                    First name
                  </Label>
                  <Input
                    id='firstName'
                    placeholder='John'
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    className='bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName' className='text-gray-200'>
                    Last name
                  </Label>
                  <Input
                    id='lastName'
                    placeholder='Doe'
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    className='bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
              </div>
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
                <Label htmlFor='password' className='text-gray-200'>
                  Password
                </Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Create a strong password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className='bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500'
                />
                <div className='text-xs text-gray-400'>
                  Must be at least 8 characters long
                </div>
              </div>

              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='terms'
                  className='border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600'
                />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300'
                >
                  I agree to the{" "}
                  <Link
                    href='/terms'
                    className='text-blue-400 hover:text-blue-300'
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href='/privacy'
                    className='text-blue-400 hover:text-blue-300'
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white'
              >
                Create account
              </Button>
            </form>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <div className='text-sm text-center text-gray-400'>
              Already have an account?{" "}
              <Link
                href='/signin'
                className='text-blue-400 hover:text-blue-300 font-medium'
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className='mt-8 space-y-4'>
          <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-700 backdrop-blur-sm'>
            <h3 className='font-semibold text-sm mb-3 text-white'>
              What you get:
            </h3>
            <ul className='space-y-2 text-sm text-gray-300'>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-400' />
                Monitor up to 10 websites for free
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-400' />
                1-minute check intervals
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-400' />
                Email & SMS notifications
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-400' />
                Public status pages
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
