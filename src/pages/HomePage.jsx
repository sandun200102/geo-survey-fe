import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, MapPin, Users, Wrench, FileText, ChevronDown, Menu, X, Calendar, Compass, Mountain, Search, Facebook, Twitter, Linkedin, Instagram, Github, Mail } from 'lucide-react';
import NavBar from '../components/NavBar';
import TransitionPostcard from '../components/TransitionPostcard';
import { motion } from 'framer-motion';
import VideoBanner from '../components/Video';
import { Link } from 'react-router-dom';

export default function GeologicalSurveyHomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check initial size
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 pt-0">
        {/* Animated Background Elements - Optimized for mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 sm:opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 sm:opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-80 sm:h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 sm:opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative text-center max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mt-3 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
              <Mountain className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Trusted by 500+ geological teams worldwide</span>
              <span className="xs:hidden">500+ teams worldwide</span>
            </span>
          </div>
          
          {/* Responsive Typography */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            <span className="block sm:inline">Geological Survey</span>
            <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">Management System</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-8 sm:mb-12 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
            Streamline your geological surveys with our comprehensive platform. Manage equipment bookings, track projects, and generate reports all in one place.
          </p>
          
          {/* TransitionPostcard Component */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <TransitionPostcard />
          </div>

          {/* Action Buttons - Mobile Optimized */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <button className="w-full xs:w-auto group bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 flex items-center justify-center">
              <span className="mr-2">Start Managing Surveys</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="w-full xs:w-auto group flex items-center justify-center text-white/80 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300">
              <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              <span>View Demo</span>
            </button>
          </div>

          {/* Stats - Mobile Responsive Grid */}
          {/* <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-8 max-w-sm xs:max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">500+</div>
              <div className="text-sm sm:text-base text-white/60">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">98%</div>
              <div className="text-sm sm:text-base text-white/60">Equipment Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">24/7</div>
              <div className="text-sm sm:text-base text-white/60">Field Support</div>
            </div>
          </div> */}
        </div>

        {/* Scroll Indicator - Hidden on very small screens */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden xs:block">
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" />
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Quick Actions
            </h2>
            <p className="text-sm sm:text-base text-white/70 px-4">
              Get started with the most common survey management tasks
            </p>
          </div>

          {/* Mobile-First Grid Layout */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="group p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform mx-auto xs:mx-0" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 text-center xs:text-left">Book Equipment</h3>
              <p className="text-white/60 text-xs sm:text-sm text-center xs:text-left">Reserve geological instruments for your next survey</p>
            </div>

            <div className="group p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform mx-auto xs:mx-0" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 text-center xs:text-left">View Projects</h3>
              <p className="text-white/60 text-xs sm:text-sm text-center xs:text-left">Monitor active surveys and project progress</p>
            </div>

            <div className="group p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-teal-500/30 transition-all duration-300 cursor-pointer">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform mx-auto xs:mx-0" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 text-center xs:text-left">Generate Reports</h3>
              <p className="text-white/60 text-xs sm:text-sm text-center xs:text-left">Create professional geological survey reports</p>
            </div>

            <div className="group p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer xs:col-span-2 lg:col-span-1">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform mx-auto xs:mx-0" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 text-center xs:text-left">Manage Team</h3>
              <p className="text-white/60 text-xs sm:text-sm text-center xs:text-left">Coordinate field teams and assign tasks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto text-center">
          <VideoBanner videoName="images/vid1.mp4" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Ready to Modernize Your Surveys?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-12 px-4">
            Join geological teams worldwide who trust GeoSurvey Pro for their field operations
          </p>
          
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button className="w-full xs:w-auto bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="w-full xs:w-auto text-white/80 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-8 sm:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-xs sm:max-w-2xl md:max-w-5xl lg:max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Company Info */}
            <div className="sm:col-span-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start mb-4">
                <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mr-2" />
                <div className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent text-xl sm:text-2xl font-bold">
                  GeoSurvey Pro
                </div>
              </div>
              <p className="text-white/70 mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0 text-sm sm:text-base px-2 sm:px-0">
                The leading geological survey management platform trusted by professionals worldwide. Streamline your field operations with our comprehensive suite of tools.
              </p>
              <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-400/30 border border-white/20 transition-all duration-300 group">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/30 border border-white/20 transition-all duration-300 group">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 border border-white/20 transition-all duration-300 group">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-pink-500/20 hover:border-pink-400/30 border border-white/20 transition-all duration-300 group">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-gray-500/20 hover:border-gray-400/30 border border-white/20 transition-all duration-300 group">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <Link to="/equipments">
                  <li><h3 className="text-white/70 hover:text-emerald-400 transition-colors text-sm sm:text-base">Equipment Booking</h3></li>
                </Link>
                <Link to="/project-management">
                  <li><h3 className="text-white/70 hover:text-emerald-400 transition-colors text-sm sm:text-base">Project Management</h3></li>
                </Link>
                <Link to="/learn">
                  <li><h3 className="text-white/70 hover:text-emerald-400 transition-colors text-sm sm:text-base">Learn</h3></li>
                </Link>
                <Link to="/team-collaboration">
                  <li><h3 className="text-white/70 hover:text-emerald-400 transition-colors text-sm sm:text-base">Team Collaboration</h3></li>
                </Link>
                <Link to="/field-support">
                  <li><h3 className="text-white/70 hover:text-emerald-400 transition-colors text-sm sm:text-base">Field Support</h3></li>
                </Link>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Contact</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li className="flex items-center justify-center sm:justify-start text-white/70 text-sm sm:text-base">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-emerald-400" />
                  <span className="break-all">support@geosurvey.pro</span>
                </li>
                <li className="text-white/70 text-sm sm:text-base">+94 786992914</li>
                <li className="text-white/70 text-sm sm:text-base">24/7 Field Support</li>
                <li><a href="#" className="text-white/70 hover:text-emerald-400 transition-colors text-sm sm:text-base">Help Center</a></li>
                <li><a href="#" className="text-white/70 hover:text-emerald-400 transition-colors text-sm sm:text-base">Documentation</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-white/60 text-xs sm:text-sm text-center sm:text-left">
              © 2025 GeoSurvey Pro. All rights reserved. | Privacy Policy | Terms of Service
            </div>
            <div className="text-white/60 text-xs sm:text-sm">
              Built for geological professionals worldwide
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}