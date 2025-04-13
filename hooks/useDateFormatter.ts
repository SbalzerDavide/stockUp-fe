import { useCallback } from 'react';

interface DateFormatterOptions {
  locale?: string;
  showYear?: boolean;
  yearDigits?: 2 | 4;
}

/**
 * Hook personalizzato per la formattazione delle date
 * @returns Oggetto con funzioni per formattare le date
 */
export function useDateFormatter() {
  /**
   * Formatta una data in formato italiano (DD/MM/YY)
   * @param date - La data da formattare
   * @param options - Opzioni di formattazione
   * @returns La data formattata
   */
  const formatDate = useCallback((date: Date | string | number, options: DateFormatterOptions = {}) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    const {
      locale = 'it-IT',
      showYear = true,
      yearDigits = 2
    } = options;

    if (isNaN(dateObj.getTime())) {
      return 'Data non valida';
    }

    const formatOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
    };

    if (showYear) {
      formatOptions.year = yearDigits === 2 ? '2-digit' : 'numeric';
    }

    return dateObj.toLocaleString(locale, formatOptions);
  }, []);

  /**
   * Restituisce solo la parte della data (DD/MM/YY)
   */
  const formatDateOnly = useCallback((date: Date | string | number) => {
    return formatDate(date, { showYear: true });
  }, [formatDate]);

  return {
    formatDate,
    formatDateOnly,
  };
} 