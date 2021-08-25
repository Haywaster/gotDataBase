import React, {useState, useEffect} from 'react';
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

function ItemDetails({itemId, getData, children}) {
    const[item, updateItemn] = useState(null)
    const [loading, onItemLoadedn] = useState(true)
    const [error, onErrorn] = useState(false)

    useEffect(() => {
        updateItem()
    }, [itemId]) 

    function updateItem() {
        if (!itemId) {
            return;
        }
        onItemLoadedn(true)
        getData(itemId)
            .then((itemId) => {
                updateItemn(itemId)})
            .then(() => onItemLoadedn(false))
            .catch(() => onErrorn(true))
    }

    if (!item && error) {
        return <ErrorMessage/>
    } else if (!item) {
        return <span className="select-error">Please select item in the list</span>
    }

    const {name} = item

    if (loading) {
        return (
            <div className="char-details rounded">
                <Spinner/>
            </div>
        )
    }

    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </div>
    );
}

export default ItemDetails