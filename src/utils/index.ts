export const ROUTES = {
  TECHNICIAN: '/tech-view',
  ENGINEER: '/engineer-view',
  ADMIN: '/admin-dashboard',
  HOD: '/hod-view',
  DEFAULT: '/login',
  OIL_FLUIDS: '/asset-management/oil-fluids',
  ASSET_HUB: '/asset-management',
  TOOLS: '/asset-management/tools',
  MECHANICAL: '/asset-management/mechanical',
  ELECTRICAL: '/asset-management/electrical',
  FILTERS: '/asset-management/filters',
  CUSTOM: '/asset-management/custom',
  MASTER_ANALYSIS: '/asset-management/master'
};

export const formatTime = (createdAt: string): string => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} hours ago`;
  } else {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(createdDate);
  }
};
