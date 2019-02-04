import React from 'react';
import { ButtonGroup, Button, Glyphicon} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { RestService } from '../Service/RestService.jsx';
import AddPlayerModal from './AddPlayer';

var Players = React.createClass({

    getInitialState: function() {
        this.service = new RestService();
        return {
            data: null,
            selectedPlayerId: null,
            showAddModal: false,
            showUpdateModal: false
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
                    <Button bsStyle="warning" disabled={this.state.selectedPlayerId === null} onClick={this.openUpdateModal}><Glyphicon glyph="refresh" />Güncelle</Button>
                    <Button bsStyle="danger" disabled={this.state.selectedPlayerId === null} onClick={this.onDeleteBtnClicked}><Glyphicon glyph="trash" />Sil</Button>
                </ButtonGroup>

                <BootstrapTable data={this.state.data}
                                striped={true}
                                hover={true}
                                search={true}
                                selectRow={selectRowProp}>
                    <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" hidden={true} dataSort={true}>Oyuncu id</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={true} dataFormat={ this.playerFormatter }>Oyuncu Adı</TableHeaderColumn>
                    <TableHeaderColumn dataField="description">Açıklama</TableHeaderColumn>
                </BootstrapTable>
                <AddPlayerModal parent={this} ref="addPlayer" />

            </div>
        );
    },

    playerFormatter : function(cell, row) {
        let icerik = row.name + " " + row.surname;
        return (
            icerik
        );
    },

    onRowSelect: function(row, isSelected) {

        if(isSelected) {
            this.setState({ selectedPlayerId: row.id });
        }else {
            this.setState({ selectedPlayerId: null });
        }
    },

    closeAddModal: function() {
        this.setState({ showAddModal: false });
        this.refs.addPlayer.clearAddObject();
    },

    openAddModal: function() {
        this.refs.addPlayer.clearAddObject();
        this.setState({ showAddModal: true });
    },

    closeUpdateModal: function() {
        this.setState({showUpdateModal: false});
        this.refs.addPlayer.clearUpdateObject();
    },

    openUpdateModal: function() {
        this.refs.addPlayer.fillUpdateObject();
        this.setState({showUpdateModal: true});
    },

    onDeleteBtnClicked: function() {
        this.service.deletePlayer(this.state.selectedPlayerId).then((response) => {
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

    getPlayerById: function(id) {
        for(var i in this.state.data) {
            if(this.state.data[i].id === id) {
                return this.state.data[i];
            }
        }
        return '';
    },

    refreshTable: function() {
        this.service.getPlayerList().then((response) => {
            this.setState({data: response.data});
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        });
    },
});

export default Players;