import { BookOpen, Github, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about" className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg">MTH166</span>
                <span className="text-primary-foreground/60 text-sm block -mt-1">Mathematics for Engineers</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 max-w-md">
              A comprehensive resource for engineering mathematics covering calculus, 
              linear algebra, differential equations, and more. Designed to help students 
              succeed in their engineering studies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Topics", "Resources", "Practice"].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  University Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2024 MTH166 - Mathematics for Engineers. All rights reserved.
          </p>
          <p className="text-primary-foreground/50 text-sm">
            Built with ❤️ for engineering students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
