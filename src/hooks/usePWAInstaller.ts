import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIOSGuide, setShowIOSGuide] = useState<boolean>(false);
  const [showTestGuide, setShowTestGuide] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const installedHandler = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", installedHandler);

    // Detect iOS Safari immediately, not just on load
    const detectInstallStatus = () => {
      // Detect standalone mode (Android/desktop)
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }
      // Detect iOS Safari standalone
      const isIOSDevice = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
      const isStandaloneIOS = (window.navigator as any).standalone === true;
      if (isIOSDevice) {
        setIsIOS(true);
      }
      if (isStandaloneIOS) {
        setIsInstalled(true);
      }
    };

    // Run detection immediately
    detectInstallStatus();

    // Also run on page load for consistency
    window.addEventListener("load", detectInstallStatus);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
      window.removeEventListener("load", detectInstallStatus);
    };
  }, []);

  const triggerInstall = async () => {
    // If Chrome/Edge style prompt is available, use it
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
      return;
    }

    // Check again for iOS in case it wasn't detected on load
    const checkIOSAgain = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    if ((checkIOSAgain || isIOS) && !isInstalled) {
      // Make sure iOS state is set (in case it wasn't before)
      if (!isIOS) {
        setIsIOS(true);
      }
      // Show iOS guide
      setShowIOSGuide(true);
      return;
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
  };

  useEffect(() => {
    const dismissedTime = localStorage.getItem("pwa-prompt-dismissed");
    if (
      dismissedTime &&
      Date.now() - parseInt(dismissedTime) < 7 * 24 * 60 * 60 * 1000
    ) {
      setShowPrompt(false);
    }
  }, []);

  const closeIOSGuide = useCallback(() => {
    setShowIOSGuide(false);
    setShowTestGuide(false);
  }, []);

  const openTestGuide = useCallback(() => {
    setShowTestGuide(true);
  }, []);

  return {
    deferredPrompt,
    isInstalled,
    showPrompt,
    triggerInstall,
    dismissPrompt,
    isIOS,
    showIOSGuide,
    closeIOSGuide,
    showTestGuide,
    openTestGuide,
  };
};
