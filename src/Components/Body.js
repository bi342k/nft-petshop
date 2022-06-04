import '../App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBlockchain } from '../Redux/Web3Connection';
import { petsData } from '../Contract/jasonFile';

const Body = () => {
    const [adopters, setAdopters] = useState();
    const emptyAddress = "0x0000000000000000000000000000000000000000";
    const dispatch = useDispatch();
    
    const { provider, contract, accounts } = useSelector(
        (state) => state.ethConnect
    );
    
    const handleMetamask = () => {
        dispatch(loadBlockchain());
    }

    const getAdopters = async () => {
        try {
            let receipt = await contract.getAdopters();
            setAdopters(receipt);
        } catch (error) {
            console.log(error);
        }
    };

    const adoptPet = async (id) => {
        try {
            let receipt = await contract.adopt(id).send({ from: accounts[0] });
            setAdopters(receipt);
            console.log("Printed Recipt : ", receipt)
            await getAdopters();
        } catch (error) {
            console.log("Error : ", error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (contract) {
                await getAdopters();
            }
        }
        fetchData();
    }, [contract]);

    return (
        <div className='App'>
            <br />
            {provider ? (
                <>{adopters ? petsData.map((data, index) => <>
                    <div className='column'>
                        <div className='card'>
                            <img className='pet-img-size' src={data?.picture} width="225" height="150" />
                            <h3>Name: {data?.name} </h3>
                            <h5>Age: {data?.age}</h5>
                            <h5>Bread: {data?.breed}</h5>
                            <h5>Location: {data?.location}</h5>
                            {
                                adopters[index] === emptyAddress ?
                                    <button onClick={() => adoptPet(index)}>Adopt Pet</button>
                                    : "Adopted"
                            }
                        </div>
                    </div>
                </>) : ""}</>
            ) : (<>
                <button onClick={() => handleMetamask()}>Connect Metamask</button>
                <br /> <br /> <br />
            </>)}

        </div>
    )
}

export default Body;