import { toast } from "sonner";

const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const host = typeof window !== "undefined" ? window.location.hostname : "";
const isPreviewHost =
  host.includes("id-preview--") ||
  host.includes("preview--") ||
  host.endsWith(".lovableproject.com") ||
  host.endsWith(".lovableproject-dev.com");

export const isPwaDisabled = isInIframe || isPreviewHost;

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  if (isPwaDisabled) {
    // Make sure no stale SW lingers in preview/editor contexts
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map((r) => r.unregister()));
    return;
  }

  try {
    const { Workbox } = await import("workbox-window");
    const wb = new Workbox("/sw.js");

    let firstInstall = false;
    wb.addEventListener("installed", (event) => {
      if (!event.isUpdate) {
        firstInstall = true;
        toast.success("Offline ready", {
          description: "App and viewed PDFs will work without internet.",
        });
      }
    });

    wb.addEventListener("waiting", () => {
      toast("Update available", {
        description: "Reload to get the latest version.",
        action: {
          label: "Reload",
          onClick: () => {
            wb.addEventListener("controlling", () => window.location.reload());
            wb.messageSkipWaiting();
          },
        },
      });
    });

    await wb.register();

    window.addEventListener("online", () => toast.success("Back online"));
    window.addEventListener("offline", () =>
      toast("You are offline", { description: "Cached content is still available." }),
    );

    void firstInstall;
  } catch (err) {
    console.warn("[pwa] Service worker registration failed", err);
  }
}