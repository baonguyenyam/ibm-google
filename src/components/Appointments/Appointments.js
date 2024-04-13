import React, { useEffect, useState } from 'react';
import './Appointments.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';

const Appointments = () => {


        const [searchParams] = useSearchParams();
        const [doctors, setDoctors] = useState([]); //doctors is an array that contains all the doctors
        const [filteredDoctors, setFilteredDoctors] = useState([]); //filteredDoctors is an array that only contains the doctors we get out of a search
        const [isSearched, setIsSearched] = useState(false); //boolean
        
        //getDoctorsDetails-method gets the doctors data from the JSON file and initializes all the used variables
        const getDoctorsDetails = () => {
            
            const data = JSON.parse(sessionStorage.getItem("doctorList"));

                if (searchParams.get('speciality')) {
                    //window.reload()
                    const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());
    
                    setFilteredDoctors(filtered);
                    
                    setIsSearched(true);
                    //window.reload()
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
                //the json file is put into the doctors array
                setDoctors(data); 
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
            const authtoken = sessionStorage.getItem("auth-token");
            if (!authtoken) {
                 navigate("/login");
             }
        }, [searchParams])
    
        return (
            <div>
                {/* SEARCH FOR DOCTORS */}
                <div  className="searchpage-container"> 
                    <FindDoctorSearch onSearch={handleSearch} />
                    <div className="search-results-container">
        
                    {/* SHOW THE RESULTS */}
                    {isSearched ? (
                        <center>
                            <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                            <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                            {/* if the filteredDoctors-array is not empty, show a doctor card for every doctor! */}
                            {filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doctor => <DoctorCard className="doctorcard" {...doctor} key={doctor.name} />)
                            ) : (
                            <p>No doctors found.</p>
                            )}
                        </center>
                        ) : (
                        ''
                        )}
                    </div>
                </div>
            </div>
        )
    }
    


export default Appointments