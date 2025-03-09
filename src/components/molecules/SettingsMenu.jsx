import React, { useEffect } from 'react';

import PropTypes from 'prop-types';


const SettingsMenu = ({ children }) => {
       return (
              <div className="flex flex-col items-start gap-2">
                     {children}
              </div>
       );
};


SettingsMenu.Item = function SettingsMenuItem({ selected, icon, label, onClick }) {
       return (
              <div
                     className={`flex w-full p-2 rounded cursor-pointer ${selected ? 'bg-gray-200' : 'hover:bg-blue-100'}`}
                     onClick={onClick}
              >
                     {icon && <i data-feather={icon} className="mr-2" />}
                     <span>{label}</span>
              </div>
       );
};

SettingsMenu.Item.propTypes = {
       selected: PropTypes.bool,
       icon: PropTypes.string,
       label: PropTypes.string.isRequired,
       onClick: PropTypes.func,
};
export default SettingsMenu;