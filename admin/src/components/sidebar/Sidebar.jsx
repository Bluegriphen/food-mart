// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import LayoutMenuData from "./LayoutMenuData";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const [openMenu, setOpenMenu] = useState(null);

//   const toggleMenu = (label) => {
//     setOpenMenu(openMenu === label ? null : label);
//   };

//   return (
//     <div className="sidebar">
//       {LayoutMenuData.map((item, index) => (
//         <div key={index}>
//           {item.subItems ? (
//             <>
//               <div
//                 className="sidebar-option"
//                 onClick={() => toggleMenu(item.label)}
//               >
//                 <i className={item.icon}></i>
//                 <p>{item.label}</p>
//               </div>

//               {openMenu === item.label && (
//                 <div className="submenu">
//                   {item.subItems.map((sub, i) => (
//                     <NavLink key={i} to={sub.link} className="submenu-item">
//                       {sub.label}
//                     </NavLink>
//                   ))}
//                 </div>
//               )}
//             </>
//           ) : (
//             <NavLink to={item.link} className="sidebar-option">
//               <i className={item.icon}></i>
//               <p>{item.label}</p>
//             </NavLink>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;


import { useState } from "react";
import { NavLink } from "react-router-dom";
import LayoutMenuData from "./LayoutMenuData";
import "./Sidebar.css";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <div className="sidebar">
      {/* Optional Header */}
      <div className="sidebar-header">
        <h2>Food<span>Mart</span></h2>
      </div>

      {LayoutMenuData.map((item, index) => (
        <div key={index}>
          {item.subItems ? (
            <>
              <div
                className="sidebar-option"
                onClick={() => toggleMenu(item.label)}
                data-open={openMenu === item.label}
              >
                <i className={item.icon}></i>
                <p>{item.label}</p>
              </div>

              {openMenu === item.label && (
                <div className="submenu">
                  {item.subItems.map((sub, i) => (
                    <NavLink 
                      key={i} 
                      to={sub.link} 
                      className={({ isActive }) => 
                        isActive ? "submenu-item active" : "submenu-item"
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          ) : (
            <NavLink 
              to={item.link} 
              className={({ isActive }) => 
                isActive ? "sidebar-option active" : "sidebar-option"
              }
            >
              <i className={item.icon}></i>
              <p>{item.label}</p>
            </NavLink>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;