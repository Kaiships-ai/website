import { permanentRedirect } from "next/navigation";

// The two Studio plans live on the home page (#buy); /products only forwards there.
export default function ProductsPage() {
  permanentRedirect("/#buy");
}
