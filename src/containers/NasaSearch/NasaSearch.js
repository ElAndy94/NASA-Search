import React, { Component } from 'react';
import axios from 'axios';

import './NasaSearch.css';
import Aux from '../../hoc/Aux';
import Input from '../../components/UI/Input/Input';
import Item from '../../components/Item/Item';
import { updateObject, checkValidity } from '../../shared/utility';

class NasaSearch extends Component {
    state = {
        items: [],
        filteredItems: [],
        NasaForm: {
            nasaSearch: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Example: Moon'
              },
              value: '',
              validation: {
                required: true,
                minLength: 3,
                maxLength: 25
              },
              valid: true
            },
        },
        formIsValid: false
    }

    componentDidMount () {
        axios.get('https://images-api.nasa.gov/search?q=Moon')
            .then( res => {
                const items = res.data.collection.items.slice(0, 40);
                // const items = res.data.collection.items;
                const updatedItems = items.map(item => {
                    return {
                        ...item.data[0]
                    }
                });
                const mediaType = 'image';
                const furtherFilteredItems = updatedItems.filter(item => item.media_type === `${mediaType}`);
                
                this.setState({ items: updatedItems, filteredItems: furtherFilteredItems });
            })
            .catch(err => {
                console.log(err);
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(inputIdentifier);
        const updatedFormElement = updateObject(this.state.NasaForm[inputIdentifier], {
            value: event.target.value,
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
    
        const theEvent = event.target.value;

        this.checkEvent(theEvent, inputIdentifier);

        this.setState({NasaForm: updatedNasaForm, formIsValid: formIsValid});
    }

    checkEvent(theEvent, inputIdentifier) {
        if (inputIdentifier === 'video') {
          this.filterItems(theEvent, 'video');
    
        } else if (inputIdentifier === 'image') {
          this.filterItems(theEvent, 'image');
        } 
    }

    itemSelectedHandler = (id) => {
        this.setState({selectedItemId: id});
    }

    filterClasses(selectedValue, type) {
        // Filter through the items and only have ones that apply the search term
        const newFilteredItems = this.state.filteredItems.filter( (value) => {
          return value[type] === selectedValue;
        });
    
        this.setState({filteredItems: newFilteredItems});
    }

    render() {
        const items = this.state.filteredItems.map(item => {
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
                    <h1>NASA Search</h1>
                        {form}
                        <button><i className="fas fa-search"></i></button> 
                    <div className="Items"> 
                        {items}
                    </div>
                </div>
            </Aux>
        );
    };

}

export default NasaSearch;