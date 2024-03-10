import React from "react";
import ReadMore from "../../components/readMore/ReadMore";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const CardContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    cursor: "pointer",
});

const CardContentStyled = styled(CardContent)({
    backgroundColor: "#dfe4e9",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    height: "100%",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9)",
    },
  });
  
  const LinkStyled = styled(Link)({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
      fontWeight: "bold",
    },
  });
  
  const ScholarshipCard = ({ data }) => {
    const cardLink = "https://www.uoa.gr/foitites/paroches_drastiriotites/ypotrofies_brabeia/";
  
    return (
      <CardContainer>
        <Card variant="outlined">
          <CardContentStyled>
            <Typography
              sx={{
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                fontFamily: "'Ubuntu', sans-serif",
              }}
            >
                <LinkStyled to={cardLink} target="_blank" rel="noopener noreferrer">
                    <span style={{ marginRight: "8px", fontWeight: "bold" }}>ΦΟΡΕΑΣ:</span>
                    <span>{data.institution}</span>
                </LinkStyled>
            </Typography>

            <Typography
            sx={{
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                fontFamily: "'Ubuntu', sans-serif",
            }}
            >
            <span style={{ marginRight: "8px", fontWeight: "bold" }}>ΠΟΣΟ:</span>
            <span>{data.amount}</span>
            </Typography>

            {data.criteria && (
            <Typography
                sx={{
                fontSize: 14,
                fontWeight: "bold",
                mt: 1,
                fontFamily: "'Ubuntu', sans-serif",
                }}
            >
                ΚΡΙΤΗΡΙΑ:
            </Typography>
            )}

            <Typography
            variant="body2"
            sx={{ fontFamily: "'Ubuntu', sans-serif" }}
            >
            {data.criteria}
            </Typography>

            <Typography
            sx={{
              mt: 1.5,
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "'Ubuntu', sans-serif",
            }}
          >
            ΣΧΟΛΙΑ:
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "'Ubuntu', sans-serif" }}>
            <ReadMore>{data.comments}</ReadMore>
          </Typography>
        </CardContentStyled>
      </Card>
    </CardContainer>
  );
};


export default ScholarshipCard;
