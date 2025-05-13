import { useAuth } from "../context/AuthContext";
import pl from "../i18n/pl.json";
import en from "../i18n/en.json";
import de from "../i18n/de.json";

const translations = { pl, en, de };

export function useTranslation() {
  const { language } = useAuth();
  const t = (key) => translations[language]?.[key] || key;
  return { t };
}
