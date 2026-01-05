'use client';

import { useCallback, useEffect, useState } from 'react';

interface Settings {
  hideHeaderOnScroll: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  hideHeaderOnScroll: true,
};

const COOKIE_NAME = 'cubico-settings';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() ?? null;
  }
  return null;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function loadSettings(): Settings {
  const cookie = getCookie(COOKIE_NAME);
  if (cookie) {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(cookie) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: Settings) {
  setCookie(COOKIE_NAME, JSON.stringify(settings), COOKIE_MAX_AGE);
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setIsLoaded(true);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const setHideHeaderOnScroll = useCallback((value: boolean) => {
    updateSettings({ hideHeaderOnScroll: value });
  }, [updateSettings]);

  return {
    settings,
    isLoaded,
    updateSettings,
    setHideHeaderOnScroll,
  };
}
