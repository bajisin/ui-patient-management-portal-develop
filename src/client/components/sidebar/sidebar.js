import find from "lodash.find";
import { payPerEventIcon } from "@assets/images";

const getPermissionFlag = (userPermissions = [], menuPermissions) => {
  const allPermissions = [];
  const uniQuePermissions = [];
  let hasMenuAccess = false;
  userPermissions &&
    userPermissions.length &&
    userPermissions.forEach((permission) => {
      allPermissions.push(...permission.Role.permissions);
    });
  allPermissions &&
    allPermissions.length &&
    allPermissions.forEach((data) => {
      if (uniQuePermissions?.indexOf(data?.permissionId) === -1) {
        uniQuePermissions.push(data?.permissionId);
      }
    });
  if (menuPermissions?.permissions?.length) {
    if (menuPermissions?.requiresAll) {
      hasMenuAccess = menuPermissions?.permissions?.every((item) => uniQuePermissions?.includes(item));
    } else {
      hasMenuAccess = menuPermissions?.permissions?.some((item) => uniQuePermissions?.includes(item));
    }
  }
  return hasMenuAccess;
};

// FOR SIDE NAV MENUS BASED ON USER PERMISSIONS
export const MENU_LIST = (userPermissions) => {
  const menusData = process.env.LEFT_MENU_PERMISSIONS;
  const permissions = (menusData && menusData.length && JSON.parse(menusData)) || [];
  const menuPermissions = (menuName) => {
    return find(permissions, { menu: menuName });
  };
  const menuData = [
    {
      menu: {
        id: "member",
        name: "MEMBERS",
        route: "/clubs-members",
        hasPermission: getPermissionFlag(userPermissions, menuPermissions("Members")),
        menu_icon: payPerEventIcon
      },
      submenu: [
        {
          name: "SEARCH_MEMBERS",
          route: "/search-member",
          hasPermission: getPermissionFlag(userPermissions, menuPermissions("Search Members"))
        },
        {
          name: "REGISTER_MEMBER",
          route: "/register-member",
          hasPermission: getPermissionFlag(userPermissions, menuPermissions("Register Member"))
        }
      ]
    }
  ];
  return menuData;
};
