import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]); //doctors is an array that contains all the doctors
    const [filteredDoctors, setFilteredDoctors] = useState([]); //filteredDoctors is an array that only contains the doctors we get out of a search
    const [isSearched, setIsSearched] = useState(false); //boolean
    
    //getDoctorsDetails-method gets the doctors data from the JSON file and initializes all the used variables
    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63') //fetches json file
        .then(res => res.json()) //the file gets processed as a json file
        .then(data => {

            // i add my profilePic URLs here
            data = addProfilePics(data);

            if (searchParams.get('speciality')) {
                window.reload()
                const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());

                setFilteredDoctors(filtered);
                
                setIsSearched(true);
                window.reload()
            } else {
                setFilteredDoctors([]);
                setIsSearched(false);
            }
            setDoctors(data); //the json file is put into the doctors array --> we could add photos here!!..
        })
        .catch(err => console.log(err));
    }
    //end of getDoctorsDetails-method

    //addProfilePics
    const addProfilePics = (data) => {
        const modifiedData = data.map((entry, index) => ({
            ...entry,
            profilePic: `${index}.jpg`
          }));
        return modifiedData;
    }


    //handleSearch-method:
    const handleSearch = (searchText) => {

        if (searchText === '') //IF we don't have any search words, set FilteredDoctors to an empty array
        {
            setFilteredDoctors([]);
            setIsSearched(false);
            } 
            else {
            //.. and if we do enter a search word, put all the doctors that have the matching specialty in "filtered"   
            const filtered = doctors.filter(
                (doctor) =>
                // 
                doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
                
            );
            
            //update the FilteredDoctors with our results
            setFilteredDoctors(filtered);

            //and we set the flag that we completed a search
            setIsSearched(true);
            
            window.location.reload()
        }
    }; 
    //end of handleSearch method

    const navigate = useNavigate();
    useEffect(() => {
        getDoctorsDetails();
        // const authtoken = sessionStorage.getItem("auth-token");
        // if (!authtoken) {
        //     navigate("/login");
        // }
    }, [searchParams])

    return (
        <center>
            {/* SEARCH FOR DOCTORS */}
            <div  className="searchpage-container">
                <FindDoctorSearchIC onSearch={handleSearch} />
            <div className="search-results-container">

            {/* SHOW THE RESULTS */}
            {isSearched ? (
                <center>
                    <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                    <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                    {/* if the filteredDoctors-array is not empty, show a doctor card for every doctor! */}
                    {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => <DoctorCardIC className="doctorcard" {...doctor} key={doctor.name} />)
                    ) : (
                    <p>No doctors found.</p>
                    )}
                </center>
                ) : (
                ''
                )}
            </div>
        </div>
        </center>
    )
}

export default InstantConsultation