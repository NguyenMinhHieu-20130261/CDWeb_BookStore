import type { DataProvider } from "react-admin";

type Category = {
  id: number;
  name: string;
  status: boolean;
};

let categories: Category[] = [
  { id: 1, name: "Sách văn học", status: true },
  { id: 2, name: "Sách kinh tế", status: true },
  { id: 3, name: "Sách thiếu nhi", status: false },
];

const dataProvider: DataProvider = {
  getList: async (_resource, _params): Promise<any> => {
    return {
      data: categories,
      total: categories.length,
    };
  },

  getOne: async (_resource, params): Promise<any> => {
    const foundCategory = categories.find(
      (item) => item.id === Number(params.id)
    );

    if (!foundCategory) {
      throw new Error("Không tìm thấy danh mục");
    }

    return {
      data: foundCategory,
    };
  },

  create: async (_resource, params): Promise<any> => {
    const newCategory: Category = {
      id: categories.length + 1,
      ...(params.data as Omit<Category, "id">),
    };

    categories = [...categories, newCategory];

    return {
      data: newCategory,
    };
  },

  update: async (_resource, params): Promise<any> => {
    const updatedCategory: Category = {
      id: Number(params.id),
      ...(params.data as Omit<Category, "id">),
    };

    categories = categories.map((item) =>
      item.id === Number(params.id)
        ? { ...item, ...updatedCategory }
        : item
    );

    return {
      data: updatedCategory,
    };
  },

  delete: async (_resource, params): Promise<any> => {
    const deletedCategory = categories.find(
      (item) => item.id === Number(params.id)
    );

    if (!deletedCategory) {
      throw new Error("Không tìm thấy danh mục để xoá");
    }

    categories = categories.filter(
      (item) => item.id !== Number(params.id)
    );

    return {
      data: deletedCategory,
    };
  },

  getMany: async (_resource, params): Promise<any> => {
    const data = categories.filter((item) =>
      params.ids.includes(item.id)
    );

    return {
      data,
    };
  },

  getManyReference: async (_resource, _params): Promise<any> => {
    return {
      data: categories,
      total: categories.length,
    };
  },

  updateMany: async (_resource, params): Promise<any> => {
    return {
      data: params.ids,
    };
  },

  deleteMany: async (_resource, params): Promise<any> => {
    categories = categories.filter(
      (item) => !params.ids.includes(item.id)
    );

    return {
      data: params.ids,
    };
  },
};

export default dataProvider;