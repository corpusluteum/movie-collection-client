import React from 'react';
import { ButtonGroup, Button, Glyphicon} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { RestService } from '../Service/RestService.jsx';
import AddMovieModal from './AddMovie';

var Movies = React.createClass({

    getInitialState: function() {
        this.service = new RestService();

        return {
            data: null,
            selectedMovietId: null,
            showAddModal: false,
            showUpdateModal: false,
            playerList : [],
            typeList : [],
            languageList: [],
            mute: false,
            shouldPlay: true,

        }
    },

    componentDidMount: function() {
        this.refreshTable();
    },

    render: function() {

        var selectRowProp = {
            mode: "radio",
            clickToSelect: true,
            className: "selected-row",
            bgColor: 'rgb(101, 148, 255)',
            onSelect: this.onRowSelect
        };

        if(!this.state.data){
            return (<div></div>);
        }

        return (
            <div>
                <ButtonGroup className="m-10">
                    <Button bsStyle="primary" onClick={this.openAddModal}><Glyphicon glyph="plus" />Ekle</Button>
                    <Button bsStyle="warning" disabled={this.state.selectedMovieId === null} onClick={this.openUpdateModal}><Glyphicon glyph="refresh" />Güncelle</Button>
                    <Button bsStyle="danger" disabled={this.state.selectedMovieId === null} onClick={this.onDeleteBtnClicked}><Glyphicon glyph="trash" />Sil</Button>
                </ButtonGroup>

                <BootstrapTable data={this.state.data}
                                striped={true}
                                hover={true}
                                search={true}
                                selectRow={selectRowProp}>
                    <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" hidden={true} dataSort={true}>Film id</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={true}>Film Adı</TableHeaderColumn>
                    <TableHeaderColumn dataField="description">Açıklama</TableHeaderColumn>
                    <TableHeaderColumn dataField="playerList" dataFormat={ this.playerFormatter }>Oyuncular</TableHeaderColumn>
                    <TableHeaderColumn dataField="typeList" dataFormat={ this.basicFormatter}>Türü</TableHeaderColumn>
                    <TableHeaderColumn dataField="languages" dataFormat={ this.basicFormatter}>Dili</TableHeaderColumn>
                </BootstrapTable>
                <AddMovieModal parent={this} ref="addMovie" />
            </div>
        );
    },

    onRowSelect: function(row, isSelected) {

        if(isSelected) {
            this.setState({ selectedMovieId: row.id });
        }else {
            this.setState({ selectedMovieId: null });
        }
    },

     playerFormatter : function(cell, row) {
        let icerik = "";
         if(row.playerList != null && row.playerList != '' && row.playerList.length > 0){
             let data = row.playerList;
             for(let i = 0; i< data.length; i++){
                 if(icerik != ""){
                     icerik += " , "
                 }
                 icerik += data[i].name + " "+data[i].surname;
             }
         }
         return (
             icerik
         );
    },

    basicFormatter : function(cell, row) {
        let icerik = "";
         if(cell != null && cell != '' && cell.length > 0){
             let data = cell;
             for(let i = 0; i< data.length; i++){
                 if(icerik != ""){
                     icerik += " , "
                 }
                 icerik += data[i].value;
             }
         }
         return (
             icerik
         );
    },
    
    closeAddModal: function() {
        this.setState({ showAddModal: false });
        this.refs.addMovie.clearAddObject();
    },

    openAddModal: function() {
        this.refs.addMovie.clearAddObject();
        this.setState({ showAddModal: true });
    },
    
    closeUpdateModal: function() {
        this.setState({showUpdateModal: false});
        this.refs.addMovie.clearUpdateObject();
    },

    openUpdateModal: function() {
        this.refs.addMovie.fillUpdateObject();
        this.setState({showUpdateModal: true});
    },
    
    onDeleteBtnClicked: function() {
        this.service.deleteMovie(this.state.selectedMovieId).then((response) => {
            this.refreshTable();
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        });
    },

    getMovieById: function(id) {
        for(var i in this.state.data) {
            if(this.state.data[i].id === id) {
                return this.state.data[i];
            }
        }
        return '';
    },
    
    refreshTable: function() {
        this.service.getMovieList().then((response) => {
            this.setState({data: response.data});
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        });

        this.service.getPlayerList().then((response) => {
            this.setState({playerList: response.data});
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        });

        this.service.getTypeList().then((response) => {
            this.setState({typeList: response.data});
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        });

        this.service.getLanguageList().then((response) => {
            this.setState({languageList: response.data});
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        });

    },

    getPlayerOptions: function() {
        var options = [];

        if(!this.state.playerList) {
            return options;
        }
        options = this.state.playerList;
        return options;
    },

    getTypeOptions: function() {
        var options = [];

        if(!this.state.typeList) {
            return options;
        }
        options = this.state.typeList;
        return options;
    },

    getLanguageOptions: function() {
        var options = [];

        if(!this.state.languageList) {
            return options;
        }
        options = this.state.languageList;
        return options;
    }

});

export default Movies;