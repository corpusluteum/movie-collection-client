import React from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {RestService} from "../Service/RestService";

var AddPlayer = React.createClass({

    getInitialState: function() {
        this.service = new RestService();
        return {
            addObject: {
                id: '',
                name: '',
                surname : '',
                description: ''
            },
            updateObject: {
                id: '',
                name: '',
                surname : '',
                description: ''
            }
        }
    },

    render: function() {

        return (
            <div>
                <Modal show={this.props.parent ? this.props.parent.state ? this.props.parent.state.showAddModal : false : false}>
                    <Modal.Header>
                        <Modal.Title>Yeni Oyuncu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Adı</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Oyuncu adını giriniz"
                                    value={this.state.addObject.name}
                                    onChange={this.onAddPlayerNameChange} />
                                <br/>

                                <ControlLabel>Soyadı</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Oyuncu soyadını giriniz"
                                    value={this.state.addObject.surname}
                                    onChange={this.onAddPlayerSurnameChange} />
                                <br/>

                                <ControlLabel>Açıklama</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="açıklama"
                                    value={this.state.addObject.description}
                                    onChange={this.onAddPlayerDescriptionChange} />
                                <br/>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.parent.closeAddModal}>Vazgeç</Button>
                        <Button bsStyle="primary" onClick={this.onAddBtnClicked}>Ekle</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.parent.state.showUpdateModal}>
                    <Modal.Header>
                        <Modal.Title>Oyuncu Güncelle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Oyuncu Adı</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Oyuncu Adı"
                                    value={this.state.updateObject.name}
                                    onChange={this.onUpdatePlayerNameChange} />
                                <br />
                                <ControlLabel>Soyadı</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Oyuncu soyadını giriniz"
                                    value={this.state.updateObject.surname}
                                    onChange={this.onUpdatePlayerSurnameChange} />
                                <br/>
                                <ControlLabel>Oyuncu Açıklaması</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Açıklama"
                                    value={this.state.updateObject.description}
                                    onChange={this.onUpdatePlayerDescriptionChange} />
                                <br />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.parent.closeUpdateModal}>Vazgeç</Button>
                        <Button bsStyle="primary" onClick={this.onUpdateBtnClicked}>Güncelle</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    },

    fillUpdateObject: function() {
        var selectedPlayer = this.props.parent.getPlayerById(this.props.parent.state.selectedPlayerId);

        this.state.updateObject = {
            id: selectedPlayer.id,
            name: selectedPlayer.name,
            surname: selectedPlayer.surname,
            description: selectedPlayer.description
        }
    },
    clearUpdateObject: function() {
        this.state.updateObject.id = '';
        this.state.updateObject.name = '';
        this.state.updateObject.surname = '';
        this.state.updateObject.description = '';

    },

    clearAddObject: function() {
        this.state.addObject.id = '';
        this.state.addObject.name = '';
        this.state.addObject.surname = '';
        this.state.addObject.description = '';
    },

    onAddPlayerNameChange: function(event) {
        this.state.addObject.name = event.target.value;
        this.forceUpdate();
    },
    onAddPlayerSurnameChange: function(event) {
        this.state.addObject.surname = event.target.value;
        this.forceUpdate();
    },

    onAddPlayerDescriptionChange: function(event) {
        this.state.addObject.description = event.target.value;
        this.forceUpdate();
    },

    onAddBtnClicked: function() {
        this.service.addPlayer(this.state.addObject).then((response) => {
            this.props.parent.closeAddModal();
            this.props.parent.refreshTable();
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        });
    },
    onUpdatePlayerNameChange: function(event) {
        this.state.updateObject.name = event.target.value;
        this.forceUpdate();
    },

    onUpdatePlayerSurnameChange: function(event) {
        this.state.updateObject.surname = event.target.value;
        this.forceUpdate();
    },
    onUpdatePlayerDescriptionChange: function(event) {
        this.state.updateObject.description = event.target.value;
        this.forceUpdate();
    },
    onUpdateBtnClicked: function() {

        this.service.updatePlayer(this.state.updateObject.id, this.state.updateObject).then((response) => {
            this.props.parent.closeUpdateModal();
            this.props.parent.refreshTable();
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        });
    }
});

export default AddPlayer;