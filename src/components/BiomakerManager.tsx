import React, { useState } from 'react';
import { Plus, Trash2, Save, Edit2, X, Check } from 'lucide-react';

interface Range {
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
  ranges: Range[];
}

const EditBiomarkerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Biomarker>) => void;
  biomarker: Biomarker | null;
}> = ({ isOpen, onClose, onSave, biomarker }) => {
  const [formData, setFormData] = useState({
    fieldName: biomarker?.fieldName || '',
    fieldDescription: biomarker?.fieldDescription || '',
    fieldUnit: biomarker?.fieldUnit || '',
    defaultMin: '',
    defaultMax: '',
    isActive: biomarker?.isActive ?? true
  });

  React.useEffect(() => {
    if (biomarker) {
      const defaultRange = biomarker.ranges.find(r => r.ageMin === 0 && r.ageMax === 0);
      setFormData({
        fieldName: biomarker.fieldName,
        fieldDescription: biomarker.fieldDescription,
        fieldUnit: biomarker.fieldUnit,
        defaultMin: defaultRange ? String(defaultRange.rangeMin) : '',
        defaultMax: defaultRange ? String(defaultRange.rangeMax) : '',
        isActive: biomarker.isActive
      });
    }
  }, [biomarker]);

  if (!isOpen || !biomarker) return null;

  const handleSave = () => {
    if (formData.fieldName && formData.fieldUnit && formData.defaultMin && formData.defaultMax) {
      onSave({
        fieldName: formData.fieldName,
        fieldDescription: formData.fieldDescription,
        fieldUnit: formData.fieldUnit,
        isActive: formData.isActive,
        ranges: biomarker.ranges.map(r => 
          (r.ageMin === 0 && r.ageMax === 0) 
            ? { ...r, rangeMin: parseFloat(formData.defaultMin), rangeMax: parseFloat(formData.defaultMax) }
            : r
        )
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
          <h2 className="text-2xl font-bold">Edit Biomarker</h2>
        </div>

        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Biomarker Name *</label>
              <input
                type="text"
                value={formData.fieldName}
                onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
              <input
                type="text"
                value={formData.fieldUnit}
                onChange={(e) => setFormData({ ...formData, fieldUnit: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Min Level *</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.defaultMin}
                  onChange={(e) => setFormData({ ...formData, defaultMin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Max Level *</label>
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

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VariantModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (variant: Omit<Range, 'id'>) => void;
  biomarkerName: string;
}> = ({ isOpen, onClose, onSave, biomarkerName }) => {
  const [formData, setFormData] = useState({
    ageMin: '',
    ageMax: '',
    gender: 'M' as 'M' | 'F' | 'M/F',
    rangeMin: '',
    rangeMax: '',
    isActive: true
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (formData.ageMin && formData.ageMax && formData.rangeMin && formData.rangeMax) {
      onSave({
        ageMin: parseInt(formData.ageMin),
        ageMax: parseInt(formData.ageMax),
        gender: formData.gender,
        rangeMin: parseFloat(formData.rangeMin),
        rangeMax: parseFloat(formData.rangeMax),
        isActive: formData.isActive
      });
      setFormData({ ageMin: '', ageMax: '', gender: 'M', rangeMin: '', rangeMax: '', isActive: true });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
          <h2 className="text-2xl font-bold">Add Variant - {biomarkerName}</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age From *</label>
              <input
                type="number"
                value={formData.ageMin}
                onChange={(e) => setFormData({ ...formData, ageMin: e.target.value })}
                placeholder="18"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age To *</label>
              <input
                type="number"
                value={formData.ageMax}
                onChange={(e) => setFormData({ ...formData, ageMax: e.target.value })}
                placeholder="65"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Level *</label>
              <input
                type="number"
                step="0.1"
                value={formData.rangeMin}
                onChange={(e) => setFormData({ ...formData, rangeMin: e.target.value })}
                placeholder="11.0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Level *</label>
              <input
                type="number"
                step="0.1"
                value={formData.rangeMax}
                onChange={(e) => setFormData({ ...formData, rangeMax: e.target.value })}
                placeholder="15.0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'M' | 'F' | 'M/F' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="M">M</option>
                <option value="F">F</option>
                <option value="M/F">M/F</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.isActive ? 'active' : 'inactive'}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Variant
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
      fieldName: "C16:0 - Palmitic",
      fieldCode: "C16_0_PALMITIC",
      fieldDescription: "Palmitic acid level",
      fieldUnit: "UL",
      isActive: true,
      ranges: [
        { id: 1, rangeMin: 2, rangeMax: 55, ageMin: 0, ageMax: 0, gender: "M/F", isActive: true }
      ]
    },
    {
      fieldName: "C18:2 - Linoleic",
      fieldCode: "C18_2_LINOLEIC",
      fieldDescription: "Linoleic acid level",
      fieldUnit: "% of total",
      isActive: true,
      ranges: [
        { id: 2, rangeMin: 18.0, rangeMax: 28.0, ageMin: 0, ageMax: 0, gender: "M/F", isActive: true },
      ]
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBiomarker, setSelectedBiomarker] = useState<string | null>(null);

  const handleAddVariant = (fieldCode: string) => {
    setSelectedBiomarker(fieldCode);
    setModalOpen(true);
  };

  const handleEditBiomarker = (fieldCode: string) => {
    setSelectedBiomarker(fieldCode);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedData: Partial<Biomarker>) => {
    if (!selectedBiomarker) return;

    setBiomarkers(biomarkers.map(b => {
      if (b.fieldCode === selectedBiomarker) {
        return { ...b, ...updatedData };
      }
      return b;
    }));
  };

  const handleSaveVariant = (variant: Omit<Range, 'id'>) => {
    if (!selectedBiomarker) return;

    setBiomarkers(biomarkers.map(b => {
      if (b.fieldCode === selectedBiomarker) {
        return {
          ...b,
          ranges: [...b.ranges, { ...variant, id: Date.now() }]
        };
      }
      return b;
    }));
  };

  const handleDeleteVariant = (biomarkerCode: string, rangeId: number) => {
    setBiomarkers(biomarkers.map(b => {
      if (b.fieldCode === biomarkerCode) {
        return {
          ...b,
          ranges: b.ranges.filter(r => r.id !== rangeId)
        };
      }
      return b;
    }));
  };

  const handleDeleteBiomarker = (fieldCode: string) => {
    setBiomarkers(biomarkers.filter(b => b.fieldCode !== fieldCode));
  };

  const handleToggleVariantStatus = (biomarkerCode: string, rangeId: number) => {
    setBiomarkers(biomarkers.map(b => {
      if (b.fieldCode === biomarkerCode) {
        return {
          ...b,
          ranges: b.ranges.map(r => 
            r.id === rangeId ? { ...r, isActive: !r.isActive } : r
          )
        };
      }
      return b;
    }));
  };

  const handleSubmit = () => {
    const output = {
      testName: "Fatty Acid Profile",
      testCode: "FA_RBC_PROFILE",
      testDescription: "Red Blood Cell Membrane Total Lipid Fatty Acid Profile",
      isActive: true,
      fields: biomarkers.map(biomarker => ({
        fieldName: biomarker.fieldName,
        fieldCode: biomarker.fieldCode,
        fieldDescription: biomarker.fieldDescription,
        fieldUnit: biomarker.fieldUnit,
        isActive: biomarker.isActive,
        ranges: biomarker.ranges.map(range => ({
          rangeMin: range.rangeMin,
          rangeMax: range.rangeMax,
          ageMin: range.ageMin,
          ageMax: range.ageMax,
          gender: range.gender,
          isActive: range.isActive
        }))
      }))
    };

    console.log(JSON.stringify(output, null, 2));
  };

  const getMainRange = (ranges: Range[]) => {
    if (ranges.length === 0) return { min: 0, max: 0 };
    const defaultRange = ranges.find(r => r.ageMin === 0 && r.ageMax === 0);
    if (defaultRange) return { min: defaultRange.rangeMin, max: defaultRange.rangeMax };
    return { min: Math.min(...ranges.map(r => r.rangeMin)), max: Math.max(...ranges.map(r => r.rangeMax)) };
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Biomarker</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Unit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Age From</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Age To</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gender</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Min Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Max Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {biomarkers.map((biomarker) => {
                  const mainRange = getMainRange(biomarker.ranges);

                  return (
                    <React.Fragment key={biomarker.fieldCode}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900">{biomarker.fieldName}</span>
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
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                            biomarker.isActive ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {biomarker.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEditBiomarker(biomarker.fieldCode)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit biomarker"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAddVariant(biomarker.fieldCode)}
                              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                            >
                              <Plus className="w-4 h-4" />
                              Add Variant
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

                      {biomarker.ranges.filter(r => !(r.ageMin === 0 && r.ageMax === 0)).map((range, idx) => (
                        <tr key={range.id} className="bg-blue-50">
                          <td className="px-6 py-3">
                            <span className="text-sm text-gray-600 italic ml-4">↳ Variant {idx + 1}</span>
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
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              range.isActive ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {range.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleToggleVariantStatus(biomarker.fieldCode, range.id)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  range.isActive 
                                    ? 'text-blue-600 hover:bg-blue-100' 
                                    : 'text-gray-400 hover:bg-gray-100'
                                }`}
                                title={range.isActive ? 'Deactivate variant' : 'Activate variant'}
                              >
                                {range.isActive ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => handleDeleteVariant(biomarker.fieldCode, range.id)}
                                className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete variant"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
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

        <EditBiomarkerModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedBiomarker(null);
          }}
          onSave={handleSaveEdit}
          biomarker={biomarkers.find(b => b.fieldCode === selectedBiomarker) || null}
        />

        <VariantModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedBiomarker(null);
          }}
          onSave={handleSaveVariant}
          biomarkerName={biomarkers.find(b => b.fieldCode === selectedBiomarker)?.fieldName || ''}
        />
      </div>
    </div>
  );
};

export default BiomarkerVariantManager;