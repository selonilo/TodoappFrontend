import React from "react";
import classNames from "classnames";
import AppMenu from "./AppMenu";
import { api } from "../../services/api";
import { useHistory, Redirect } from "react-router-dom";
import {login} from "../../pages/Auth/Login";



const AppTopbar = (props) => {
  const deneme = localStorage.getItem("loginName");

  const history = useHistory();

  const logout = async () => {
    const { data = {}, error } = await api.auth.logout();
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="layout-topbar">
      <div className="layout-topbar-wrapper">
        <div className="layout-topbar-left">
          <button tabIndex="0" className="menu-button p-link" onClick={props.onMenuButtonClick}>
            <i className="pi pi-bars"></i>
          </button>
        </div>

        <AppMenu
          menuMode={props.menuMode}
          sidebarActive={props.sidebarActive}
          sidebarStatic={props.sidebarStatic}
          model={props.menu}
          menuActive={props.menuActive}
          onRootMenuItemClick={props.onRootMenuItemClick}
          onMobileMenuActive={props.onMobileMenuActive}
          onMenuItemClick={props.onMenuItemClick}
          onSidebarMouseOver={props.onSidebarMouseOver}
          onSidebarMouseLeave={props.onSidebarMouseLeave}
          resetActiveIndex={props.resetActiveIndex}
          onMenuClick={props.onMenuClick}
        />

        <div className="layout-topbar-right">
          <ul className="layout-topbar-actions">
            <li
              className={classNames("topbar-item user-profile", {
                "active-topmenuitem fadeInDown": props.topbarUserMenuActive,
              })}>

              <span>{deneme}</span>
            
            </li>
            <li
              className={classNames("topbar-item user-profile", {
                "active-topmenuitem fadeInDown": props.topbarUserMenuActive,
              })}>
              <button className="p-link" style={{ cursor: "pointer" }} onClick={props.onTopbarUserMenuClick}>
                <img src="http://i.stack.imgur.com/l60Hf.png" alt="pp" />
              </button>
              <ul className="fadeInDown">
                <li onClick={logout}>
                  <button className="p-link">
                    <span>Çıkış</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppTopbar;
