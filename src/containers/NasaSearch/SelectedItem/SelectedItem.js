import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";

import Button from '../../../components/UI/Button/Button';

class SelectedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            filteredAssets: []
        }
    }

    componentDidMount() {
        const searchValue = this.props.itemId; 

        axios.get(`https://images-api.nasa.gov/asset/${searchValue}`)
            .then( res => {
                const items = res.data.collection.items;
                const updatedItems = items.map(item => {
                    return {
                        ...item.href[0]
                    }
                });
                console.log(updatedItems);
                this.setState({ assets: updatedItems, filteredAssets: updatedItems });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleBackClick = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <Button btnType="Danger" clicked={this.handleBackClick}>Back</Button>
                <p>Hi</p>

            </div>
        );
    }
}

export default withRouter(SelectedItem);