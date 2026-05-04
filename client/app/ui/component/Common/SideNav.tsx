// import { Menu } from 'primereact/menu';
import { PanelMenu } from 'primereact/panelmenu';

export default function SideNav() {
  // NOTE: Contents of sidenavbar
  const items = [
    { label: 'Homepage', icon: 'pi pi-home', url: '/' },
    {
      label: 'Dashboard',
      icon: 'pi pi-list',
      items: [
        { label: 'Articles', icon: 'pi pi-list', url: '/dashboard/articles' },
        { label: 'Users', icon: 'pi pi-user', url: '/dashboard/users' },
        // { label: 'Settings', icon: 'pi pi-cog', url: '/dashboard/settings' },
      ],
    },
    // TODO: Logged-in user info
    // TODO: Logout button

    // TEMP: Access to pages under development
    { label: 'Login', icon: 'pi pi-sign-in', url: '/login' },
    { label: 'Reset', icon: 'pi pi-spin pi-undo', url: '/reset' },

  ];

  return (
    <PanelMenu model={items} className='h-full max-w-64 shadow-lg rounded-sm'/>
  );
}
