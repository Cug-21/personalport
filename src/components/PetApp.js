import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pet from './Pet';
import PetSelection from './PetSelection';

function PetApp({ onPetSelect }) {
    return <PetSelection onPetSelect={onPetSelect} />;
}

export default PetApp;