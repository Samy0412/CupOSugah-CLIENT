/*global google*/
import React, {useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import axios from "axios"
import {
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

// react-loading
import ReactLoading from "react-loading"

// @material-ui/core components
import { Button } from "@material-ui/core";

// react-bootstrap
import { Form } from "react-bootstrap";

//Our own style sheet
import "../../styles.scss";

//Components
import Map2 from "./Map2"


function CreateNeighbourhood(props) {

  const [homeRedirect, sethomeRedirect] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validated, setValidated] = useState(false);
  const [validatedPath, setValidatedPath] = useState(true);
  const [loading, setLoading]=useState(false);
  
  const WrappedMap = withScriptjs(withGoogleMap(Map2));

  /////Logic to set the bounds of the neighbourhood
  let overlay;
  let polygonArray= [];
  let polygonArrayFormatted=[];

  function getCoordinates() {
    let newArray=[];
    let newArrayFormatted=[];
    let pathArray = overlay.getPath().getArray();
    
    pathArray.forEach( (point) =>{
      var x = point.lat();
      var y = point.lng();
      newArray.push({x,y});
      newArrayFormatted.push(`(${x},${y})`); 
    });
    polygonArrayFormatted = newArrayFormatted;
    polygonArray = newArray;
   
  }

  function getPaths(polygon) {
    let pathArray = polygon.getPath().getArray();
    pathArray.forEach( (point) =>{
      var x = point.lat();
      var y = point.lng();
      polygonArray.push({x,y})
      polygonArrayFormatted.push(`(${x},${y})`); 
    });
    overlay=polygon;
    // new vertex listener
  google.maps.event.addListener(polygon.getPath(), 'insert_at', getCoordinates); 
  // // move vertex listener
  google.maps.event.addListener(polygon.getPath(), 'set_at', getCoordinates); 

  }

  function getCenter (bounds) {
    let n= bounds.length;
    let center = {};
    if (n === 0){
      center = props.user.coordinates;
    }else if (n === 3){   
        let x = (bounds[0].x + bounds[1].x + bounds[2].x)/n;
        let y = (bounds[0].y + bounds[1].y + bounds[2].y)/n;

        center = `(${x},${y})`

    }else if (n >= 4){
     let X_max = bounds[0].x;
     let X_min = bounds[0].x;
     let Y_max = bounds[0].y; 
     let Y_min = bounds[0].y;
     bounds.forEach ((vertice)=>{
      if(vertice.x > X_max){
        X_max = vertice.x;
      }else if (vertice.x < X_min){
        X_min = vertice.x;
      }
      if(vertice.y > Y_max){
        Y_max = vertice.y;
      }else if (vertice.y < Y_min){
        Y_min = vertice.y
      }
     })

      center = `(${(X_max + X_min)/2},
        ${(Y_max + Y_min)/2})`
      }
    
    return center;
    }
  
  /////////////


  const onChangeHandler = event =>{
    setSelectedFiles(Array.from(event.target.files))
  }
 
  const onSubmitHandler = function (event) {
    setLoading(true);

    const neighbourhoodName = event.target.elements['formBasicName'].value;
    let neighbourhoodCenter = null;
    let bounds = null;
    if (polygonArray && polygonArrayFormatted){
      neighbourhoodCenter = getCenter(polygonArray);
      bounds = polygonArrayFormatted;
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
    }
    setValidated(true);
    !bounds.length && setValidatedPath(false)
  
    event.preventDefault();

    const data = new FormData()

    selectedFiles.forEach((file, i) => {

      data.append(i, file)
    })

    
    if(selectedFiles.length !==0 && neighbourhoodName && bounds.length ){
      axios.post("./images/upload", data).then((response)=> {

        const url = response.data[0].url;

      createNeighbourhood({
        neighbourhoodName: neighbourhoodName,
        coordinates: neighbourhoodCenter,
        bounds: bounds,
        picture: url
      });

  })
 } else if (neighbourhoodName && bounds.length) {

    createNeighbourhood({
      neighbourhoodName: neighbourhoodName,
      coordinates: neighbourhoodCenter,
      bounds: bounds,
    })
  }

  };

  const createNeighbourhood = function (data) {
    axios.post("/neighbourhood/create", data)
      .then((response) => {

        addNeighbourhood({
          id:props.user.id, 
          neighbourhood_id: response.data.id,
        });
      })
      .catch((err) => {
        alert(console.log(err));
      });
  };

  const addNeighbourhood = function (userInfo) {
    axios.post("/users/addNeighbourhood", userInfo)
      .then((response) =>
        props.register(response.data),
      ).then (()=> {
        sethomeRedirect(true)
        setLoading(false);});
  };


  if (homeRedirect) {
    return (
      <Redirect to="/home" />);
  }

 
  return (
    <div>
        <header className="landing-header">
        <Link to="/">
        <div className="logo-container">
          <img src="https://i.imgur.com/j6IJGS2.png" alt="logo" />
          <h4 className="logo">Cup<span>O</span>Sugah</h4>
        </div>
        </Link>
        </header>
        {loading && <ReactLoading className= "loading" type={"spokes"} color={"#2c3e50"} height={"8%"} width={"8%"}/>}
        {!loading && (
            <div className="neighbourhood-form">
            <Form onSubmit={onSubmitHandler} className="form-contenant" noValidate  validated={validated}> 
              <div className="form-header">
                <h2 >Step 3: Create a neighbourhood</h2>
              </div>
              <div >
                <div className="form">
                  <Form.Group controlId="formBasicName">
                  <Form.Label>Neighbourhood Name <span>*</span></Form.Label>
                    <Form.Control
                      type="firstname"
                      placeholder="Neighbourhood name"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                  </Form.Control.Feedback>    
                  </Form.Group>
  
              <Form.Group controlId="formBasicProfilePhoto">
                <Form.Label>Neighbourhood picture</Form.Label>
                <Form.File 
                custom
                >
                <Form.File.Input onChange={onChangeHandler} />
                <Form.File.Label data-browse="Browse">
                {!selectedFiles[0] ? "Select your picture (jpeg, png, gif)" : selectedFiles[0].name }
              </Form.File.Label>
              </Form.File>
              </Form.Group>
                  <Form.Label>Determine the limits of your neighbourhood (draw and edit a polygon)<span> *</span></Form.Label>
                  {!validatedPath && (
                  <span style={{color:"red",marginTop:"0", fontSize:"13px"}}>The polygon is required</span>
                )}
                  <div >
                      <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                        loadingElement={<div style={{ height: "50vh"}} />}
                        containerElement={<div style={{ height: "50vh" }} />}
                        mapElement={<div style={{ height: "100%", width: "100%", boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 8px", border: validatedPath? "solid 0.5px rgba(0, 0, 0, 0.1)":"solid 0.5px red", borderRadius:"10px"}} />}
                        getPaths={getPaths}
                        user={props.user}
                      />   
                  </div>
              </div>
              </div>
              <div className="button-container">
                <Button
                  variant="contained"
                  type="submit"
                  className="registration-button"
                >
                    SAVE
                </Button>
              </div>
            </Form>
          </div>
        )} 
        </div>
  );
}

export default CreateNeighbourhood;


