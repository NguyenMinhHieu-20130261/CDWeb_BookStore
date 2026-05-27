import {SimpleForm} from "react-admin";
import {Create, TextInput} from "react-admin";
export const CreateBlog = () => {
    return (
        <Create title={'Tạo tin tức'}>
            <SimpleForm>
                <TextInput source="blogCate" label="Tên danh mục"/>
                <TextInput source="title" label="Tiêu đề"/>
                <TextInput source="content" label="Nội dung"/>
                <TextInput source="image" label="Link hình ảnh"/>
            </SimpleForm>
        </Create>
    )
}