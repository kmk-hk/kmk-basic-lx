import { t } from "@/lib/game/i18n";
import { useGame } from "@/lib/game/store";
import { cn } from "@/lib/utils";

export function LangToggle() {
  const locale = useGame((s) => s.locale);
  const setLocale = useGame((s) => s.setLocale);

  return (
    <div
      className="flex rounded-md border border-border bg-surface-2 p-0.5"
      role="group"
      aria-label={t(locale, "lang.switch")}
    >
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={cn(
          "h-8 min-w-9 rounded-sm px-2 font-mono text-xs",
          locale === "zh" ? "bg-accent text-accent-fg" : "text-muted",
        )}
      >
        {t(locale, "lang.zh")}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "h-8 min-w-9 rounded-sm px-2 font-mono text-xs",
          locale === "en" ? "bg-accent text-accent-fg" : "text-muted",
        )}
      >
        {t(locale, "lang.en")}
      </button>
    </div>
  );
}
