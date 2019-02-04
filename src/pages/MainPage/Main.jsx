import React, { Component } from 'react';
import {MovieComponent} from "./MovieComponent";
import {RestService} from "../Service/RestService";

export class Main extends Component {


    constructor(props) {
        super(props);

        this.state={
            data : []
        };
        this.service = new RestService();

        this.getMovieList = this.getMovieList.bind(this);
    }

    componentDidMount() {
        this.getMovieList();
    }

    render() {

        var res = this.state.data;
        var ret = [];
        for(let r in res){
            ret.push(
                <div>
                    <MovieComponent data = {res[r]}/>
                </div>)
        }
        return (
         <div>
             {ret}
         </div>
        )
    };

    getMovieList(){
        this.service.getMovieList().then((response) => {
            this.setState({data: response.data});
            this.forceUpdate();
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        });
    }
}
