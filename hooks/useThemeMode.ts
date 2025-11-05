'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleTheme } from '@/store/tableSlice';
import { useCallback } from 'react';

export function useThemeMode() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.table.theme);

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    if (currentTheme !== theme) {
      dispatch(toggleTheme());
    }
  }, [currentTheme, dispatch]);

  return {
    theme: currentTheme,
    toggle,
    setTheme,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light',
  };
}