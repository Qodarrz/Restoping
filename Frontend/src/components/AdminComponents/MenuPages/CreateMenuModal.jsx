import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const CreateMenuModal = ({ onClose, onCreate, isCreating, initialData, isEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    ingredients: '',
    calories: '',
    serving_size: '',
    media: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Initialize form with initialData if in edit mode
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        category: initialData.category || '',
        ingredients: initialData.ingredients || '',
        calories: initialData.calories || '',
        serving_size: initialData.serving_size || '',
        media: initialData.media || null
      });
      
      if (initialData.imageUrl) {
        setPreviewImage(initialData.imageUrl);
      }
    }
  }, [isEdit, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, media: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Enhanced overlay with subtle animation */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out" 
        onClick={onClose}
      ></div>

      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
        <div 
          className={`bg-white rounded-xl shadow-xl transform transition-all duration-300 ease-out w-full max-w-2xl overflow-hidden 
            ${isCreating ? 'opacity-90' : 'opacity-100'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header with dynamic title */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 relative">
            <div className="flex items-center">
              {isEdit ? (
                <>
                  <PencilSquareIcon className="h-6 w-6 text-white mr-2" />
                  <h2 className="text-2xl font-bold text-white">Edit Menu Item</h2>
                </>
              ) : (
                <h2 className="text-2xl font-bold text-white">Create New Menu Item</h2>
              )}
            </div>
            <p className="text-emerald-100 mt-1">
              {isEdit ? 'Update the details below' : 'Fill in the details below to add a new menu item'}
            </p>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
              disabled={isCreating}
              aria-label="Close modal"
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      placeholder="e.g. Nasi Padang Special"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      rows="3"
                      placeholder="Describe your menu item..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients*</label>
                    <textarea
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      rows="2"
                      placeholder="List main ingredients, separated by commas"
                      required
                    />
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (IDR)*</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                          min="0"
                          placeholder="25000"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="food">Food</option>
                        <option value="drink">Drink</option>
                        <option value="dessert">Dessert</option>
                        <option value="snack">Snack</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Calories*</label>
                      <input
                        type="number"
                        name="calories"
                        value={formData.calories}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        min="0"
                        placeholder="650"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Serving Size*</label>
                      <input
                        type="text"
                        name="serving_size"
                        value={formData.serving_size}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        placeholder="1 piring"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image{!isEdit && '*'}</label>
                    <div className="mt-1 flex items-center">
                      <label className="cursor-pointer">
                        <div className="group relative">
                          {previewImage ? (
                            <div className="relative">
                              <img 
                                src={previewImage} 
                                alt="Preview" 
                                className="h-29 w-74 object-cover rounded-lg border border-gray-300"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                <span className="text-white font-medium">Change Image</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-29 w-74 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                              <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="mt-2 text-sm text-gray-600">Click to upload</span>
                            </div>
                          )}
                          <input
                            type="file"
                            name="media"
                            onChange={handleFileChange}
                            className="sr-only"
                            accept="image/*"
                            required={!isEdit && !previewImage}
                          />
                        </div>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">JPEG, PNG (Max 2MB)</p>
                    {isEdit && (
                      <p className="mt-1 text-xs text-gray-500">Leave empty to keep current image</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-70"
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center min-w-32 disabled:opacity-70"
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isEdit ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    isEdit ? 'Update Menu' : 'Create Menu'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateMenuModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  initialData: PropTypes.object,
  isEdit: PropTypes.bool,
};

CreateMenuModal.defaultProps = {
  isCreating: false,
  isEdit: false,
  initialData: null,
};

export default CreateMenuModal;