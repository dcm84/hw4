import React, {useState} from 'react';
import StepModel from './StepModel.js';
import StepsTable from './StepsTable.js';
import './Steps.css';
import StepsAdd from './StepsAdd.js';
import {v4 as uuidv4} from 'uuid';

function Steps() {
    const [steps, setSteps] = useState([
        //демо данные
        new StepModel(uuidv4(), new Date(), 15.2),
        new StepModel(uuidv4(), new Date('2021-12-17'), 3.8)
    ]);

    //обработчик для добавления тренировки
    const handleAdd = step => {
        let found = false;
        
        //если удается заменить запись с таким же временем, то found установится в true
        let newSteps = steps.map(
            el => 
                el.date.toLocaleDateString() === step.date.toLocaleDateString()
                    ? (found=true, new StepModel(uuidv4(), step.date, el.distance + step.distance)) 
                    : el
        )
        
        setSteps(found ? newSteps : prevSteps => [ ...prevSteps, step]);
    }
    
    //обработчик для удаления тренировки
    const handleRemove = id => {
        setSteps(steps.filter(o => o.id !== id));
    }

    return (
        <div id="steps">
            <StepsAdd onAdd={handleAdd} />
            <StepsTable steps={steps.sort((a, b) => a.date > b.date ? 1 : -1)} onRemove={handleRemove} />
        </div>
    )

}

export default Steps;