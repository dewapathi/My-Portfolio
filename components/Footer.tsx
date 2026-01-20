"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-8 sm:py-12">
      <div className="container-custom section-padding">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Pradeep Alakruwan</p>
            <p className="text-xs sm:text-sm">Full Stack Software Engineer</p>
          </div>
          
          <div className="flex space-x-4 sm:space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors p-2 -m-2"
                aria-label={label}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center text-xs sm:text-sm px-4">
          <p>&copy; {new Date().getFullYear()} Pradeep Alakruwan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
