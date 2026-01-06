export interface NavItem {
  label: string;
  icon?: string;
  link: string;
  exact?: boolean;
  permission?: string;
  feature?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}
