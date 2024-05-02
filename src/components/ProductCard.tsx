import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import type { Product } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 325, height: 250 }}
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image={product.boxArt}
          alt="Box art"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" fontSize={17} component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price.$numberDecimal}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
