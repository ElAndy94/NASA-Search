import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";

import './NasaSearch.css';
import Aux from '../../hoc/Aux';
import Item from '../../components/Item/Item';
import Button from '../../components/UI/Button/Button';

class NasaSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            image: true,
            video: false,
            items: [],
            filteredItems: [],
            // NasaForm: {
            //     nasaSearch: {
            //         elementType: 'input',
            //         elementConfig: {
            //             className: 'Input_Box',
            //             type: 'text',
            //             placeholder: 'Moon'
            //         },
            //         value: '',
            //         validation: {
            //         required: true,
            //         minLength: 3,
            //         maxLength: 25
            //         },
            //         valid: true
            //     },
            //     nasaCheckImage: {
            //         elementType: 'input',
            //         elementConfig: {
            //             className: 'CheckBox',
            //             type: 'checkbox',
            //         },
            //         defaultvalue: 'Image',
            //         validation: {
            //         required: true,
            //         },
            //         valid: true,
            //         checked: true,
            //     },
            //     nasaCheckVideo: {
            //         elementType: 'input',
            //         elementConfig: {
            //             className: 'CheckBox',
            //             type: 'checkbox',
            //         },
            //         defaultvalue: 'Video',
            //         validation: {
            //             required: true,
            //         },
            //         valid: true,
            //         checked: false,
            //     }
            // },
            errorInput: '',
            errorCheckBox: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });

        if (this.state.searchValue !== '') {
            this.setState({ errorInput: '' });
        }

        if (this.state.image !== this.state.video) {
            this.setState({ errorCheckBox: '' });
        }
    }

    handleSubmit = () => {
        const searchValue = this.state.searchValue;
        const checkForImages = this.state.image;
        const checkForVideos = this.state.video;

        if (searchValue === '') {
            this.setState({ errorInput: 'Please Do Not Leave Empty' });
            return;
        }

        axios.get(`https://images-api.nasa.gov/search?q=${searchValue}`)
            .then( res => {
                const items = res.data.collection.items;
                const updatedItems = items.map(item => {
                    return {
                        ...item.data[0]
                    }
                });
                if (checkForImages === true && checkForVideos === true) {
                    this.setState({ errorCheckBox: 'Please Select Only 1 Checkbox' });
                    return;
                } else if (checkForImages === true && checkForVideos === false) {
                    this.furtherFilteredItems = updatedItems.filter(item => item.media_type === 'image');
                } else if (checkForImages === false && checkForVideos === true) {
                    this.furtherFilteredItems = updatedItems.filter(item => item.media_type === 'video');
                }
                console.log(this.furtherFilteredItems);
                this.setState({ items: updatedItems, filteredItems: this.furtherFilteredItems });
            })
            .catch(err => {
                console.log(err);
            });
    }

    itemSelectedHandler = (id, title, center, desc) => {
        this.props.onItemInfo(id, this.state.image, this.state.video, title, center, desc);
        this.props.history.push("/selectedItem");
    }

    render() {
        let items = <p className="no--item"> No Items, Please Search </p>
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
                    clicked={() => this.itemSelectedHandler(item.nasa_id, item.title, item.center, item.description,)}
                    />
                );
            });
        }

        return (
            <Aux>
                <div className="nasa--box">
                    <h1>NASA Search <i className="fas fa-search"></i></h1>
                    <form>
                        {this.state.errorInput}
                        <br />
                        <input type="text" name="searchValue" placeholder="Search items..." className="input--mod" required={true} onChange={this.handleInputChange} />
                        <br />
                        <br />
                        <label> Image: &nbsp;
                        <input name="image" type="checkbox" className="space--right" checked={this.state.image} onChange={this.handleInputChange} />
                        </label>
                        <label> Video: &nbsp;
                        <input name="video" type="checkbox" checked={this.state.video} onChange={this.handleInputChange} />
                        </label>
                        <br />
                        <br />
                        {this.state.errorCheckBox}
                    </form>
                        <br />
                        <Button btnType="Success" clicked={this.handleSubmit}> Search </Button>
                    <div className="items">  
                        {items}
                    </div>
                    <br />
                </div>
            </Aux>
        );
    };

}

export default withRouter(NasaSearch);