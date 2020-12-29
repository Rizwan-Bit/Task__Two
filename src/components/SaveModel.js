import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function  SaveModel(props) {
    
    const [images, setImages] = useState([]);

    const [showFields, setShowFields] = useState(false);

    const [showCropper, setShowCropper] = useState(true);

    const [crop, setCrop] = useState({ aspect: 4 });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [mapFieldIndex, setMapFieldIndex] = useState(0);

    const {country, docName} = props.history.location.data.modelInfo;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      swipe: false,
      afterChange: index => setCurrentImageIndex(index)
    };

    const initImages = async () => {
    const imgPromises = props.history.location.data.files.map(file => {
            const reader = new FileReader();
            return new Promise((res,rej) => {

                reader.readAsDataURL(file.file);
                reader.onload = (e) => {
                    res(e.target.result);
                };
            })
    });

        return Promise.all(imgPromises);
    }

    const addFields = () => {
        
        let newImages = [...images];

        newImages.map((fields, i) => {
            return newImages[i].fields.push({name:'', coordinates: []})
        })
       
        console.log("Images After Adding Fields : ", newImages);
        setImages(newImages);
        setShowFields(true);
    }

    const deleteField = (e, fieldIndex) => {
        e.preventDefault();

        let newImages = [...images];

        newImages.map((fields, i) => {
            return newImages[i].fields.splice(fieldIndex, 1);
        })

        console.log("Images After Deleting Fields : ", newImages)
        setImages(newImages);
    }

    const handleChange = (e, fieldIndex) => {

        let newImages = [...images];

        newImages[currentImageIndex].fields[fieldIndex].name = e.target.value;

        setImages(newImages);

    }

    const onMapBoundry = (e, field, fieldIndex) => {
        e.preventDefault();
        console.log("Function onMapBoundry");
        console.log("Field : ", field);
        console.log("Field Index :", fieldIndex);
        setShowCropper(false);
        setMapFieldIndex(fieldIndex);
    }

    const setNewCrop = (newCrop) => {
        setCrop(newCrop);
    }

    const disable = (e) => {
        setShowCropper(true); 
    }

    const setCoordinates = (e) => {
        let newImages = [...images];

        newImages[currentImageIndex].fields[mapFieldIndex].coordinates.push(crop);

        console.log("Images After adding coordinates : ", newImages);
        setImages(newImages);
        setShowCropper(true);
    }

    useEffect(() => {
        async function call(){
            const docs = await initImages();;
            setImages(docs.map(doc => ({image:doc, fields:[]})));
        }

        call();
       // eslint-disable-next-line
    }, [])

    return(
        <div>
            <div className="container-fluid heading">
                    <Link to={{ pathname: "/configure", data: { country, docName } }} className="fas fa-arrow-left arrow mr-3"></Link>
                    <span> {country} / {docName} </span>
            </div>
            
            <div className="d-flex justify-content-end mr-4">
                <Link className="btn btn-primary mt-2 mr-5" to="/">Save</Link>
            </div>

            <div className="container">
                <div className="row border border-primary mt-2">
                    <div className="col col-xl-4 col-lg-6 mt-5 mb-5 ml-auto mr-auto border border-info">
                        {images.length > 1 && <Slider {...settings} >
                            {images.map((image, i) => {
                                return ( 
                                    <div key={i}>
                                        <div>
                                            <ReactCrop 
                                                src={image.image}
                                                crop={crop}
                                                onChange={newCrop => setNewCrop(newCrop)}
                                                disabled={showCropper}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                        }

                        {!showCropper ? 
                            <div>
                                <button onClick={(e) => setCoordinates(e)} className="btn mt-5">Okay</button>
                                <button onClick={(e) => disable(e)} className=" mt-5 ml-3 btn">Cancle</button>
                            </div>
                            :
                            null
                        }

                    </div>

                    <div className="col col-xl-4 col-lg-6 mt-5 mb-5 ml-auto mr-auto border border-info">
                        {showFields ?
                            <div>
                                {images[currentImageIndex].fields.map((field, i) => {
                                    return(
                                        <div key={i}>
                                            <input type="text" className="form-control mt-2 mb-2" name={field.name} value={field.name} onChange={(e) => handleChange(e, i)} /> 
                                             {field.coordinates.length > 0 ? <span class="far fa-check-circle mr-3"></span> : null}
                                            <button onClick={(e) => onMapBoundry(e, field, i)} className="btn btn-sm btn-primary">{field.coordinates.length > 0 ? "Edit" : "Map Boundry" }</button>
                                            <button onClick={(e) => deleteField(e, i)} className="btn btn-sm btn-danger ml-3">Delete</button>
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            null
                        }
                        <div className="d-flex justify-content-center">
                            <button onClick={() => addFields()} className="btn btn-info mt-4">Add Fields</button>
                        </div>                           
                    </div>
                </div>
            </div>
        </div>
    )   
}
export default SaveModel;