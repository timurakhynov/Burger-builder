import React, { useState } from "react";
import './ingredients.css';
import { useDispatch, useSelector } from "react-redux";
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal'
import { getIngredients, updateIngredient } from "../../store/ingredients.slice";


const Ingredients = () => {
    const ingredients = useSelector(state => state.ingredients.ingredients)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [currentIngredient, setCurrentIngredient] = useState({})
    const [currentKey, setCurrentKey] = useState('')
    const dispatch = useDispatch()
    const closeModal = () => {
        setShowUpdateModal(false)
        console.log(currentIngredient)
    }
    const openModal = (ing, key) => {
        setCurrentIngredient(ing)
        setCurrentKey(key)
        setShowUpdateModal(true)
    }
    const inputHandler = (e) => {
        setCurrentIngredient(prevState => {
            if (e.target.name in prevState) {
                return {...prevState, [e.target.name]: e.target.value}
            } else {
                return {...prevState, style: {...prevState.style, [e.target.name]: e.target.value}}
            }
            
        })
    }
    const createForm = (obj) => {
        let arr = []
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'object') {
                arr.push(createForm(obj[key]))
            } else {
                arr.push(<div key={key}><input name={key} value={obj[key]} onChange={inputHandler}/></div>)
            }
        })
        return arr
    }

    const submitUpdate = (e) => {
        e.preventDefault()
        dispatch(updateIngredient({id: currentKey, ingredient: currentIngredient}))
        setShowUpdateModal(false)
    }
    return (
        <div>
            <Modal
            show={showUpdateModal}
            closed={closeModal}
            >
                <form onSubmit={submitUpdate}>
                    {createForm(currentIngredient)}
                    <Button
                        btnType={'Success'}
                    >
                        Accept
                    </Button>
                </form>
            </Modal>
            {Object.keys(ingredients).map((key) => {
                return <div key={key} className='ingDiv'>
                        <p>Name: {ingredients[key].name}</p>
                        <p>Price {ingredients[key].price}</p>
                        <p>{JSON.stringify(ingredients[key].style)}</p>
                        <br/>
                        <Button
                            clicked={() => openModal(ingredients[key], key)}
                            btnType={'Success'}
                        >
                            Update
                        </Button>
                    </div>
            })}
        </div>
    )
}

export default Ingredients