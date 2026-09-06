"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// A hand-rolled combobox that replaces `<input list>` + `<datalist>`.
//
// The native pairing is the reason the discipline field showed no suggestions
// on iOS Safari: datalist rendering there is broken (and absent in Firefox on
// Android), so the same markup behaved differently on every platform. This
// renders the list itself, which makes the control identical everywhere.
//
// Free text stays allowed - the list is a shortcut, not a constraint.

/** Strips diacritics so "pilka nozna" matches "Piłka nożna". */
const PL_FOLD: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

function normalize(s: string) {
  return s.toLowerCase().replace(/[ąćęłńóśźż]/g, (c) => PL_FOLD[c] ?? c);
}

export function Combobox({
  id,
  value,
  onChange,
  options,
  placeholder,
  className,
  emptyHint,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
  className?: string;
  /** Shown when nothing matches, to make clear free text is fine. */
  emptyHint?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = `${useId()}-list`;

  // An exact hit means the user already picked something; showing the whole
  // list again is more useful than showing that one row back to them.
  const filtered = useMemo(() => {
    const q = normalize(value.trim());
    if (!q) return options;
    if (options.some((o) => normalize(o) === q)) return options;
    return options.filter((o) => normalize(o).includes(q));
  }, [options, value]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keeps the keyboard-highlighted row inside the scroll box.
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function commit(option: string) {
    onChange(option);
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setActive(e.key === "ArrowDown" ? 0 : filtered.length - 1);
        return;
      }
      const dir = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => {
        if (filtered.length === 0) return -1;
        const next = i + dir;
        if (next < 0) return filtered.length - 1;
        if (next >= filtered.length) return 0;
        return next;
      });
      return;
    }
    if (e.key === "Enter" && open && active >= 0 && filtered[active]) {
      e.preventDefault();
      commit(filtered[active]);
      return;
    }
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      setActive(-1);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && active >= 0 ? `${listId}-${active}` : undefined
        }
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onKeyDown={onKeyDown}
        onBlur={() => setOpen(false)}
        // 16px keeps iOS from zooming the viewport on focus.
        className="block w-full rounded-lg border border-navy-200 bg-white py-2.5 pl-3.5 pr-10 text-[16px] text-navy-950 outline-none transition-colors placeholder:text-navy-300 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20"
      />

      <button
        type="button"
        tabIndex={-1}
        aria-label={open ? "Zwiń listę" : "Rozwiń listę"}
        // Without this the input blurs first and the list closes before the
        // click lands - the classic reason a toggle "does nothing" on tap.
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((v) => !v)}
        className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-navy-400 transition-colors hover:text-navy-700"
      >
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 max-h-60 overflow-y-auto overscroll-contain rounded-lg border border-navy-200 bg-white py-1 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.28)]"
        >
          {filtered.length === 0 ? (
            <li className="px-3.5 py-2.5 text-[14px] text-muted-foreground">
              {emptyHint ?? "Brak podpowiedzi - wpisz własną."}
            </li>
          ) : (
            filtered.map((option, i) => (
              <li
                key={option}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={normalize(option) === normalize(value)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(option)}
                onMouseEnter={() => setActive(i)}
                // cursor-pointer is what makes iOS Safari deliver click events
                // on a non-interactive element.
                className={cn(
                  "cursor-pointer px-3.5 py-2.5 text-[15px] text-navy-950 transition-colors",
                  i === active ? "bg-navy-50" : "bg-white"
                )}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
