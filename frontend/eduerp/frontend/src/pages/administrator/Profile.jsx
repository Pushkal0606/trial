import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';

export const AdministratorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Administrator User',
    email: 'administrator@eduerp.com',
    employeeId: 'ADM-ADMIN-001',
    department: 'Administration',
    phone: '+91-9876543210',
    avatar: 'AU',
  });
  const [tempProfile, setTempProfile] = useState(profile);

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">My Profile</h1>

        <div className="bg-black border border-[#222] p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-navy border-4 border-accent flex items-center justify-center font-syne text-4xl font-bold text-accent mb-4">
                {profile.avatar}
              </div>
              {!isEditing && (
                <button
                  onClick={() => {
                    setTempProfile({ ...profile });
                    setIsEditing(true);
                  }}
                  className="font-mono text-xs tracking-widest uppercase text-accent hover:text-white border border-accent hover:border-white transition-colors px-4 py-2 mt-2"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="space-y-4">
                {[
                  { label: 'Full Name', key: 'name' },
                  { label: 'Email Address', key: 'email' },
                  { label: 'Employee ID', key: 'employeeId' },
                  { label: 'Department', key: 'department' },
                  { label: 'Phone', key: 'phone' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block font-mono text-xs tracking-widest uppercase text-[#555] mb-1">
                      {field.label}
                    </label>
                    {isEditing ? (
                      <input
                        value={tempProfile[field.key]}
                        onChange={(e) =>
                          setTempProfile({
                            ...tempProfile,
                            [field.key]: e.target.value,
                          })
                        }
                        className="w-full bg-[#0a0a0a] border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
                      />
                    ) : (
                      <p className="text-white font-mono">{profile[field.key]}</p>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2 mt-6">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
