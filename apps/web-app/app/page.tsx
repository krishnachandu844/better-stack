"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Shield,
  Zap,
  Globe,
  Bell,
  BarChart3,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      {/* Header */}
      <header className='border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60'>
        <div className='container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Activity className='h-8 w-8 text-green-500' />
            <span className='text-xl font-bold'>BetterUptime</span>
          </div>
          <nav className='hidden md:flex items-center space-x-8'>
            <Link
              href='#features'
              className='text-sm font-medium text-gray-300 hover:text-white transition-colors'
            >
              Features
            </Link>
            <Link
              href='#pricing'
              className='text-sm font-medium text-gray-300 hover:text-white transition-colors'
            >
              Pricing
            </Link>
            <Link
              href='#about'
              className='text-sm font-medium text-gray-300 hover:text-white transition-colors'
            >
              About
            </Link>
            <Link
              href='#contact'
              className='text-sm font-medium text-gray-300 hover:text-white transition-colors'
            >
              Contact
            </Link>
          </nav>
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              className=' text-black bg-white'
              onClick={() => {
                router.push("/signin");
              }}
            >
              Sign In
            </Button>
            <Button className='bg-green-600 hover:bg-green-700'>
              Start Free Trial
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='py-20 lg:py-32'>
        <div className='container mx-auto px-4 lg:px-6'>
          <div className='text-center max-w-4xl mx-auto'>
            <Badge className='mb-6 bg-green-500/10 text-green-400 border-green-500/20'>
              <CheckCircle className='w-3 h-3 mr-1' />
              99.99% Uptime Guaranteed
            </Badge>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
              Monitor your website's uptime like a pro
            </h1>
            <p className='text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto'>
              Get instant alerts when your website goes down. Beautiful status
              pages, detailed analytics, and incident management - all in one
              place.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
              <div className='flex items-center space-x-2'>
                <Input
                  type='url'
                  placeholder='Enter your website URL'
                  className='w-80 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500'
                />
                <Button className='bg-green-600 hover:bg-green-700'>
                  Start Monitoring
                  <ArrowRight className='w-4 h-4 ml-2' />
                </Button>
              </div>
            </div>
            <p className='text-sm text-gray-500'>
              Free 14-day trial • No credit card required • Setup in 30 seconds
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 border-y border-gray-800'>
        <div className='container mx-auto px-4 lg:px-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-green-500 mb-2'>
                99.99%
              </div>
              <div className='text-gray-400'>Uptime SLA</div>
            </div>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-green-500 mb-2'>
                30s
              </div>
              <div className='text-gray-400'>Check Frequency</div>
            </div>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-green-500 mb-2'>
                50k+
              </div>
              <div className='text-gray-400'>Websites Monitored</div>
            </div>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-green-500 mb-2'>
                24/7
              </div>
              <div className='text-gray-400'>Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-20'>
        <div className='container mx-auto px-4 lg:px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-5xl font-bold mb-4'>
              Everything you need to monitor your websites
            </h2>
            <p className='text-xl text-gray-400 max-w-2xl mx-auto'>
              Comprehensive monitoring tools that keep your websites running
              smoothly and your users happy.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <Card className='bg-gray-900 border-gray-800'>
              <CardContent className='p-6'>
                <div className='w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4'>
                  <Globe className='w-6 h-6 text-green-500' />
                </div>
                <h3 className='text-xl font-semibold mb-2 text-white'>
                  Global Monitoring
                </h3>
                <p className='text-gray-400'>
                  Monitor from 15+ locations worldwide to ensure your website is
                  accessible everywhere.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-800'>
              <CardContent className='p-6'>
                <div className='w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4'>
                  <Bell className='w-6 h-6 text-blue-500' />
                </div>
                <h3 className='text-xl font-semibold mb-2 text-white'>
                  Instant Alerts
                </h3>
                <p className='text-gray-400'>
                  Get notified via email, SMS, Slack, or webhook the moment your
                  site goes down.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-800'>
              <CardContent className='p-6'>
                <div className='w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4'>
                  <BarChart3 className='w-6 h-6 text-purple-500' />
                </div>
                <h3 className='text-xl font-semibold mb-2 text-white'>
                  Detailed Analytics
                </h3>
                <p className='text-gray-400'>
                  Beautiful dashboards with response times, uptime stats, and
                  performance insights.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-800'>
              <CardContent className='p-6'>
                <div className='w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4'>
                  <Shield className='w-6 h-6 text-orange-500' />
                </div>
                <h3 className='text-xl font-semibold mb-2 text-white'>
                  Status Pages
                </h3>
                <p className='text-gray-400'>
                  Create beautiful public status pages to keep your users
                  informed during incidents.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-800'>
              <CardContent className='p-6'>
                <div className='w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4'>
                  <Zap className='w-6 h-6 text-red-500' />
                </div>
                <h3 className='text-xl font-semibold mb-2 text-white'>
                  Fast Setup
                </h3>
                <p className='text-gray-400'>
                  Start monitoring in under 30 seconds. No complex configuration
                  required.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-800'>
              <CardContent className='p-6'>
                <div className='w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4'>
                  <Clock className='w-6 h-6 text-cyan-500' />
                </div>
                <h3 className='text-xl font-semibold mb-2 text-white'>
                  Incident Management
                </h3>
                <p className='text-gray-400'>
                  Track incidents, post updates, and manage your team's response
                  efficiently.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className='py-20 bg-gray-900/50'>
        <div className='container mx-auto px-4 lg:px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Trusted by thousands of companies
            </h2>
            <p className='text-xl text-gray-400'>
              From startups to enterprises, teams rely on BetterUptime
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 mb-16'>
            <Card className='bg-gray-900 border-gray-800'>
              <CardContent className='p-6'>
                <div className='flex items-center mb-4'>
                  <div className='flex text-yellow-500'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className='w-4 h-4 fill-current' />
                    ))}
                  </div>
                </div>
                <p className='text-gray-300 mb-4'>
                  "BetterUptime has been a game-changer for our team. The alerts
                  are instant and the status pages look amazing."
                </p>
                <div className='flex items-center'>
                  <div className='w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3'>
                    JS
                  </div>
                  <div>
                    <div className='font-semibold text-white'>John Smith</div>
                    <div className='text-sm text-gray-400'>CTO, TechCorp</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-800'>
              <CardContent className='p-6'>
                <div className='flex items-center mb-4'>
                  <div className='flex text-yellow-500'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className='w-4 h-4 fill-current' />
                    ))}
                  </div>
                </div>
                <p className='text-gray-300 mb-4'>
                  "The global monitoring gives us confidence that our users
                  worldwide have a great experience."
                </p>
                <div className='flex items-center'>
                  <div className='w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold mr-3'>
                    MJ
                  </div>
                  <div>
                    <div className='font-semibold text-white'>
                      Maria Johnson
                    </div>
                    <div className='text-sm text-gray-400'>
                      DevOps Lead, StartupXYZ
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-gray-900 border-gray-800'>
              <CardContent className='p-6'>
                <div className='flex items-center mb-4'>
                  <div className='flex text-yellow-500'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className='w-4 h-4 fill-current' />
                    ))}
                  </div>
                </div>
                <p className='text-gray-300 mb-4'>
                  "Setup was incredibly easy and the analytics help us optimize
                  our infrastructure proactively."
                </p>
                <div className='flex items-center'>
                  <div className='w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold mr-3'>
                    DL
                  </div>
                  <div>
                    <div className='font-semibold text-white'>David Lee</div>
                    <div className='text-sm text-gray-400'>
                      Engineering Manager, ScaleUp
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Logos */}
          <div className='grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-50'>
            <div className='flex items-center justify-center'>
              <div className='text-2xl font-bold text-gray-600'>TechCorp</div>
            </div>
            <div className='flex items-center justify-center'>
              <div className='text-2xl font-bold text-gray-600'>StartupXYZ</div>
            </div>
            <div className='flex items-center justify-center'>
              <div className='text-2xl font-bold text-gray-600'>ScaleUp</div>
            </div>
            <div className='flex items-center justify-center'>
              <div className='text-2xl font-bold text-gray-600'>DevCo</div>
            </div>
            <div className='flex items-center justify-center col-span-2 md:col-span-1'>
              <div className='text-2xl font-bold text-gray-600'>CloudTech</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='container mx-auto px-4 lg:px-6'>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl md:text-5xl font-bold mb-6'>
              Start monitoring your website today
            </h2>
            <p className='text-xl text-gray-400 mb-8'>
              Join thousands of companies that trust BetterUptime to keep their
              websites running smoothly.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'>
              <Input
                type='email'
                placeholder='Enter your email address'
                className='w-80 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500'
              />
              <Button size='lg' className='bg-green-600 hover:bg-green-700'>
                Start Free Trial
                <ArrowRight className='w-4 h-4 ml-2' />
              </Button>
            </div>
            <p className='text-sm text-gray-500'>
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-gray-800 bg-gray-950'>
        <div className='container mx-auto px-4 lg:px-6 py-12'>
          <div className='grid md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center space-x-2 mb-4'>
                <Activity className='h-6 w-6 text-green-500' />
                <span className='text-lg font-bold'>BetterUptime</span>
              </div>
              <p className='text-gray-400 mb-4'>
                The most reliable website monitoring service for modern teams.
              </p>
              <div className='flex space-x-4'>
                <div className='w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center'>
                  <span className='text-xs'>𝕏</span>
                </div>
                <div className='w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center'>
                  <span className='text-xs'>in</span>
                </div>
                <div className='w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center'>
                  <span className='text-xs'>gh</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-4 text-white'>Product</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    Features
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    API
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-semibold mb-4 text-white'>Company</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    About
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-semibold mb-4 text-white'>Support</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    Status
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:text-white transition-colors'>
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>
              © {new Date().getFullYear()} BetterUptime. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link
                href='#'
                className='text-gray-400 hover:text-white text-sm transition-colors'
              >
                Terms of Service
              </Link>
              <Link
                href='#'
                className='text-gray-400 hover:text-white text-sm transition-colors'
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
