import React, { useEffect, useState } from 'react';
import { useContextHook } from '../../Context/context';
import { axiosClient } from '../../axios/axiosutils';
import { FolderPlus, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

const AdminManage = () => {
  const { token } = useContextHook();
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryLogo, setCategoryLogo] = useState<File | null>(null);
  const [bgFiles, setBgFiles] = useState<FileList | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [token]);

  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get('/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const formData = new FormData();
    formData.append('name', newCategoryName);
    if (categoryLogo) {
      formData.append('logo', categoryLogo);
    }

    try {
      await axiosClient.post('/categories', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setNewCategoryName('');
      setCategoryLogo(null);
      alert("Category added successfully!");
      fetchCategories();
    } catch (error: any) {
      console.error("Full error response:", error.response);
      const errors = error.response?.data?.errors;
      if (errors) {
        const errorText = Object.values(errors).flat().join('\n');
        alert(errorText);
      } else {
        alert(error.response?.data?.message || "Failed to add category.");
      }
    }
  };

  // 👈 Category ဖျက်ရန် Function အသစ်
  const handleDeleteCategory = async (id: number | string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axiosClient.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Category deleted successfully!");
      fetchCategories();
    } catch (error: any) {
      console.error("Failed to delete category", error);
      alert(error.response?.data?.message || "Failed to delete category.");
    }
  };

  const handleUploadBackgrounds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bgFiles || bgFiles.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < bgFiles.length; i++) {
      formData.append('background_photos[]', bgFiles[i]);
    }

    try {
      await axiosClient.post('/admin/website-backgrounds', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Background photos uploaded successfully!");
      setBgFiles(null);
    } catch (error) {
      console.error(error);
      alert("Failed to upload background photos.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Categories & Website Assets</h1>
        <p className="text-gray-500 mt-1">Add job categories and manage website multi-background slides.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Add Category Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <FolderPlus size={20} className="text-blue-600" /> Add New Job Category
          </h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category Name</label>
              <input 
                type="text" 
                value={newCategoryName} 
                onChange={(e) => setNewCategoryName(e.target.value)} 
                placeholder="e.g. Design, Finance, Engineering" 
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category Logo / Icon</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setCategoryLogo(e.target.files ? e.target.files[0] : null)} 
                className="w-full p-2.5 border rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer text-sm text-gray-500"
              />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 flex items-center gap-2 transition cursor-pointer">
              <Plus size={16} /> Add Category
            </button>
          </form>

          <div className="mt-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Existing Categories</h3>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {categories.map((cat: any) => (
                <div key={cat.id} className="bg-gray-50 text-gray-700 text-xs font-medium px-3.5 py-2 rounded-xl border border-gray-200 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {cat.icon && <img src={cat.icon} alt="" className="w-4 h-4 object-contain rounded-full" />}
                    <span>{cat.name}</span>
                  </div>
                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-gray-400 hover:text-red-600 transition cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Website Multi Background Photos Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <ImageIcon size={20} className="text-blue-600" /> Website Background Photos (Multi)
          </h2>
          <form onSubmit={handleUploadBackgrounds} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Select Multiple Background Images</label>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={(e) => setBgFiles(e.target.files)} 
                className="w-full p-2.5 border rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer text-sm text-gray-500"
                required 
              />
            </div>
            <p className="text-xs text-gray-400">You can select multiple photos at once to update the website's background slider or hero section.</p>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 flex items-center gap-2 transition cursor-pointer">
              <ImageIcon size={16} /> Upload Backgrounds
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminManage;