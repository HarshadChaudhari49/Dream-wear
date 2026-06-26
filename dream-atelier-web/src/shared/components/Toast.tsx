import { createContext, useContext, useState, useCallback, ReactNode, CSSProperties } from "react";
import { colors, radius, shadows, spacing, typography, zIndex } from "../tokens";

type ToastType = "success" | "error" | "info";

interface Toast {
  id:      number;
  message: string;
  type:    ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = 0;

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++counter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const ICONS: Record<ToastType, string> = {
    success: "✓",
    error:   "✕",
    info:    "·",
  };

  const BG: Record<ToastType, string> = {
    success: colors.success,
    error:   colors.error,
    info:    colors.rose,
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div style={containerStyle}>
        {toasts.map((t) => (
          <div key={t.id} className="toast-enter" style={{ ...toastStyle, background: BG[t.type] }}>
            <span style={{ fontWeight: 700, fontSize: "1.1em" }}>{ICONS[t.type]}</span>
            <span style={{ fontSize: typography.size.sm }}>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}

const containerStyle: CSSProperties = {
  position:       "fixed",
  bottom:         spacing.xl,
  right:          spacing.lg,
  display:        "flex",
  flexDirection:  "column",
  gap:            spacing.sm,
  zIndex:         zIndex.toast,
  maxWidth:       340,
};

const toastStyle: CSSProperties = {
  display:      "flex",
  alignItems:   "center",
  gap:          spacing.sm,
  padding:      `${spacing.sm} ${spacing.md}`,
  borderRadius: radius.md,
  color:        colors.white,
  boxShadow:    shadows.lg,
  fontSize:     typography.size.sm,
  fontWeight:   typography.weight.medium,
  minWidth:     220,
};
