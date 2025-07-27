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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Navigation */}
      <NavBar />

 {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      */}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative text-center max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 mt-3 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
              <Mountain className="w-4 h-4 mr-2" />
              Trusted by 500+ geological teams worldwide
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Geological Survey
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent"> Management </span>
            System
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline your geological surveys with our comprehensive platform. Manage equipment bookings, track projects, and generate reports all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TransitionPostcard />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 mt-4">
            <button className="group bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 flex items-center">
              Start Managing Surveys
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group flex items-center text-white/80 hover:text-white px-8 py-4 rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300">
              <Play className="mr-2 w-5 h-5" />
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/60">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-white/60">Equipment Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60">Field Support</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      */}
      {/* Quick Actions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quick Actions
            </h2>
            <p className="text-white/70">
              Get started with the most common survey management tasks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer">
              <Calendar className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">Book Equipment</h3>
              <p className="text-white/60 text-sm">Reserve geological instruments for your next survey</p>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer">
              <MapPin className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">View Projects</h3>
              <p className="text-white/60 text-sm">Monitor active surveys and project progress</p>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-teal-500/30 transition-all duration-300 cursor-pointer">
              <FileText className="w-8 h-8 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">Generate Reports</h3>
              <p className="text-white/60 text-sm">Create professional geological survey reports</p>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer">
              <Users className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">Manage Team</h3>
              <p className="text-white/60 text-sm">Coordinate field teams and assign tasks</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
            <VideoBanner videoName="images/vid1.mp4" />
        </div>
        </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Modernize Your Surveys?
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Join geological teams worldwide who trust GeoSurvey Pro for their field operations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="text-white/80 hover:text-white px-8 py-4 rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Compass className="w-8 h-8 text-emerald-400 mr-2" />
                <div className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent text-2xl font-bold">
                  GeoSurvey Pro
                </div>
              </div>
              <p className="text-white/70 mb-6 max-w-md">
                The leading geological survey management platform trusted by professionals worldwide. Streamline your field operations with our comprehensive suite of tools.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-400/30 border border-white/20 transition-all duration-300 group">
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/30 border border-white/20 transition-all duration-300 group">
                  <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 border border-white/20 transition-all duration-300 group">
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-pink-500/20 hover:border-pink-400/30 border border-white/20 transition-all duration-300 group">
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-gray-500/20 hover:border-gray-400/30 border border-white/20 transition-all duration-300 group">
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
               <Link to="/equipments"><li><h3 className="text-white/70 hover:text-emerald-400 transition-colors">Equipment Booking</h3></li></Link>
                <Link to="/project-management"><li><h3 className="text-white/70 hover:text-emerald-400 transition-colors">Project Management</h3></li></Link>
                <Link to="/learn"><li><h3 className="text-white/70 hover:text-emerald-400 transition-colors">Learn</h3></li></Link>
                <Link to="/team-collaboration"><li><h3 className="text-white/70 hover:text-emerald-400 transition-colors">Team Collaboration</h3></li></Link>
                <Link to="/field-support"><li><h3 className="text-white/70 hover:text-emerald-400 transition-colors">Field Support</h3></li></Link>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-white/70">
                  <Mail className="w-4 h-4 mr-2 text-emerald-400" />
                  support@geosurvey.pro
                </li>
                <li className="text-white/70">+94 786992914</li>
                <li className="text-white/70">24/7 Field Support</li>
                <li><a href="#" className="text-white/70 hover:text-emerald-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/70 hover:text-emerald-400 transition-colors">Documentation</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm mb-4 md:mb-0">
              © 2025 GeoSurvey Pro. All rights reserved. | Privacy Policy | Terms of Service
            </div>
            <div className="text-white/60 text-sm">
              Built for geological professionals worldwide
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}