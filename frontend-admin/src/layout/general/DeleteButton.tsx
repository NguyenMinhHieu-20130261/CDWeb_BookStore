import * as React from 'react';
import { DeleteButton as RADeleteButton } from 'react-admin';

interface Props {
    param?: string;
    [key: string]: any;
}

const DeleteButton = ({ param, ...props }: Props) => {
    return (
        <RADeleteButton
            mutationMode="pessimistic"
            confirmTitle={`Xóa ${param || 'mục này'}`}
            confirmContent={`Bạn có chắc chắn muốn xóa ${param || 'mục này'} này không?`}
            label="Xóa"
            {...props}
        />
    );
};

export default DeleteButton;
