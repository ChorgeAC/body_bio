import React, { useState, useEffect } from 'react';
import { Trash2, Save, Edit2, Plus, X, Check } from 'lucide-react';

interface BiomarkerRange {
  id: number;
  rangeMin: number;
  rangeMax: number;
  ageMin: number;
  ageMax: number;
  gender: 'M' | 'F' | 'M/F';
  isActive: boolean;
}

interface Biomarker {
  fieldName: string;
  fieldCode: string;
  fieldDescription: string;
  fieldUnit: string;
  isActive: boolean;
  ranges: BiomarkerRange[];
}

interface VariantFormData {
  id: number;
  ageMin: string;
  ageMax: string;
  gender: 'M' | 'F' | 'M/F';
  rangeMin: string;
  rangeMax: string;
  isActive: boolean;
  isNew?: boolean;
}

const UnifiedEditModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;

  onSave: (data: Partial<Biomarker>) => void;
  biomarker: Biomarker | null;
}> = ({ isOpen, onClose, onSave, biomarker }) => {
  const [formData, setFormData] = useState({
    fieldName: '',
    fieldDescription: '',
    fieldUnit: '',
    defaultAgeMin: '',
    defaultAgeMax: '',
    defaultGender: 'M/F' as 'M' | 'F' | 'M/F',
    defaultMin: '',
    defaultMax: '',
    isActive: true,
  });

  const [variants, setVariants] = useState<VariantFormData[]>([]);

  useEffect(() => {
    if (biomarker) {
      const defaultRange = biomarker.ranges.find((r) => r.ageMin === 0 && r.ageMax === 0);

      setFormData({
        fieldName: biomarker.fieldName,
        fieldDescription: biomarker.fieldDescription,
        fieldUnit: biomarker.fieldUnit,
        defaultAgeMin: defaultRange ? String(defaultRange.ageMin) : '0',
        defaultAgeMax: defaultRange ? String(defaultRange.ageMax) : '0',
        defaultGender: defaultRange ? defaultRange.gender : 'M/F',
        defaultMin: defaultRange ? String(defaultRange.rangeMin) : '',
        defaultMax: defaultRange ? String(defaultRange.rangeMax) : '',
        isActive: biomarker.isActive,
      });

      const existingVariants = biomarker.ranges
        .filter((r) => !(r.ageMin === 0 && r.ageMax === 0))
        .map((r) => ({
          id: r.id,
          ageMin: String(r.ageMin),
          ageMax: String(r.ageMax),
          gender: r.gender,
          rangeMin: String(r.rangeMin),
          rangeMax: String(r.rangeMax),
          isActive: r.isActive,
          isNew: false,
        }));

      setVariants(existingVariants);
    }
  }, [biomarker]);

  if (!isOpen || !biomarker) return null;

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now(),
        ageMin: '',
        ageMax: '',
        gender: 'M',
        rangeMin: '',
        rangeMax: '',
        isActive: true,
        isNew: true,
      },
    ]);
  };

  const handleRemoveVariant = (id: number) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const handleUpdateVariant = (id: number, field: keyof VariantFormData, value: any) => {
    setVariants(variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  };

  const handleSave = () => {
    if (
      !formData.fieldName ||
      !formData.fieldUnit ||
      !formData.defaultMin ||
      !formData.defaultMax ||
      !formData.defaultAgeMin ||
      !formData.defaultAgeMax
    ) {
      alert('Please fill all required fields');
      return;
    }

    const defaultRange = biomarker.ranges.find((r) => r.ageMin === 0 && r.ageMax === 0);

    const updatedDefaultRange = {
      id: defaultRange?.id || Date.now(),
      rangeMin: parseFloat(formData.defaultMin),
      rangeMax: parseFloat(formData.defaultMax),
      ageMin: parseInt(formData.defaultAgeMin),
      ageMax: parseInt(formData.defaultAgeMax),
      gender: formData.defaultGender,
      isActive: true,
    };

    const validVariants = variants
      .filter((v) => v.ageMin && v.ageMax && v.rangeMin && v.rangeMax)
      .map((v) => ({
        id: v.id,
        ageMin: parseInt(v.ageMin),
        ageMax: parseInt(v.ageMax),
        gender: v.gender,
        rangeMin: parseFloat(v.rangeMin),
        rangeMax: parseFloat(v.rangeMax),
        isActive: v.isActive,
      }));

    onSave({
      fieldName: formData.fieldName,
      fieldDescription: formData.fieldDescription,
      fieldUnit: formData.fieldUnit,
      isActive: formData.isActive,
      ranges: [updatedDefaultRange, ...validVariants],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
          <h2 className="text-2xl font-bold">Edit Biomarker - {biomarker.fieldName}</h2>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Basic Info Section */}
          <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biomarker Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fieldName}
                    onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                  <input
                    type="text"
                    value={formData.fieldUnit}
                    onChange={(e) => setFormData({ ...formData, fieldUnit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.fieldDescription}
                  onChange={(e) => setFormData({ ...formData, fieldDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Age From *
                  </label>
                  <input
                    type="number"
                    value={formData.defaultAgeMin}
                    onChange={(e) => setFormData({ ...formData, defaultAgeMin: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Age To *
                  </label>
                  <input
                    type="number"
                    value={formData.defaultAgeMax}
                    onChange={(e) => setFormData({ ...formData, defaultAgeMax: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Gender *
                  </label>
                  <select
                    value={formData.defaultGender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        defaultGender: e.target.value as 'M' | 'F' | 'M/F',
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="M/F">M/F</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Min Level *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.defaultMin}
                    onChange={(e) => setFormData({ ...formData, defaultMin: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Max Level *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.defaultMax}
                    onChange={(e) => setFormData({ ...formData, defaultMax: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <button
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.isActive ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-600">
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Variants Section */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Age/Gender Variants</h3>
              <button
                onClick={handleAddVariant}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Variant
              </button>
            </div>

            {variants.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No variants yet. Click "Add Variant" to create age/gender specific ranges.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {variants.map((variant, index) => (
                  <div key={variant.id} className="border rounded-lg p-4 bg-white border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-gray-700">Variant {index + 1}</h4>
                        {variant.isNew && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveVariant(variant.id)}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Remove variant"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Age From *
                        </label>
                        <input
                          type="number"
                          value={variant.ageMin}
                          onChange={(e) =>
                            handleUpdateVariant(variant.id, 'ageMin', e.target.value)
                          }
                          placeholder="18"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Age To *
                        </label>
                        <input
                          type="number"
                          value={variant.ageMax}
                          onChange={(e) =>
                            handleUpdateVariant(variant.id, 'ageMax', e.target.value)
                          }
                          placeholder="65"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Gender *
                        </label>
                        <select
                          value={variant.gender}
                          onChange={(e) =>
                            handleUpdateVariant(
                              variant.id,
                              'gender',
                              e.target.value as 'M' | 'F' | 'M/F'
                            )
                          }
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="M">M</option>
                          <option value="F">F</option>
                          <option value="M/F">M/F</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Min Level *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={variant.rangeMin}
                          onChange={(e) =>
                            handleUpdateVariant(variant.id, 'rangeMin', e.target.value)
                          }
                          placeholder="11.0"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Max Level *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={variant.rangeMax}
                          onChange={(e) =>
                            handleUpdateVariant(variant.id, 'rangeMax', e.target.value)
                          }
                          placeholder="15.0"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          value={variant.isActive ? 'active' : 'inactive'}
                          onChange={(e) =>
                            handleUpdateVariant(variant.id, 'isActive', e.target.value === 'active')
                          }
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BiomarkerVariantManager: React.FC = () => {
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([
    {
      fieldName: 'C16:0 - Palmitic',
      fieldCode: 'C16_0_PALMITIC',
      fieldDescription: 'Palmitic acid level',
      fieldUnit: 'UL',
      isActive: true,
      ranges: [
        { id: 1, rangeMin: 1, rangeMax: 9, ageMin: 0, ageMax: 0, gender: 'M/F', isActive: true },
      ],
    },
    {
      fieldName: 'C18:2 - Linoleic',
      fieldCode: 'C18_2_LINOLEIC',
      fieldDescription: 'Linoleic acid level',
      fieldUnit: '% of total',
      isActive: true,
      ranges: [
        {
          id: 2,
          rangeMin: 18.0,
          rangeMax: 28.0,
          ageMin: 0,
          ageMax: 0,
          gender: 'M/F',
          isActive: true,
        },
        {
          id: 3,
          rangeMin: 20.0,
          rangeMax: 30.0,
          ageMin: 18,
          ageMax: 45,
          gender: 'M',
          isActive: true,
        },
      ],
    },
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBiomarker, setSelectedBiomarker] = useState<string | null>(null);

  const handleEditBiomarker = (fieldCode: string) => {
    setSelectedBiomarker(fieldCode);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedData: Partial<Biomarker>) => {
    if (!selectedBiomarker) return;

    setBiomarkers(
      biomarkers.map((b) => {
        if (b.fieldCode === selectedBiomarker) {
          return { ...b, ...updatedData };
        }
        return b;
      })
    );
  };

  const handleDeleteBiomarker = (fieldCode: string) => {
    setBiomarkers(biomarkers.filter((b) => b.fieldCode !== fieldCode));
  };

  const handleSubmit = () => {
    const output = {
      testName: 'Fatty Acid Profile',
      testCode: 'FA_RBC_PROFILE',
      testDescription: 'Red Blood Cell Membrane Total Lipid Fatty Acid Profile',
      isActive: true,
      fields: biomarkers.map((biomarker) => ({
        fieldName: biomarker.fieldName,
        fieldCode: biomarker.fieldCode,
        fieldDescription: biomarker.fieldDescription,
        fieldUnit: biomarker.fieldUnit,
        isActive: biomarker.isActive,
        ranges: biomarker.ranges.map((range) => ({
          rangeMin: range.rangeMin,
          rangeMax: range.rangeMax,
          gender: range.gender,
          isActive: range.isActive,

          // include age only if both are > 0
          ...(range.ageMin > 0 &&
            range.ageMax > 0 && {
              ageMin: range.ageMin,
              ageMax: range.ageMax,
            }),
        })),
      })),
    };
    console.log(output);
  };

  const getMainRange = (ranges: BiomarkerRange[]) => {
    if (ranges.length === 0) return { min: 0, max: 0 };
    const defaultRange = ranges.find((r) => r.ageMin === 0 && r.ageMax === 0);
    if (defaultRange) return { min: defaultRange.rangeMin, max: defaultRange.rangeMax };
    return {
      min: Math.min(...ranges.map((r) => r.rangeMin)),
      max: Math.max(...ranges.map((r) => r.rangeMax)),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Red Blood Cell Membrane Total Lipid Fatty Acid
          </h1>
          <p className="text-gray-600">Manage biomarkers and their range variants</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Biomarker
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Unit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Age From
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Age To
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Min Level
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Max Level
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {biomarkers.map((biomarker) => {
                  const mainRange = getMainRange(biomarker.ranges);
                  const variantCount = biomarker.ranges.filter(
                    (r) => !(r.ageMin === 0 && r.ageMax === 0)
                  ).length;

                  return (
                    <React.Fragment key={biomarker.fieldCode}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <span className="font-medium text-gray-900">{biomarker.fieldName}</span>
                            {variantCount > 0 && (
                              <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                {variantCount} variant{variantCount > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            {biomarker.fieldUnit}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {biomarker.ranges[0]?.ageMin === 0 ? 'NA' : biomarker.ranges[0]?.ageMin}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {biomarker.ranges[0]?.ageMax === 0 ? 'NA' : biomarker.ranges[0]?.ageMax}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {biomarker.ranges[0]?.ageMin === 0 ? 'NA' : biomarker.ranges[0]?.gender}
                        </td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">{mainRange.min}</td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">{mainRange.max}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              biomarker.isActive
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {biomarker.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEditBiomarker(biomarker.fieldCode)}
                              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBiomarker(biomarker.fieldCode)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {biomarker.ranges
                        .filter((r) => !(r.ageMin === 0 && r.ageMax === 0))
                        .map((range, idx) => (
                          <tr key={range.id} className="bg-blue-50">
                            <td className="px-6 py-3">
                              <span className="text-sm text-gray-600 italic ml-4">
                                ↳ Variant {idx + 1}
                              </span>
                            </td>
                            <td className="px-6 py-3">
                              <span className="text-sm text-gray-600">-</span>
                            </td>
                            <td className="px-6 py-3 text-gray-700">{range.ageMin}</td>
                            <td className="px-6 py-3 text-gray-700">{range.ageMax}</td>
                            <td className="px-6 py-3">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                {range.gender}
                              </span>
                            </td>
                            <td className="px-6 py-3 text-gray-900">{range.rangeMin}</td>
                            <td className="px-6 py-3 text-gray-900">{range.rangeMax}</td>
                            <td className="px-6 py-3">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                  range.isActive
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {range.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-3">
                              <span className="text-xs text-gray-500 italic">Edit via parent</span>
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-lg font-semibold"
          >
            <Save className="w-5 h-5" />
            Submit
          </button>
        </div>

        <UnifiedEditModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedBiomarker(null);
          }}
          onSave={handleSaveEdit}
          biomarker={biomarkers.find((b) => b.fieldCode === selectedBiomarker) || null}
        />
      </div>
    </div>
  );
};

export default BiomarkerVariantManager;
