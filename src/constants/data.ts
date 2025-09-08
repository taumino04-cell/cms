import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'areaManagement',
    url: '/lot-management',
    icon: 'map',
    isActive: false,
    shortcut: ['m', 'm'],
    items: [
      {
        title: 'lots',
        url: '/lot-management/lots',
        icon: 'stackFront',
        isActive: false,
        shortcut: ['m', '1']
      },
      {
        title: 'cycles',
        url: '/lot-management/cycles',
        icon: 'recycle',
        isActive: false,
        shortcut: ['m', '2']
      }
    ]
  },
  {
    title: 'productionLog',
    url: '/production-log',
    icon: 'bookText',
    isActive: false,
    shortcut: ['p', 'l'],
    items: [
      {
        title: 'weeklyPlan',
        url: '/production-log/weekly-plan',
        icon: 'calendarDays',
        isActive: false,
        shortcut: ['p', '1']
      },
      {
        title: 'taskApproval',
        url: '/production-log/daily-approval',
        icon: 'clipboardCheck',
        isActive: false,
        shortcut: ['p', '2']
      }
    ]
  },
  {
    title: 'workers',
    url: '/workforce',
    icon: 'users',
    isActive: false,
    shortcut: ['u', 'u'],
    items: [
      {
        title: 'workersList',
        url: '/workforce/employees',
        icon: 'userCircle',
        isActive: false,
        shortcut: ['u', '1']
      },
      {
        title: 'groupsManagement',
        url: '/workforce/groups',
        icon: 'group',
        isActive: false,
        shortcut: ['u', '2']
      },
      {
        title: 'contractTypes',
        url: '/workforce/contract-types',
        icon: 'fileText',
        isActive: false,
        shortcut: ['u', '3']
      },
      {
        title: 'jobAllocations',
        url: '/workforce/job-allocations',
        icon: 'calendarClock',
        isActive: false,
        shortcut: ['u', '4']
      }
    ]
  },
  {
    title: 'wareHouseManagement',
    url: '/warehouse-management',
    icon: 'wareHouse',
    isActive: false,
    shortcut: ['w', 'm']
  },
  {
    title: 'configFarm',
    url: '/farm-setup',
    icon: 'cog',
    isActive: false,
    shortcut: ['f', 's'],
    items: [
      {
        title: 'taskCategories',
        url: '/farm-setup/task-categories',
        icon: 'listCheck',
        isActive: false,
        shortcut: ['f', '1']
      },
      {
        title: 'processStages',
        url: '/farm-setup/production-stages',
        icon: 'factory',
        isActive: false,
        shortcut: ['f', '2']
      }
    ]
  }

  // {
  //   title: 'Product',
  //   url: '/dashboard/product',
  //   icon: 'product',
  //   shortcut: ['p', 'p'],
  //   isActive: false,
  //   items: [] // No child items
  // },
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm']
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // },
  // {
  //   title: 'Kanban',
  //   url: '/dashboard/kanban',
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [] // No child items
  // }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
