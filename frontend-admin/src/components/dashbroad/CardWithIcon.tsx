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
    <Card
        sx={{
            height: "100%",
            borderRadius: 3,
            boxShadow: 1,
            transition: "0.2s",
            "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: 5,
            },
        }}
    >
        <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
            <Box
                sx={{
                    p: 2.5,
                    minHeight: 88,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box color="primary.main">
                    {createElement(icon, { fontSize: "large" })}
                </Box>

                <Box textAlign="right">
                    <Typography color="text.secondary" fontSize={14}>
                        {title}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                        {subtitle}
                    </Typography>
                </Box>
            </Box>
        </Link>
    </Card>
);

export default CardWithIcon;