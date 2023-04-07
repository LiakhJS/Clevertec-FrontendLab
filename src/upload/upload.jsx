import React from 'react';
import { ReactComponent as Camera } from '../images/camera-add-ava.svg';

export const FileUploadSingle = ({ handleFileChange }) => (
    <React.Fragment>
        <input id='ava-input' type="file" className="profile__ava_input" onChange={handleFileChange} />
        <label htmlFor='ava-input' className="profile__ava_input_back" >
            <span className="profile__ava_input_icon">
                <Camera className='profile__ava_input_icon-i'/>
               
            </span>
        </label>
    </React.Fragment>

);

