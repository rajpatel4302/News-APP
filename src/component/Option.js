import React from 'react'
import './Option.css';


function option({ uniqueCategory,handleSelectChange,selectcategory }) {
  return (
    <nav>
      <ul className="menu" >
        {uniqueCategory.map((category) => (
          <li key={category}>
            <a href={`#${category}`} className="navbar-item" value={selectcategory} onChange={handleSelectChange}>
              {category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default option;



