import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";

import './SelectedItem.css';
import Button from '../../../components/UI/Button/Button';
import TheSelectedItem from '../../../components/TheSelectedItem/TheSelectedItem';

class SelectedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            filteredAssets: [],
            video: true,
        }
    }

    componentDidMount() {
        const searchValue = this.props.itemId; 

        axios.get(`https://images-api.nasa.gov/asset/${searchValue}`)
            .then( res => {
                const items = res.data.collection.items;
                const updatedItems = items.map(item => {
                    return {
                        ...item
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
        let items = <p className="no--item"> Your Item Was Not Found, Please Press Back and Try again!</p>
        if (this.state.filteredAssets.length < 1 ) {
        } else {
            items = this.state.filteredAssets.map(item => {
                return  (
                    <TheSelectedItem
                    key={item.href}
                    title={item.href}
                    // title={item.title}
                    // media_type={item.media_type}
                    // description={item.description}
                    // center={item.center}
                    // clicked={() => this.itemSelectedHandler(item.nasa_id)}
                    />
                );
            });
        }

        return (
            <div className="nasa__box">
                <Button btnType="Danger" clicked={this.handleBackClick}>Back</Button>
                <h2>Your Selection <i className="far fa-images space--inbetween"></i><i className="fas fa-video"></i></h2>
                <div className="items">
                    {items}
                </div>
                <br />
            </div>
        );
    }
}

export default withRouter(SelectedItem);