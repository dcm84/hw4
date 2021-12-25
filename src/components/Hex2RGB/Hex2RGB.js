import PropTypes from 'prop-types';
import React, {useState} from 'react';
import './Hex2RGB.css';

function Hex2RGB(props) {
    
    //устанавливаем цвет по умолчанию
    const [color, setColor] = useState("#34495e");

    //функция для конвертации цвета в
    const convertHex2Rgb = hex => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result 
        ? "rgb(" + 
            parseInt(result[1], 16) + ", " +
            parseInt(result[2], 16) + ", " +
            parseInt(result[3], 16) + ")"
        : "Ошибка!";
    }

    //обработка изменения поля (срабатывает, только если в поле 7 символов)
    const changeValue = evt => {
      const {name, value} = evt.target;
      if(value.length == 7) setColor(value);
    }

    return (
      <div id="colored" style={(convertHex2Rgb(color) != "Ошибка!") ? {backgroundColor: color} : {}} >
      <form>
        <input name="color" defaultValue={color} onChange={changeValue} />
        <p>{convertHex2Rgb(color)}</p>
      </form>
      </div>
    )
}

Hex2RGB.propTypes = {
}

export default Hex2RGB;