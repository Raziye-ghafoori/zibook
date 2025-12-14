"use client";

import React, { useMemo, useState } from "react";
import jalaali from "jalaali-js";

type CalendarProps = {
  onSelect?: (isoDate: string) => void;
};

export default function Calendar({ onSelect }: CalendarProps) {
  // now in jalali
  const now = new Date();
  const jNow = jalaali.toJalaali(now);

  const [jy, setJy] = useState<number>(jNow.jy);
  const [jm, setJm] = useState<number>(jNow.jm);
  const [selected, setSelected] = useState<string | null>(null);

  // length of current jalali month
  const monthLength = useMemo(() => jalaali.jalaaliMonthLength(jy, jm), [jy, jm]);

  // compute first weekday of the jalali month (JS getDay: 0=Sun ... 6=Sat).
  // We want grid starting from Saturday, so compute startIndex such that Saturday -> 0
  const startIndex = useMemo(() => {
    const first = jalaali.toGregorian(jy, jm, 1); // { gy, gm, gd }
    const jsWeekday = new Date(first.gy, first.gm - 1, first.gd).getDay();
    return (jsWeekday + 1) % 7; // Saturday -> 0, Sunday -> 1, ...
  }, [jy, jm]);

  // build days array with leading nulls
  const cells = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < startIndex; i++) arr.push(null);
    for (let d = 1; d <= monthLength; d++) arr.push(d);
    // optionally fill trailing blanks so total % 7 === 0 (keeps grid consistent)
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [startIndex, monthLength]);

  function formatPersianNumber(n: number | string) {
    return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
  }

  function isoFor(d: number) {
    const mm = String(jm).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${dd}-${mm}-${jy}`;
  }

  function handleSelect(d?: number) {
    if (!d) return;
    const iso = isoFor(d);
    setSelected(iso);
    onSelect?.(iso);
  }

  function prevMonth() {
    if (jm === 1) {
      setJy(jy - 1);
      setJm(12);
    } else setJm(jm - 1);
  }

  function nextMonth() {
    if (jm === 12) {
      setJy(jy + 1);
      setJm(1);
    } else setJm(jm + 1);
  }

  return (
    <div className="w-full max-w-sm p-4 border rounded-xl bg-white">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="px-2 py-1 rounded bg-gray-100">قبلی</button>
        <div className="font-semibold text-gray-800">
          {formatPersianNumber(jm)} <span className="mx-1">/</span> {formatPersianNumber(jy)}
        </div>
        <button onClick={nextMonth} className="px-2 py-1 rounded bg-gray-100">بعدی</button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm text-gray-600 mb-2">
        {"ش ی د س چ پ ج".split(" ").map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {cells.map((d, i) => {
          if (!d) {
            return <div key={i} className="h-9" />;
          }
          const iso = isoFor(d);
          const isSelected = selected === iso;
          return (
            <button
              key={i}
              onClick={() => handleSelect(d)}
              className={
                "h-9 flex items-center justify-center rounded transition " +
                (isSelected
                  ? "bg-rose-500 text-white shadow"
                  : "hover:bg-rose-100 bg-white")
              }
            >
              {formatPersianNumber(d)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
