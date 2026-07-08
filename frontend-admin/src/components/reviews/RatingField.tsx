import * as React from 'react';
import { FunctionField } from 'react-admin';
import Rating from '@mui/material/Rating';

const RatingField = (props: any) => {
    return (
        <FunctionField
            {...props}
            render={(record: { rating: number | undefined; }) => (
                <Rating
                    value={record ? record.rating : 0}
                    readOnly
                    precision={0.5}
                    size="small"
                />
            )}
        />
    );
};

export default RatingField;
