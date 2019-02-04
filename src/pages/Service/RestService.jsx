import service from './Service.jsx';

export class RestService {

    getMovieList(){
        return service.getRestClient().get('/movielist');
    }

    addMovie(data){
        return service.getRestClient().post('/movie', data);
    }

    updateMovie(movieId, data){
        return service.getRestClient().put('/movie/'+ movieId, data);
    }

    deleteMovie(movieId){
        return service.getRestClient().delete('/movie/'+ movieId)
    }

    uploadFileToServer(data){
        return service.getRestClient().post('/upload', data);
    }

    getPlayerList(){
        return service.getRestClient().get('/playerlist');
    }

    deletePlayer(playerId){
        return service.getRestClient().delete('/player/'+ playerId)
    }
    addPlayer(data){
        return service.getRestClient().post('/player', data);
    }

    updatePlayer(playerId, data){
        return service.getRestClient().put('/player/'+ playerId, data);
    }

    getTypeList(){
        return service.getRestClient().get('/types');
    }

    getLanguageList(){
        return service.getRestClient().get('/languages');
    }

}
