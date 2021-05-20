import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button  from 'react-bootstrap/Button';

var SERVER_URL = "http://127.0.0.1:5000"  // url of the server that will host our requests



export default function WatchedAnime() {

    const ListItem = (props) => {
        return <Container style={{ marginLeft:'30px'}} fluid> 
                    <Row style= {{ padding: '10px'}}>
                        <Col xs={5} style={{border:'2px solid red'}} > 
                            <p> <strong>{props.name}</strong> </p> 
                        </Col>
                        <Col><Image src={props.imgPath} alt={props.altPic} rounded fluid /> </Col>
                        <Col><p><strong>Description: </strong> {props.description}</p></Col>
                        <Col>
                            <p><strong>Change Status: </strong></p>
                            <Button style={{marginTop: '10px'}} onClick={() => changeStatus(props.identification, "to watch")}>Set as To Watch</Button>
                            <Button style={{marginTop: '10px'}} onClick={() => changeStatus(props.identification, "watching")}>Set as Currently Watching</Button>
                        </Col>
                        <Col><Button variant='danger' onClick={ () => deleteSelected(props.identification)}>Delete</Button></Col>
                    </Row>
               </Container>;
    };

    let [ animeList, setAnimeList] = useState([]);

    function getWatchedAnime() {
        fetch(`${SERVER_URL}/anime/watched`)
        .then((response) => response.json())
        .then((watchedA) => setAnimeList(watchedA));
        
    }

    function deleteSelected(id) {
        // /anime/delete/<id>
        var idAsString = id.toString();
        fetch(`${SERVER_URL}/anime/delete/${idAsString}`, {
            method: 'DELETE'
        }).then(res => {getWatchedAnime()});
    }

    function changeStatus(id, newStatus) {
        // /anime/status/<id>
        // request.json["status"]
        var idAsString = id.toString();
        fetch(`${SERVER_URL}/anime/status/${idAsString}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "status": newStatus
            })
        }).then(res => {getWatchedAnime()});
    }

    useEffect( () => { getWatchedAnime() }, []);

    return(  
        <div>
            <p style={{marginRight: '300px', marginLeft: '300px', fontSize: '30px'}}> <strong>Watched</strong></p>
            { animeList.map( (item, i) => {return <ListItem key={i} 
                                                            name={ item.name } 
                                                            imgPath={item.imgPath}
                                                            altPic={item.altPic}
                                                            description={item.description}
                                                            identification={item.id} /> } ) }
        </div>
    );
}

