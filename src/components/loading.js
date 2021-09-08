import React from 'react'
import Loader from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className="loader">
            <Loader type="Circles" color="#3498db" height={100} width={100} />
        </div>
    )
}

export default Loading
