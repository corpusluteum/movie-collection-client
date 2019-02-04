import React, { Component } from 'react';
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import {Button, Modal} from "react-bootstrap";
import {PlayMovie} from "./PlayMovie";

export class MovieComponent extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showModalMovie : false
        };
        this.openMovie = this.openMovie.bind(this);
        this.closeMovieModal = this.closeMovieModal.bind(this);
    }

    render() {

        return (
            <div>
                    <Row>
                        <Col md = '3'>
                            <img src='https://bloximages.chicago2.vip.townnews.com/tribdem.com/content/tncms/assets/v3/editorial/3/83/38384be2-3ba5-11e8-adec-bf48bc62810f/5acadc92f3c7d.image.jpg?resize=750%2C669' alt={this.props.data ? this.props.data.name ? this.props.data.name : "" : "" } className="img-responsive"/>
                            <Button onClick={this.openMovie}>İzle</Button>
                        </Col>
                        <Col>
                            <table>
                                <tr>
                                    <th> </th>
                                    <th><h1>{this.props.data ? this.props.data.name ? this.props.data.name : "" : "" }</h1></th>
                                </tr>
                                <tr>
                                    <th>Oyuncular :</th>
                                    <th> {this.props.data ? this.props.data.name ? this.props.data.name : "" : "" }</th>
                                </tr>
                                <tr>
                                    <th>Açıklama :</th>
                                    <th> {this.props.data ? this.props.data.description ? this.props.data.description : "" : "" }</th>
                                </tr>
                            </table>
                        </Col>
                    </Row>


                <Modal show={this.state.showModalMovie}>
                    <Modal.Header>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <PlayMovie/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeMovieModal}>Kapat</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    };

    closeMovieModal(){
        this.setState({showModalMovie : false})
    }

    openMovie(){
        this.state.showModalMovie = true;
        this.forceUpdate();
    }
}
