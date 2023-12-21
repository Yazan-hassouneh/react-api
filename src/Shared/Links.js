import React from 'react'
import { Link } from 'react-router-dom'

function Links({title, path, Style = "text-dark"}) {
    return (
        <Link to={path} className={`d-block px-2 text-decoration-none ${Style}`}>{title}</Link>
    )
}

export default Links