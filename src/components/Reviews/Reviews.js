import React, { useEffect, useState}  from 'react';
import "./Reviews.css";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const Reviews = () => {
    
    //modal
    const [showReviewModal, setShowReviewModal] = useState(false);
    const handleCloseModal = () => {setShowReviewModal(false)};
    const handleShowModal = () => {setShowReviewModal(true)};
    
    //review entry
    const [doctorToReview, setDoctorToReview] = useState("");
    const [reviewName, setReviewName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [reviewScore, setReviewScore] = useState(0);

    //review table data
    const [doctorReviewData, setDoctorReviewData] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
             navigate("/login");
         }
    }, [])
     
    //PART 1: prepare the data for the review list --> JVV: zeker eerste stuk lijkt te werken
    if(!sessionStorage.getItem("doctorReviewData") )
    {
        var doctorData = JSON.parse(sessionStorage.getItem("doctorList"));
        var doctorReviews = doctorData.map((entry) => ({
            ...entry, feedbackProvided: "false"
          }));
          doctorReviews = doctorReviews.map((entry) => ({
            ...entry, review: ""
          }));
        
        sessionStorage.setItem("doctorReviewData", JSON.stringify(doctorReviews));

    }
    else{
        console.log("there was already some data in the doctorReviewData session storage");
    }
  

    // a function to write a review to the doctor table (called from the modal)
    const registerReview = (dName, review) => {
        
        console.log("You are in the registerReview function");

        //get the original review data from session storage
        console.log("old data:");
        var originalReviewData = JSON.parse(sessionStorage.getItem("doctorReviewData"));
        console.log(originalReviewData);
        
        //update the data
        var changedReviewData = originalReviewData.map((entry) => {
            if (entry.name === dName) {
                return {
                    ...entry,
                    feedbackProvided: true,
                    review: review
                };
            }
            return entry;
        });
        
        //save the new review data
        console.log("new data:");
        console.log(changedReviewData);
        sessionStorage.setItem("doctorReviewData", JSON.stringify(changedReviewData));
        handleCloseModal();
        console.log("the data in session storage:");
        console.log(JSON.parse(sessionStorage.getItem("doctorReviewData")));
        window.location.reload();
    }

    // Define reviewRows outside JSX 
    const reviewRows = JSON.parse(sessionStorage.getItem("doctorReviewData")).map((doctor, index) => (
        <tr className="doctor-review-row" key={doctor.id}>
            <td className="review-id-column" >{index + 1}</td>
            <td className="review-name-column">{doctor.name}</td>
            <td className="review-speciality-column">{doctor.speciality}</td>
            <td className="review-feedback-column">
                {doctor.feedbackProvided === "false" && <button
                    className="review-feedback-button"
                    onClick={() => {
                        setDoctorToReview(doctor.name);
                        setShowReviewModal(true);
                    }}
                >
                    Click Here
                </button>}
            </td>
            <td className="review-review-column">{doctor.review}</td>
        </tr>
    ));

   


      
    
    return (
    
        <div>
            
            <div className="review-form-modal">
                <>
                <Modal show={showReviewModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className="review-modal-title">
                            Give Your Review
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="review-modal-title" >
                        <div>Please review dr. {doctorToReview} </div> 
                        <br/>

                        <div className="form-group mb-2">
                                <label htmlFor="name" className="form-label">Name (optional) </label>
                                <input
                                    value = {reviewName}
                                    onChange={(e) => setReviewName(e.target.value)}   
                                    type="text" 
                                    id="reviewName" 
                                    name="reviewName"
                                    className="form-control" 
                                    placeholder="Please enter your name" />
                                </div>

                        <div className="form-group mb-2">
                                <label htmlFor="reviewText" className="form-label">Please leave a review</label>
                                <textarea
                                    value = {reviewText}
                                    rows="4"
                                    onChange={(e) => setReviewText(e.target.value)}   
                                    type="text" 
                                    id="reviewText" 
                                    name="reviewText"
                                    className="form-control" 
                                    placeholder="Please enter your review here" />
                        </div>

                        <div className="content text-center">
                        {/*}
                        <div className="ratings">
                            <strong> Please rate your doctor </strong>
                            <div className="stars">
                                    (reviewScore === 0 ?) && 
                                    <div className="zero-stars">
                                        <i className="fa fa-star-o" onClick={changeScore(1)}></i>
                                        <i className="fa fa-star-o" onClick={changeScore(2)}></i>
                                        <i className="fa fa-star-o" onClick={changeScore(3)}></i>
                                        <i className="fa fa-star-o" onClick={changeScore(4)}></i>
                                        <i className="fa fa-star-o" onClick={changeScore(5)}></i> 
                                    </div>   
                            </div>
                        </div>   
                    */}</div>            
                    </Modal.Body>

                    <Modal.Footer>
                    
                    <button variant="primary" onClick={() => {console.log("called registerReview function"); registerReview(doctorToReview, reviewText)}}>
                        Submit Review
                    </button>
                    </Modal.Footer>
                </Modal>
                </>
            </div>

            <div  className="review-list-container">  
                <h2> Reviews </h2> 
                <br/>  
                <table className="review-table">
                    <tbody>
                        <tr>
                            <th className="review-id-column"> <strong> ID </strong></th>
                            <th className="review-name-column"> <strong> Name </strong></th>
                            <th className="review-speciality-column"> <strong> Doctor Speciality </strong></th>
                            <th className="review-feedback-column"> <strong> Feedback </strong></th>
                            <th className="review-review-column"> <strong> Review Given </strong></th>
                        </tr>

                       {reviewRows}
                        
                            
                            
                        
                    </tbody>
                </table>
            </div>
            
        </div>
    
  )
}

export default Reviews;
