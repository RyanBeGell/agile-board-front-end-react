import { ElementType } from 'react';
import {
  Layout, Users, Calendar, Settings, Plus, Briefcase, Home, Star, CheckSquare,
  FileText, BarChart2, MessageSquare, Clock, MapPin, Archive, Feather, Tag,
  Database, Camera,
} from 'lucide-react';

// Define all valid icon names as a type
export type IconNames = 'Layout' | 'Users' | 'Calendar' | 'Settings'  |
  'Briefcase' | 'Home' | 'Star' | 'CheckSquare' | 'FileText' | 'BarChart2' |
  'MessageSquare' | 'Clock' | 'MapPin' | 'Archive' | 'Feather' | 'Tag' |
  'Database' | 'Camera';

// Index signature stating that any property matching IconNames will return a React component type
export const iconMap: { [key in IconNames]: ElementType } = {
  Layout, Users, Calendar, Settings, Briefcase, Home, Star, CheckSquare,
  FileText, BarChart2, MessageSquare, Clock, MapPin, Archive, Feather, Tag,
  Database, Camera
};