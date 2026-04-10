"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categoryService } from "@/lib/services/category.service";
import type { Category } from "@/types/api";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCategories();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) {
      toast.error("Category name is required");
      return;
    }
    setSavingId("new");
    try {
      await categoryService.createCategory({
        name: newName.trim(),
        description: newDescription.trim() || undefined,
      });
      setNewName("");
      setNewDescription("");
      toast.success("Category created");
      await loadCategories();
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Failed to create category");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setSavingId(id);
    try {
      await categoryService.deleteCategory(id);
      toast.success("Category deleted");
      await loadCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Category Management</h1>
        <p className="text-muted-foreground">
          Create, update, and remove tutoring categories.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,3fr]">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Add Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground ml-1">Name</label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Mathematics"
                className="rounded-xl border-border bg-muted/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground ml-1">Description</label>
              <Input
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Short description"
                className="rounded-xl border-border bg-muted/50"
              />
            </div>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 font-bold text-white shadow-lg shadow-primary/20 h-11 rounded-xl"
              onClick={handleCreate}
              disabled={savingId === "new"}
            >
              {savingId === "new" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : categories.length === 0 ? (
              <p className="text-center text-muted-foreground py-12 font-medium">
                No categories created yet.
              </p>
            ) : (
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <p className="font-bold text-foreground">{category.name}</p>
                      {category.description && (
                        <p className="text-xs text-muted-foreground font-medium">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 border-border font-bold rounded-lg"
                      disabled={savingId === category.id}
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
