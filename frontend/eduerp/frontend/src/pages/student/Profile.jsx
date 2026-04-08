import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import { useAuth } from '../../context/AuthContext';
import { client } from '../../api/client';

export const StudentProfile = () => {
  const { user } = useAuth();
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    enrollmentId: user?.enrollmentId || 'Pending',
    department: user?.department || 'Unassigned',
    classId: user?.classId?.toString() || 'Pending',
    avatar: user?.avatar || getInitials(user?.name),
  });
  const [tempProfile, setTempProfile] = useState(profile);

  useEffect(() => {
    if (user) {
      const newProfile = {
        name: user.name || '',
        email: user.email || '',
        enrollmentId: user.enrollmentId || 'Pending',
        department: user.department || 'Unassigned',
        classId: user.classId?.toString() || 'Pending',
        avatar: user.avatar || getInitials(user.name),
      };
      setProfile(newProfile);
      setTempProfile(newProfile);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      if (user?.id) {
        await client.put(`/users/${user.id}`, {
          ...user,
          name: tempProfile.name,
          email: tempProfile.email,
          enrollmentId: tempProfile.enrollmentId,
          department: tempProfile.department,
          classId: tempProfile.classId === 'Pending' ? null : parseInt(tempProfile.classId, 10),
          avatar: tempProfile.avatar
        });
      }
      setProfile({ ...tempProfile });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to save profile changes.');
    }
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
                  { label: 'Enrollment ID', key: 'enrollmentId' },
                  { label: 'Department', key: 'department' },
                  { label: 'Class', key: 'classId' },
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
