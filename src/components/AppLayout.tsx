import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpenText, Search as SearchIcon, Settings as SettingsIcon, Menu, X } from "lucide-react";
import lpuLogo from "@/assets/lpu-logo.png";

const navItems = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/read", label: "Read", icon: BookOpenText },
  { to: "/search", label: "Search", icon: SearchIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

const AppLayout = ({ children, title = "MTH166 - Mathematics for Engineers" }: { children: ReactNode; title?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary text-primary-foreground flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center gap-3 px-5 border-b border-primary-foreground/10">
          <img src={lpuLogo} alt="Lovely Professional University" className="w-9 h-9 object-contain bg-white rounded-md p-1" />
          <div className="leading-tight">
            <div className="font-bold text-sm">MTH166</div>
            <div className="text-xs text-primary-foreground/60">LPU</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 text-xs text-primary-foreground/50 border-t border-primary-foreground/10">
          Mathematics for Engineers
        </div>
      </aside>

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center px-4 lg:px-8 sticky top-0 z-20">
          <button
            className="lg:hidden p-2 mr-2 rounded-md hover:bg-muted"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <img src={lpuLogo} alt="LPU" className="w-9 h-9 object-contain mr-3" />
          <h1 className="text-lg md:text-xl font-semibold text-foreground truncate">{title}</h1>
        </header>

        <main className="flex-1 relative">
          {children}
          <footer className="px-6 py-4 text-right text-xs md:text-sm text-muted-foreground border-t border-border bg-card/50">
            Developed by <span className="font-semibold text-foreground">Blessing Mapuranga</span>, LPU Mechanical Engineering student.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;