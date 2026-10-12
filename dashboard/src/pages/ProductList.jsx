import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuGroup,
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { deleteProduct, getAllProducts } from "@/services/productService";
import { toast } from "@/components/ui/toast"


export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Search filter logic
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  // Delete product handler (Dummy function)
  const handleDelete = async (id) => {
    
    try {
      await deleteProduct(id);
      toast.add({
        type: "success",
        description: "The product has been successfully deleted.",
      }); 
    } catch (error) {
      console.error("Failed to delete product:", error);
       toast.add({
        type: "error",
        description: "Failed to delete product. Please try again.",
      }); 
    } finally {
      setProducts(products.filter((p) => p._id !== id));
    }
    
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Add Product Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage your store inventory, prices, and stock statuses.
          </p>
        </div>
        <Link to="/dashboard/addproduct">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Data Table Container */}
      <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Product Name</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Discounted Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">
                    <div className="font-semibold">{product.title}</div>
                    <div className="text-xs text-muted-foreground">{product.sku}</div>
                  </TableCell>
                  <TableCell>${product.basePrice.toFixed(2)}</TableCell>
                  <TableCell>${product.discountPrice.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/editproduct/${product._id}`)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit 
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}