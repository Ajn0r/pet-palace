import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import PetSitting from "./PetSitting";

function PetSittingPage() {
	const { id } = useParams();
	const [ petsitting, setPetsitting ] = useState({ results: [] });
  
	useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: petsitting }] = await Promise.all([
          (await axiosReq.get(`/petsittings/${id}`)),
        ]);
        setPetsitting({ results: [petsitting] });
      } catch (err) {""}
    };
    handleMount();
  }, [id]);
	
	return (
    <PetSitting {...petsitting.results[0]} petsittingPage/>
  );
}
 
 export default PetSittingPage;