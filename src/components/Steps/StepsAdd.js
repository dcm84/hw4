import PropTypes from 'prop-types';
import React, {useState} from 'react';
import StepModel from './StepModel.js';
import {v4 as uuidv4} from 'uuid';

function StepsAdd(props) {
    const {onAdd} = props;
    const [form, setForm] = useState({date: new Date().toLocaleDateString(), distance: ''})
    
    //обработчик изменения состояния полей формы
    const handleChange = evt => {
        const {name, value} = evt.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }

    //обработчик отправки формы
    const handleSubmit = evt => {
        evt.preventDefault();
        
        //Разберем дату на части и попробуем отпарсить ее средствами языка (для проверки корректности)
        let dateMatch = form.date.match(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/);
        let dateParsed = dateMatch != null ? Date.parse(dateMatch[3] + "-" + dateMatch[2] + "-" + dateMatch[1]) : NaN; 
        
        let distanceParsed = parseFloat(form.distance);

        //Имеет смысл добавлять запись только если корректная дата и расстояние больше нуля
        if (!isNaN(dateParsed) && distanceParsed > 0) {
            let date = new Date();
            date.setTime(dateParsed);
            const step = new StepModel(uuidv4(), date, distanceParsed);
            onAdd(step);
        }

        //установим форму в начальное состояние
        setForm({date: new Date().toLocaleDateString(), distance: ''});
    }

    return (
        <form onSubmit={handleSubmit}>
		    <input name="date" value={form.date}  onChange={handleChange}  placeholder="Дата (ДД.ММ.ГГ)" />
            <input name="distance" value={form.distance}  onChange={handleChange}  placeholder="Пройдено, км." />
            <input type="submit" value="Добавить" />
        </form>
    );
}

StepsAdd.propTypes = {
    onAdd: PropTypes.func.isRequired
}

export default StepsAdd;