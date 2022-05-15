import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface Props { to: string };

function BackButton({ to }: Props) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <ArrowBack />
    </Link>
  )
}

export default BackButton;
