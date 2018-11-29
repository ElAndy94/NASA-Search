import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";

import './NasaSearch.css';
import Aux from '../../hoc/Aux';
import Input from '../../components/UI/Input/Input';
import Item from '../../components/Item/Item';
import { updateObject, checkValidity } from '../../shared/utility';
import Button from '../../components/UI/Button/Button';

class NasaSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filteredItems: [],
            NasaForm: {
                nasaSearch: {
                    elementType: 'input',
                    elementConfig: {
                        className: 'Input_Box',
                        type: 'text',
                        placeholder: 'Moon'
                    },
                    value: '',
                    validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 25
                    },
                    valid: true
                },
                nasaCheckImage: {
                    elementType: 'input',
                    elementConfig: {
                        className: 'CheckBox',
                        type: 'checkbox',
                    },
                    defaultvalue: 'Image',
                    validation: {
                    required: true,
                    },
                    valid: true,
                    checked: true,
                },
                nasaCheckVideo: {
                    elementType: 'input',
                    elementConfig: {
                        className: 'CheckBox',
                        type: 'checkbox',
                    },
                    defaultvalue: 'Video',
                    validation: {
                        required: true,
                    },
                    valid: true,
                    checked: false,
                }
            },
            formIsValid: false
        }
    }

    onFormSubmit = () => {
        const searchValue = this.state.NasaForm.nasaSearch.value;
        const checkForImages = this.state.NasaForm.nasaCheckImage.checked;
        const checkForVideos = this.state.NasaForm.nasaCheckVideo.checked;

        axios.get(`https://images-api.nasa.gov/search?q=${searchValue}`)
            .then( res => {
                const items = res.data.collection.items.slice(0, 40);
                const updatedItems = items.map(item => {
                    return {
                        ...item.data[0]
                    }
                });
                if (checkForImages === true && checkForVideos === true) {
                    this.furtherFilteredItems = updatedItems.filter(item => item.media_type === 'image' || item.media_type === 'video');
                } else if (checkForImages === true && checkForVideos === false) {
                    this.furtherFilteredItems = updatedItems.filter(item => item.media_type === 'image');
                } else if (checkForImages === false && checkForVideos === true) {
                    this.furtherFilteredItems = updatedItems.filter(item => item.media_type === 'video');
                }
                
                this.setState({ items: updatedItems, filteredItems: this.furtherFilteredItems });
            })
            .catch(err => {
                console.log(err);
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.NasaForm[inputIdentifier], {
            value: event.target.value,
            checked: event.target.checked,
            valid: checkValidity(event.target.value, this.state.NasaForm[inputIdentifier].validation),
            touched: true
        });
        const updatedNasaForm = updateObject(this.state.NasaForm, {
          [inputIdentifier]: updatedFormElement
        });
    
        let formIsValid = true;
        for (let inputIdentifier in updatedNasaForm) {
          formIsValid = updatedNasaForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({NasaForm: updatedNasaForm, formIsValid: formIsValid});
    }

    itemSelectedHandler = (id) => {
        this.props.onItemId(id);
        this.props.history.push("/selectedItem");
    }

    render() {
        let items = <p className="No-Item"> No Items, Please Search </p>
        if (this.state.filteredItems.length < 1 ) {
        } else {
            items = this.state.filteredItems.map(item => {
                return  (
                    <Item
                    key={item.nasa_id}
                    title={item.title}
                    media_type={item.media_type}
                    description={item.description}
                    center={item.center}
                    clicked={() => this.itemSelectedHandler(item.nasa_id)}
                    />
                );
            });
        }

        const formElementsArray = [];
        for (let key in this.state.NasaForm) {
        formElementsArray.push({
            id: key,
            config: this.state.NasaForm[key]
        });
        }
        let form = (
        <form onSubmit={this.classBookHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    invalid={!formElement.config.valid}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))}
        </form>
        );

        return (
            <Aux>
                <div className="NasaBox">
                    <h1>NASA Search <i className="fas fa-search"></i></h1>
                        {form}
                        <br />
                        <Button btnType="Success" clicked={this.onFormSubmit}> Search </Button>
                    <div className="Items"> 
                        {items}
                    </div>
                        <br />
                </div>
            </Aux>
        );
    };

}

export default withRouter(NasaSearch);