import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import 'bootstrap/dist/css/bootstrap.css';
import {useState} from 'react';

var SERVER_URL = "http://127.0.0.1:5000"  // url of the server that will host our requests

// Component that presents a dialog to collect credentials from the user
export default function AnimeAdder() {

    var divStyle = {
        marginLeft: "150px",
        marginRight: "150px"
      };
      
    let [addName, setName] = useState("");
    let [addDescription, setDescription] = useState("");
    let [addPath, setPath] = useState("");
    let [addStatus, setStatus] = useState("to watch");
    let [addAltPic, setAltPic] = useState("");
    let [alertStatus, setAlertStatus] = useState(0);
    
    function addItem() {
        if (addName==="" || addStatus==="" || addAltPic==="") {
            setAlertStatus(1); //alert("Name, Status and picture name are required!") 
        } 
        else if (addName.length>50){
            setAlertStatus(4);
        }
        
        else if (addAltPic.length>50){
            setAlertStatus(5);
        }

        else {
            fetch(`${SERVER_URL}/anime/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        "name": addName,
                        "description": addDescription,
                        "path": addPath,
                        "status": addStatus,
                        "altPic": addAltPic
                })
            }).then(res => {
                if (!res.ok) {
                    setAlertStatus(2); 
                } 
                else {
                    setAlertStatus(3);
                }
            });
            
            setName("");
            setAltPic("");
            setDescription("");
            setPath("");
                    
        }  
    }
        
    function showAlert() {
        if (alertStatus===1){
            return <Alert variant="danger" onClose={() =>setAlertStatus(0)} dismissible> Name, Status and picture name are required! </Alert>
        }
        else if (alertStatus===2) {
            return <Alert variant="danger" onClose={() =>setAlertStatus(0)} dismissible> ERROR: Anime already exists in database, choose another one!</Alert>
        }
        else if (alertStatus===3) {
            return <Alert variant="success" onClose={() =>setAlertStatus(0)} dismissible> Succesfully added Anime to database! </Alert>
        }
        else if (alertStatus===4) {
            return <Alert variant="warning" onClose={() =>setAlertStatus(0)} dismissible> Warning: Name cannot be longer than 50 characters!</Alert>
        }
        else if (alertStatus===5) {
            return <Alert variant="warning" onClose={() =>setAlertStatus(0)} dismissible> Warning: Picture Name cannot be longer than 50 characters!</Alert>
        }
        else {
            return null;
        }
    }
    
    
 return (
    <div style={divStyle}>
       <div> {showAlert()} </div> 
    <h1>Add Anime</h1>
    <Form>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter name" value={addName} onChange={e => setName(e.target.value)}/>
            <Form.Text className="text-muted">
            Make sure the name is unique or it won't be saved into the database and you will be notified to change it.
            </Form.Text>
        </Form.Group>

        <Form.Group >
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={6} value={addDescription} onChange={e => setDescription(e.target.value)} />
        </Form.Group>
        
        <div key="default-radio" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Check 
                type="radio"
                id="default-radio"
                name="group1"
                label="To watch"
                defaultChecked
                onChange={e => setStatus("to watch")}
            />
            <Form.Check 
                type="radio"
                id="default-radio"
                name="group1"
                label="Currently watching"
                onChange={e => setStatus("watching")}
            />
            <Form.Check 
                type="radio"
                id="default-radio"
                name="group1"
                label="Watched"
                onChange={e => setStatus("watched")}
            />
        </div>

        <Form.Group>
            <Form.Label>Picture link</Form.Label>
            <Form.Control placeholder="Enter link" value={addPath} onChange={e => setPath(e.target.value)} />
            <Form.Text className="text-muted">
            Add a link to a picture online, you will be able to see that picture in your lists if you are connected to the internet.
            </Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Picture Name</Form.Label>
            <Form.Control placeholder="Enter picture name" value={addAltPic} onChange={e => setAltPic(e.target.value)} />
            <Form.Text className="text-muted">
           In case you are not connected to the internet, the picture name will be displayed.
            </Form.Text>
        </Form.Group>

        <Button variant="primary" type="button" onClick={addItem}>
            Submit
        </Button>

    </Form>
    </div>
    
 );
}
