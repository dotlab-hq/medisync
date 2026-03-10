import { getLocale, locales, setLocale } from '@/paraglide/runtime'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Globe } from 'lucide-react'

const localeLabels: Record<string, string> = {
  en: 'EN',
  de: 'DE',
  hi: 'हि',
}

export default function ParaglideLocaleSwitcher() {
  const currentLocale = getLocale()

  return (
    <Select value={currentLocale} onValueChange={(val) => setLocale(val)}>
      <SelectTrigger
        size="sm"
        className="h-9 w-auto min-w-[4.5rem] gap-1.5 rounded-lg border-border/50 bg-muted/50 px-2.5 text-sm font-medium"
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {localeLabels[locale] ?? locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
