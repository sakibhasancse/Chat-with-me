class SessionStore {
  authUser = {}; //also handled in store
  mobileMenuOpen = false;
  isMobileMenu = false;
  tab = 0;

  setIsMobileMenu = windowWidth => {
    this.isMobileMenu = windowWidth <= 768;
    //breakpoint in antd grid
  }
  toggleMobileMenuOpen = () => {
    if (!this.mobileMenuOpen) {
      if (this.isMobileMenu) {
        this.mobileMenuOpen = true;
      }
    } else {
      this.mobileMenuOpen = false;
    }
  }
}

export default SessionStore;