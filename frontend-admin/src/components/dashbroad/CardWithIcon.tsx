import { FC, ReactNode, createElement } from "react";
import { Card, Box, Typography } from "@mui/material";
import { Link, To } from "react-router-dom";

interface Props {
    icon: FC<any>;
    to: To;
    title: string;
    subtitle: ReactNode;
}
const CardWithIcon = ({ icon, title, subtitle, to }: Props) => (
    <Card>
        <Link
            to={to}
            style={{
                textDecoration: "none",
                color: "inherit",
            }}
        >
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box color="primary.main">
                    {createElement(icon, { fontSize: "large" })}
                </Box>
                <Box textAlign="right">
                    <Typography color="text.secondary">
                        {title}
                    </Typography>
                    <Typography variant="h5">
                        {subtitle}
                    </Typography>
                </Box>
            </Box>
        </Link>
    </Card>
);
export default CardWithIcon;