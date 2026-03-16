import { createContext, useContext, useMemo, useState } from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarContext = createContext(null);

export function SidebarProvider({ children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggleSidebar: () => setOpen((current) => !current),
    }),
    [open]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider");
  }

  return context;
}

export function Sidebar({ className, children }) {
  const { open } = useSidebar();
  return (
    <aside
      className={cn(
        "fixed left-0 inset-y-0 z-40 w-full max-w-[384px] border-r border-border backdrop-blur sm:w-[85vw]",
        "bg-[var(--sidebar-bg)]",
        "flex flex-col overflow-hidden",
        "transition-transform duration-300 ease-in-out",
        "lg:translate-x-0 lg:relative lg:z-auto",
        !open && "-translate-x-full lg:translate-x-0",
        open && "translate-x-0",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarTrigger({ className, ...props }) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-lg p-2",
        "text-muted-foreground hover:bg-accent hover:text-foreground",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
      {...props}
    >
      <PanelLeft size={18} />
    </button>
  );
}

export function SidebarHeader({ children, className }) {
  return (
    <div className={cn("flex-shrink-0 px-4 pt-4 pb-2", className)}>
      {children}
    </div>
  );
}

export function SidebarContent({ children, className }) {
  return (
    <div className={cn("flex-1 overflow-y-auto px-3 pb-4", className)}>
      {children}
    </div>
  );
}

export function SidebarFooter({ children, className }) {
  return (
    <div className={cn("flex-shrink-0 border-t border-border px-4 py-3", className)}>
      {children}
    </div>
  );
}

export function SidebarGroup({ children, className }) {
  return (
    <section className={cn("py-2", className)}>
      {children}
    </section>
  );
}

export function SidebarGroupLabel({ children, className }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SidebarGroupContent({ children, className }) {
  return (
    <div className={cn("mt-1 space-y-1", className)}>
      {children}
    </div>
  );
}

export function SidebarMenu({ children, className }) {
  return (
    <div className={cn("space-y-1", className)}>
      {children}
    </div>
  );
}

export function SidebarMenuItem({ children, className }) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}

export function SidebarMenuButton({
  children,
  className,
  active = false,
  ...props
}) {
  return (
    <button
      type="button"
      data-active={active}
      className={cn(
        "flex items-center gap-3 w-full rounded-xl border border-transparent px-4 py-3 text-left",
        "transition-colors duration-150",
        "hover:bg-accent hover:border-blue-200",
        "data-[active=true]:bg-accent data-[active=true]:border-blue-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SidebarMenuMeta({ children, className }) {
  return (
    <span className={cn("ml-auto flex-shrink-0", className)}>
      {children}
    </span>
  );
}

export function SidebarSubmenu({ children, className }) {
  return (
    <div className={cn("ml-4 mt-1 space-y-0.5", className)}>
      {children}
    </div>
  );
}

export function SidebarSubmenuButton({
  children,
  className,
  active = false,
  ...props
}) {
  return (
    <button
      type="button"
      data-active={active}
      className={cn(
        "flex items-center gap-2 w-full rounded-lg px-3 py-2 text-left text-sm",
        "transition-colors duration-150",
        "hover:bg-accent hover:text-foreground",
        "data-[active=true]:bg-accent data-[active=true]:text-foreground data-[active=true]:font-medium",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
