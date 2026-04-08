import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';

export const Settings = () => {
  const [settings, setSettings] = useState({
    erpName: 'neoerp',
    academicYear: '2024-2025',
    currentSemester: 'Spring 2025',
    institutionName: 'KL University',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleSave = () => {
    setSettings({ ...tempSettings });
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">System Settings</h1>

        <div className="bg-black border border-[#222] p-8">
          <div className="space-y-6">
            {[
              { label: 'ERP Name', key: 'erpName' },
              { label: 'Academic Year', key: 'academicYear' },
              { label: 'Current Semester', key: 'currentSemester' },
              { label: 'Institution Name', key: 'institutionName' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block font-mono text-xs tracking-widest uppercase text-[#555] mb-2">
                  {field.label}
                </label>
                {isEditing ? (
                  <input
                    value={tempSettings[field.key]}
                    onChange={(e) =>
                      setTempSettings({
                        ...tempSettings,
                        [field.key]: e.target.value,
                      })
                    }
                    className="w-full bg-[#0a0a0a] border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-white font-mono">{settings[field.key]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-8">
            {!isEditing && (
              <button
                onClick={() => {
                  setTempSettings({ ...settings });
                  setIsEditing(true);
                }}
                className="bg-black border border-white text-white font-mono text-sm px-6 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all"
              >
                Edit Settings
              </button>
            )}

            {isEditing && (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-accent text-black hover:bg-white transition-colors font-mono text-sm px-4 py-2 font-bold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-black border border-[#222] text-white hover:border-accent transition-colors font-mono text-sm px-4 py-2"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
