import React from 'react'
import './Option.css';



function option({ uniqueCategory,handleSelectChange,selectcategory}) {
  return (
    <nav>
      <ul className="menu" >
        {uniqueCategory.map((category) => (
          <li key={category} style={{ backgroundColor: selectcategory == category ? '#c26a19' : '#000' }} >
            <a href={`#${category}`} className="navbar-item" value={selectcategory} onClick={() => handleSelectChange(category)}>
              {category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default option;



