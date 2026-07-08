import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useGetList } from "react-admin";

const NewCustomers = () => {
    const { data = [] } = useGetList("users", {
        pagination: { page: 1, perPage: 3 },
        sort: { field: "createdAt", order: "DESC" },
        filter: {},
    });
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" mb={1}>
                    Người dùng mới
                </Typography>
                <List dense>
                    {data.map((user: any) => (
                        <ListItem key={user.id}>
                            <ListItemText
                                primary={user.username || user.name}
                                secondary={user.email}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default NewCustomers;