import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";
import Menu from "./routes/Menu";
import AppTopbar from "./components/app/AppTopbar";
import { ToastContainer } from "react-toastify";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import "primeflex/primeflex.css";
import "./components/app/App.scss";
import { routers } from "./routes/Routers";
import { NotFound } from "./pages/NotFound";
import "./components/app/AppDemo.scss";

const App = () => {
  const location = useLocation();
  let pathname = location.pathname;
  const title = routers.find((item) => item.path === pathname)?.label;

  const menuMode = "slim";
  const sidebarStatic = true;
  const isAuthenticated = localStorage.getItem("token");
  const [resetActiveIndex, setResetActiveIndex] = useState(null);
  const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);

  let topbarUserMenuClick;

  useEffect(() => {
    if (staticMenuMobileActive) {
      blockBodyScroll();
    } else {
      unblockBodyScroll();
    }
  }, [staticMenuMobileActive]);

  useEffect(() => {
    setResetActiveIndex(true);
    setMenuActive(false);
  }, [menuMode]);

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setResetActiveIndex(true);
      hideOverlayMenu();
    }
    if (!event.item.items && (isSlim() || isHorizontal())) {
      setMenuActive(false);
    }
  };

  const blockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.add("blocked-scroll");
    } else {
      document.body.className += " blocked-scroll";
    }
  };

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove("blocked-scroll");
    } else {
      document.body.className = document.body.className.replace(
        new RegExp("(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)", "gi"),
        " "
      );
    }
  };

  const onMenuButtonClick = (event) => {
    setTopbarUserMenuActive(false);

    if (isMobile()) {
      setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
      if (staticMenuMobileActive) {
        blockBodyScroll();
      } else {
        unblockBodyScroll();
      }
    }
    event.preventDefault();
  };

  const isMobile = () => {
    return window.innerWidth <= 991;
  };

  const isHorizontal = () => {
    return menuMode === "horizontal";
  };

  const isSlim = () => {
    return menuMode === "slim";
  };

  const hideOverlayMenu = () => {
    setStaticMenuMobileActive(false);
    unblockBodyScroll();
  };

  const onTopbarUserMenuClick = () => {
    setTopbarUserMenuActive((prevState) => !prevState);
    topbarUserMenuClick = true;
  };

  const onDocumentClick = () => {
    if (!topbarUserMenuClick && topbarUserMenuActive) {
      setTopbarUserMenuActive(false);
      topbarUserMenuClick = false;
    }

    if (isSlim() || isHorizontal()) {
      setResetActiveIndex(true);
      setMenuActive(false);
    }

    if (staticMenuMobileActive) {
      hideOverlayMenu();
    }

    unblockBodyScroll();

    topbarUserMenuClick = false;
  };

  const onSidebarMouseOver = () => {
    setSidebarActive(!isMobile());
  };

  const onSidebarMouseLeave = () => {
    setSidebarActive(false);
  };

  const onRootMenuItemClick = () => {
    setMenuActive((prevMenuActive) => !prevMenuActive);
  };

  const layoutClassName = classNames(
    "layout-wrapper",
    "layout-sidebar",
    "layout-static",
    {
      "layout-mobile-active": staticMenuMobileActive,
    },
    "layout-menu-light layout-topbar-light"
  );

  return (
    <div className={layoutClassName} onClick={onDocumentClick}>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      {isAuthenticated && (
        <AppTopbar
          topbarUserMenuActive={topbarUserMenuActive}
          onTopbarUserMenuClick={onTopbarUserMenuClick}
          menu={Menu()}
          menuActive={menuActive}
          onRootMenuItemClick={onRootMenuItemClick}
          mobileMenuActive={staticMenuMobileActive}
          onMenuItemClick={onMenuItemClick}
          menuMode={menuMode}
          sidebarStatic={sidebarStatic}
          sidebarActive={sidebarActive}
          onSidebarMouseOver={onSidebarMouseOver}
          onSidebarMouseLeave={onSidebarMouseLeave}
          onMenuButtonClick={onMenuButtonClick}
          resetActiveIndex={resetActiveIndex}
        />
      )}

      <div className="layout-main">
        <div className="layout-content">
          <h1>{title}</h1>
          {routers.map((router, index) => {
            if (router.exact) {
              return <Route key={`router${index}`} path={router.path} exact component={router.component} />;
            }
            return <Route key={`router${index}`} path={router.path} component={router.component ? router.component : NotFound} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
