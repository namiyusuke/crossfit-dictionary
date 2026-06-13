"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/**
 * localStorage を外部ストアとして購読する。
 * useSyncExternalStore を使うことで、prop/状態を effect でミラーする必要がなくなり、
 * ハイドレーション時の「古い値が一瞬見える」余計な再レンダーを避けられる。
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener("storage", onStoreChange);
    return () => window.removeEventListener("storage", onStoreChange);
  }, []);

  // JSON.parse は毎回新しい参照を返すため、同じ生文字列に対しては
  // パース結果をキャッシュして参照を安定させる（useSyncExternalStore の要件）。
  const cache = useRef<{ key: string; raw: string | null; value: T }>({
    key,
    raw: null,
    value: initialValue,
  });

  const getSnapshot = useCallback((): T => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
    if (raw === null) return initialValue;
    if (cache.current.key !== key || cache.current.raw !== raw) {
      try {
        cache.current = { key, raw, value: JSON.parse(raw) as T };
      } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        cache.current = { key, raw, value: initialValue };
      }
    }
    return cache.current.value;
  }, [key, initialValue]);

  const getServerSnapshot = useCallback((): T => initialValue, [initialValue]);

  const storedValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // サーバー/初回レンダーは false、ハイドレーション後に true。
  const isHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const current = getSnapshot();
        const valueToStore = value instanceof Function ? value(current) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // 同一タブ内の購読者にも変更を通知する（storage イベントは通常別タブのみ発火）。
        window.dispatchEvent(new StorageEvent("storage", { key }));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, getSnapshot]
  );

  return [storedValue, setValue, isHydrated];
}
