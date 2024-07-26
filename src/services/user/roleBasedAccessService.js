import { store } from '../../redux/store'; // Adjust the import path as needed

const roles = {
  public: 0,
  user: 1,
  host: 2,
  director: 3,
  admin: 4,
  root: 5,
};

const roleBasedAccessService = {
  isLoggedIn() {
    const { user } = store.getState();
    return Boolean(user && user.refreshToken);
  },

  hasRequiredRole(requiredRole) {
    const { user } = store.getState();
    const userRole = user && user.role ? user.role : "public";
    const userRoleLevel = roles[userRole] ?? roles.public;
    const requiredRoleLevel = roles[requiredRole] ?? roles.public;

    return userRoleLevel >= requiredRoleLevel;
  },
};

export default roleBasedAccessService;
