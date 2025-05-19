// Define user roles
type UserRole = "User" | "Admin" | "SuperAdmin";

// Common navigation items that might be shared across roles
const COMMON_NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: "duo-icons:app" },
];

// Role-specific navigation items
const ROLE_SPECIFIC_NAV_ITEMS: Partial<Record<UserRole, NavItem[]>> = {
  User: [
    {
      name: "My Parking",
      icon: "fluent:vehicle-car-parking-24-regular",
      subItems: [
        { name: "View Bookings", href: "/parking/bookings" },
        { name: "Reserve Spot", href: "/parking/reserve" },
      ],
    },
    {
      name: "Parking History",
      icon: "mdi:history",
      href: "/parking/history",
    },
    {
      name: "Parking Rules",
      icon: "mdi:clipboard-list-outline",
      href: "/parking/rules",
    },
  ],
  Admin: [
    {
      name: "Manage Parking Spots",
      icon: "mdi:car-wrench",
      href: "/admin/parking-spots",
    },
    {
      name: "User Bookings",
      icon: "mdi:clipboard-account-outline",
      href: "/admin/user-bookings",
    },
    {
      name: "Reports",
      icon: "mdi:file-chart-outline",
      href: "/admin/reports",
    },
  ],
  SuperAdmin: [
    {
      name: "Admin Management",
      icon: "mdi:shield-account-outline",
      href: "/superadmin/admins",
    },
    {
      name: "System Settings",
      icon: "mdi:cog-outline",
      href: "/superadmin/settings",
    },
    {
      name: "Audit Logs",
      icon: "mdi:file-document-alert-outline",
      href: "/superadmin/logs",
    },
  ],
};

// Main function to get navigation items based on role
export function getNavItems(role: UserRole): NavItem[] {
  const commonItems = COMMON_NAV_ITEMS || [];
  const specificItems = ROLE_SPECIFIC_NAV_ITEMS[role] || [];

  return [...commonItems, ...specificItems];
}