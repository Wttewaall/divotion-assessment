import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Label } from './ui/label';
import { titlecase } from '@/lib/text';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-switch"
        value={resolvedTheme}
        checked={isDark}
        onCheckedChange={() => setTheme(isDark ? 'light' : 'dark')}
      />
      <Label htmlFor="theme-switch">{titlecase(resolvedTheme)} mode</Label>
    </div>
  );
};

export default ThemeSwitch;
