import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    SelectInput,
    required,
    useGetList,
} from "react-admin";

export const CategoryCreate = () => {
    const { data: categories = [] } = useGetList("category", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "name", order: "ASC" },
        filter: { active: true },
    });

    const parentChoices = [
        {
            id: null,
            name: "Không có danh mục cha",
        },
        ...categories,
    ];
    return(
        <Create title="Thêm danh mục">
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
                />
                <BooleanInput
                    source="active"
                    label="Hoạt động"
                    defaultValue={true}
                />
            </SimpleForm>
        </Create>
    );
};