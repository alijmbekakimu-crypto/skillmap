import { Monitor, Server, Layers, Code2, PenTool, Palette, Clapperboard, Box, BarChart3, Cpu, Users, Briefcase } from 'lucide-react';

const icons = { Monitor, Server, Layers, Code2, PenTool, Palette, Clapperboard, Box, BarChart3, Cpu, Users };

export default function ProfessionIcon({ name, size = 22 }) {
  const Icon = icons[name] || Briefcase;
  return <Icon size={size} />;
}
