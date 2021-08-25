import React, {useState, useEffect} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService'
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage'

function RandomChar() {
    const [char, updateCharn] = useState({})
    const [loading, onCharLoadedn] = useState(true)
    const [error, onErrorn] = useState(false)

    const {getCharacter} = new gotService();

    useEffect(() => {
        updateChar()
        let timerId = setInterval(updateChar, 1500)
        return () => {clearInterval(timerId)} 
    }, [])

    function updateChar() {
        const id = Math.floor(Math.random()*140 + 25);
        getCharacter(id)
          .then((data) => 
            {updateCharn(data)})
          .catch(() => {
            onErrorn(true)
          })
          .finally(() => {
            onCharLoadedn(false)
          })
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    
    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}

export default RandomChar