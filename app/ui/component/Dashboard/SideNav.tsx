import { Menu } from 'primereact/menu';

export default function SideNav() {
  // NOTE: Contents of sidenavbar
  const items = [
    { label: 'Dashboard', icon: 'pi pi-home', url: '/dashboard' },
    // { label: 'Settings', icon: 'pi pi-cog', url: '/settings' },
    { label: 'External', icon: 'pi pi-external-link', url: 'https://react.dev/' },
    // TODO: Logged-in user info
    // TODO: Logout button

    // TEMP: Access to pages under development
    { label: 'Login', icon: 'pi pi-sign-in', url: '/login' },
    { label: 'Reset', icon: 'pi pi-spin pi-undo', url: '/reset' },

  ];

  return (
    <Menu model={items} />
  );
}
