import React, { useState } from 'react';
import "./dropdown.css"
const Dropdown = ({ handleSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [activeDropdown2, setActiveDropdown2] = useState(false);
  const [activeDropdown3, setActiveDropdown3] = useState(false);
  const [activeDropdown4, setActiveDropdown4] = useState(false);
  const options = [
    { value: 'Brot', label: 'Brot' },
    { value: 'ketchup', label: 'ketchup' },
    { value: 'pommes', label: 'pommes' },
    { value: 'Cola', label: 'Cola' },
    { value: 'Milch', label: 'Milch' },
  ];
  const options2 = [
    { value: 'Zwieble', label: 'Zwieble' },
    { value: 'Eisberg', label: 'Eisberg' },
    { value: 'Gurke', label: 'Gurke' },
  ];

  const options3 = [
    { value: 'Pecher', label: 'Pecher' },
    { value: 'Pommesverpakung', label: 'Verpakung' },
    { value: 'Tüten', label: 'Tüten' },
  ];
  const options4 = [
    { value: 'Pecher', label: 'Pecher' },
    { value: 'Pommesverpakung', label: 'Verpakung' },
    { value: 'Tüten', label: 'Tüten' },
  ];

  const handleToggle = () => {
    setActiveDropdown(!activeDropdown);
    setIsOpen(!isOpen);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
    setActiveDropdown2(false);
    setActiveDropdown3(false);
    setActiveDropdown4(false);
  };
  const handleToggle2 = () => {
    setActiveDropdown2(!activeDropdown2);
    setIsOpen2(!isOpen2);
    setIsOpen(false);
    setIsOpen3(false);
    setIsOpen4(false);
    setActiveDropdown(false);
    setActiveDropdown3(false);
    setActiveDropdown4(false);
  };
  const handleToggle3 = () => {
    setActiveDropdown3(!activeDropdown3);
    setIsOpen3(!isOpen3);
    setIsOpen(false);
    setIsOpen2(false);
    setIsOpen4(false);
    setActiveDropdown2(false);
    setActiveDropdown(false);
    setActiveDropdown4(false);
  };
  const handleToggle4 = () => {
    setActiveDropdown4(!activeDropdown4);
    setIsOpen4(!isOpen4);
    setIsOpen(false);
    setIsOpen2(false);
    setIsOpen3(false);
    setActiveDropdown2(false);
    setActiveDropdown3(false);
    setActiveDropdown(false);

  }
  const handleSelectOption = async (option) => {

    handleSelect(option);
    setIsOpen(false);
    setActiveDropdown(false);
  };
  const handleSelectOption2 = async (option) => {

    handleSelect(option);
    setIsOpen2(false);
    setActiveDropdown2(false);
  };
  const handleSelectOption3 = async (option) => {

    handleSelect(option);
    setIsOpen3(false);
    setActiveDropdown3(false);
  };
  const handleSelectOption4 = async (option) => {

    handleSelect(option);
    setIsOpen4(false);
    setActiveDropdown4(false);
  };

  return (
    <div className="dropdown-container">
      {!activeDropdown2 && !activeDropdown3 && !activeDropdown4 && (<div className="dropdown">
        <button className="dropdown-toggle" onClick={handleToggle}>
          Cola Products
        </button>
        {isOpen && (
          <ul className={`dropdown-options ${isOpen ? 'show' : ''}`}>
            {options.map((option) => (
              <li key={option.value} onClick={() => handleSelectOption(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>)}
      {!activeDropdown && !activeDropdown3 && !activeDropdown4 && (<div className="dropdown">
        <button className="dropdown-toggle" onClick={handleToggle2}>
          Food Product
        </button>
        {isOpen2 && (
          <ul className={`dropdown-options ${isOpen2 ? 'show' : ''}`}>
            {options2.map((option) => (
              <li key={option.value} onClick={() => handleSelectOption2(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>)}
      {!activeDropdown2 && !activeDropdown && !activeDropdown4 && (<div className="dropdown">
        <button className="dropdown-toggle" onClick={handleToggle3}>
          Carton Products
        </button>
        {isOpen3 && (
          <ul className={`dropdown-options ${isOpen3 ? 'show' : ''}`}>
            {options3.map((option) => (
              <li key={option.value} onClick={() => handleSelectOption3(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>)}
      {!activeDropdown2 && !activeDropdown3 && !activeDropdown && (<div className="dropdown">
        <button className="dropdown-toggle" onClick={handleToggle4}>
          daily Products
        </button>
        {isOpen4 && (
          <ul className={`dropdown-options ${isOpen4 ? 'show' : ''}`}>
            {options4.map((option) => (
              <li key={option.value} onClick={() => handleSelectOption4(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>)}
    </div>
  );
};

export default Dropdown;