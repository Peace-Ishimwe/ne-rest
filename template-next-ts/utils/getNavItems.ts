// Define user roles
type UserRole = "USER" | "SUPERVISOR" | "ADMIN";

// Common navigation items that might be shared across roles
const COMMON_NAV_ITEMS: Partial<Record<UserRole, NavItem[]>> = {
  USER: [{ name: "Dashboard", href: "/app", icon: "duo-icons:app" }],
  ADMIN: [{ name: "Dashboard", href: "/admin", icon: "duo-icons:app" }],
  SUPERVISOR: [{ name: "Dashboard", href: "/supervisor", icon: "duo-icons:app" }],
};

// Role-specific navigation items
const ROLE_SPECIFIC_NAV_ITEMS: Partial<Record<UserRole, NavItem[]>> = {
  USER: [
    {
      name: "Documents",
      icon: "cuida:document-texts-outline",
      subItems: [
        { name: "All Documents", href: "/app/documents/all" },
        { name: "My documents", href: "/app/documents/my-documents" },
      ],
    },
    {
      name: "Announce Found",
      icon: "gg:search-found",
      href: "/app/announce-found",
    },
    {
      name: "Announcements",
      href: "/app/announcements",
      icon: "cuida:folder-outline",
    },
  ],
  ADMIN: [
    {
      name: "Announcements",
      icon: "mingcute:announcement-line",
      href: "/admin/announcements",
    },
    {
      name: "Documents",
      href: "/admin/documents",
      icon: "solar:documents-outline",
      subItems: [
        { name: "Announced Founds", href: "/admin/documents/announced-founds" },
        { name: "Claimed Founds", href: "/admin/documents/claimed-founds" },
        { name: "Pick Up", href: "/admin/documents/pick-up" },
        { name: "Delivery", href: "/admin/documents/delivery" },
      ],
    },
    {
      name: "Supervisors",
      href: "/admin/supervisors",
      icon: "ic:round-supervisor-account",
    },
    { name: "Chats", href: "/admin/chats", icon: "lets-icons:chat-fill" },
    { name: "Notifications", href: "/admin/notifications", icon: "solar:bell-bold" },
    {
      name: "Help Center",
      href: "/admin/help-center",
      icon: "material-symbols:help-outline",
    },
    { name: "Settings", href: "/admin/settings", icon: "ci:settings" },
  ],
  SUPERVISOR: [
    {
      name: "Announcements",
      icon: "mingcute:announcement-line",
      href: "/supervisor/announcements",
    },
    {
      name: "Found documents",
      icon: "gg:search-found",
      subItems: [
        { name: "Non-Reviewed", href: "/supervisor/documents/found/non-reviewed" },
        { name: "Reviewed", href: "/supervisor/documents/found/reviewed" },
      ],
    },
    {
      name: "To-Deliver Docs",
      href: "/supervisor/documents/delivery",
      icon: "icon-park-outline:delivery",
      subItems: [
        { name: "Pending delivery", href: "/supervisor/documents/delivery/pending" },
        { name: "Initiated delivery", href: "/supervisor/documents/delivery/initiated" },
        { name: "Completed delivery", href: "/supervisor/documents/delivery/completed" },
      ],
    },
    {
      name: "Document Tracking",
      href: "/supervisor/documents/tracking",
      icon: "cuida:document-texts-outline",
      subItems: [
        { name: "Initiated delivery", href: "/supervisor/documents/tracking/initiated" },
        { name: "Completed delivery", href: "/supervisor/documents/tracking/completed" },
      ],
    },
    {
      name: "Pickup Docs",
      href: "/supervisor/documents/pickup",
      icon: "mynaui:credit-card-check",
    },
  ],
};

// Main function to get navigation items based on role
export function getNavItems(role: UserRole): NavItem[] {
  const commonItems = COMMON_NAV_ITEMS[role] || [];
  const specificItems = ROLE_SPECIFIC_NAV_ITEMS[role] || [];

  return [...commonItems, ...specificItems];
}
