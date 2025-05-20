// Define user roles
type UserRole = "User" | "Admin" | "ParkingAttendant";

// Common navigation items that might be shared across roles
const COMMON_NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: "duo-icons:app" },
  {
    name: "Available Parking Lots",
    icon: "mdi:car-wrench",
    href: "/dashboard/available-parking",
  },
];

// Role-specific navigation items
const ROLE_SPECIFIC_NAV_ITEMS: Partial<Record<UserRole, NavItem[]>> = {
  ParkingAttendant: [
    {
    name: "Car Entry",
    icon: "mdi:car-wrench",
    href: "/dashboard/car-entry",
  },
  ],
  Admin: [
    {
      name: "Manage Parking",
      icon: "mdi:car-wrench",
      href: "/dashboard/admin/parking",
    },
  ],
};

// Main function to get navigation items based on role
export function getNavItems(role: UserRole): NavItem[] {
  const commonItems = COMMON_NAV_ITEMS || [];
  const specificItems = ROLE_SPECIFIC_NAV_ITEMS[role] || [];

  return [...commonItems, ...specificItems];
}
