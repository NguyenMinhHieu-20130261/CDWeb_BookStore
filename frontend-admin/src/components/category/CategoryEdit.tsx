import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    required,
    SelectInput,
    useGetList,
    useRecordContext,
} from "react-admin";

const CategoryEditForm = () => {
    const record = useRecordContext();
    const { data: categories = [] } = useGetList("category", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "name", order: "ASC" },
        filter: { active: true },
    });
    const parentChoices = [
        { id: null, name: "Không có danh mục cha" },
        ...categories.filter((cate: any) => cate.id !== record?.id),
    ];
    return (
        <SimpleForm>
            <TextInput
                source="name"
                label="Tên danh mục"
                validate={[required("Không được để trống")]}
                fullWidth
            />
            <SelectInput
                source="parentCategory.id"
                label="Danh mục cha"
                choices={parentChoices}
                optionText="name"
                optionValue="id"
                emptyText={null}
            />
            <BooleanInput
                source="active"
                label="Đang hoạt động"
            />
        </SimpleForm>
    );
};
export const CategoryEdit = () => (
    <Edit>
        <CategoryEditForm />
    </Edit>
);