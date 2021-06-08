import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({product}) => {

    const imageurl = product ? `${API}/product/photo/${product._id}` : `https://i.pinimg.com/originals/53/26/72/5326724ac15a7d4adc30ebc1f1649284.jpg`

    return (
        <div className="rounded border border-success p-2">
            <img
              src={imageurl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>
    );
};

export default ImageHelper;