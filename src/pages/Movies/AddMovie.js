import React from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {FileUploader} from "../uploader/FileUploader";
import {RestService} from "../Service/RestService";
import Select from 'react-select';

var AddMovie = React.createClass({

    getInitialState: function() {
        this.service = new RestService();
        return {
            addObject: {
                id: '',
                name: '',
                description: '',
                playerList : '',
                languages : '',
                typeList : ''
            },
            updateObject: {
                id: '',
                name: '',
                description: '',
                playerList : [],
                typeList : [],
                languages : []
            }
        }
    },

    render: function() {

        return (
            <div>
                <Modal show={this.props.parent ? this.props.parent.state ? this.props.parent.state.showAddModal : false : false}>
                    <Modal.Header>
                        <Modal.Title>Yeni Film</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Film Adı</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Film adını giriniz"
                                    value={this.state.addObject.name}
                                    onChange={this.onAddMovieNameChange} />
                                <br/>

                                <ControlLabel>Film Açıklaması</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Konusu"
                                    value={this.state.addObject.description}
                                    onChange={this.onAddMovieDescriptionChange} />
                                <br/>
                                <ControlLabel>Oyuncular</ControlLabel>
                                <Select
                                    name="playerFields"
                                    multi={true}
                                    labelKey={"name"}
                                    valueKey={"id"}
                                    value={this.state.addObject.playerList}
                                    options={this.props.parent.getPlayerOptions()}
                                    onChange={this.onAddMoviePlayerChange} />
                                <br/>
                                <ControlLabel>Film Türü</ControlLabel>
                                <Select
                                    name="typeFields"
                                    multi={true}
                                    labelKey={"value"}
                                    valueKey={"key"}
                                    value={this.state.addObject.typeList}
                                    options={this.props.parent.getTypeOptions()}
                                    onChange={this.onAddMovieTypeChange} />
                                <br/>
                                <ControlLabel>Desteklenen Diller</ControlLabel>
                                <Select
                                    name="languageFields"
                                    multi={true}
                                    labelKey={"value"}
                                    valueKey={"key"}
                                    value={this.state.addObject.languages}
                                    options={this.props.parent.getLanguageOptions()}
                                    onChange={this.onAddMovieLanguageChange} />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <FileUploader />
                        <Button onClick={this.props.parent.closeAddModal}>Vazgeç</Button>
                        <Button bsStyle="primary" onClick={this.onAddBtnClicked}>Ekle</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.parent.state.showUpdateModal}>
                    <Modal.Header>
                        <Modal.Title>Film Güncelle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Film Adı</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Film Adı"
                                    value={this.state.updateObject.name}
                                    onChange={this.onUpdateMovieNameChange} />
                                <br />

                                <ControlLabel>Film Açıklaması</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Açıklama"
                                    value={this.state.updateObject.description}
                                    onChange={this.onUpdateMovieDescriptionChange} />
                                <br />
                                <br/>
                                <ControlLabel>Oyuncular</ControlLabel>
                                <Select
                                    name="updatePlayerFields"
                                    multi={true}
                                    labelKey={"name"}
                                    valueKey={"id"}
                                    value={this.state.updateObject.playerList}
                                    options={this.props.parent.getPlayerOptions()}
                                    onChange={this.onUpdateMoviePlayerChange} />
                                <br/>
                                <ControlLabel>Film Türü</ControlLabel>
                            <Select
                                name="typeFields"
                                multi={true}
                                labelKey={"value"}
                                valueKey={"key"}
                                value={this.state.updateObject.typeList}
                                options={this.props.parent.getTypeOptions()}
                                onChange={this.onUpdateMovieTypeChange} />
                            <br/>
                            <ControlLabel>Desteklenen Diller</ControlLabel>
                            <Select
                                name="languageFields"
                                multi={true}
                                labelKey={"value"}
                                valueKey={"key"}
                                value={this.state.updateObject.languages}
                                options={this.props.parent.getLanguageOptions()}
                                onChange={this.onUpdateMovieLanguageChange} />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.parent.closeUpdateModal}>Vaçgeç</Button>
                        <Button bsStyle="primary" onClick={this.onUpdateBtnClicked}>Güncelle</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    );
    },

    fillUpdateObject: function() {
        var selectedMovie = this.props.parent.getMovieById(this.props.parent.state.selectedMovieId);

        this.state.updateObject = {
            id: selectedMovie.id,
            name: selectedMovie.name,
            description: selectedMovie.description,
            languages : selectedMovie.languages,
            typeList : selectedMovie.typeList,
            playerList: selectedMovie.playerList
        }
    },
    clearUpdateObject: function() {
        this.state.updateObject.id = '';
        this.state.updateObject.name = '';
        this.state.updateObject.description = '';
        this.state.updateObject.languages = [];
        this.state.updateObject.typeList = [];
        this.state.updateObject.playerList = [];

    },

    clearAddObject: function() {
        this.state.addObject.id = '';
        this.state.addObject.name = '';
        this.state.addObject.description = '';
        this.state.addObject.playerList = [];
        this.state.addObject.languages = [];
        this.state.addObject.typeList = [];
    },

    onAddMovieNameChange: function(event) {
        this.state.addObject.name = event.target.value;
        this.forceUpdate();
    },

    onAddMovieDescriptionChange: function(event) {
        this.state.addObject.description = event.target.value;
        this.forceUpdate();
    },

    onAddBtnClicked: function() {
        this.service.addMovie(this.state.addObject).then((response) => {
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

    onAddMoviePlayerChange: function(selection) {

        if(selection === null) {
            this.state.addObject.playerList = [];
        }else {
            this.state.addObject.playerList = selection;
        }

        this.forceUpdate();
    },

    onAddMovieTypeChange: function(selection) {

        if(selection === null) {
            this.state.addObject.typeList = [];
        }else {
            this.state.addObject.typeList = selection;
        }

        this.forceUpdate();
    },

    onAddMovieLanguageChange: function(selection) {

        if(selection === null) {
            this.state.addObject.languages = [];
        }else {
            this.state.addObject.languages = selection;
        }

        this.forceUpdate();
    },
    onUpdateMovieNameChange: function(event) {
        this.state.updateObject.name = event.target.value;
        this.forceUpdate();
    },
    onUpdateMovieDescriptionChange: function(event) {
        this.state.updateObject.description = event.target.value;
        this.forceUpdate();
    },
    onUpdateMoviePlayerChange: function(selection) {

        if(selection === null) {
            this.state.addObject.playerList = [];
        }else {
            this.state.addObject.playerList = selection;
        }

        this.forceUpdate();
    },

    onUpdateMovieTypeChange: function(selection) {

        if(selection === null) {
            this.state.addObject.typeList = [];
        }else {
            this.state.addObject.typeList = selection;
        }

        this.forceUpdate();
    },

    onUpdateMovieLanguageChange: function(selection) {

        if(selection === null) {
            this.state.addObject.languages = [];
        }else {
            this.state.addObject.languages = selection;
        }

        this.forceUpdate();
    },
    onUpdateBtnClicked: function() {

        this.service.updateMovie(this.state.updateObject.id, this.state.updateObject).then((response) => {
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

export default AddMovie;