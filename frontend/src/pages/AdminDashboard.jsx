import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ShieldCheck, Users, Building2, Heart, Award, Clock,
  CheckCircle2, XCircle, RotateCcw, AlertCircle, FileText, ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AdminDashboard = () => {
  const { t, lang } = useLanguage();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('verifications'); // 'verifications', 'ngos', 'users'

  // Document preview modal
  const [previewUser, setPreviewUser] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const statsRes = await axios.get('/api/admin/stats');
      setStats(statsRes.data.stats);

      const usersRes = await axios.get('/api/admin/users');
      setUsers(usersRes.data.users || []);
    } catch (err) {
      console.error('Admin dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReviewVerification = async (userId, status) => {
    try {
      await axios.put(`/api/verifications/${userId}/review`, {
        status,
        rejectionReason: status === 'rejected' ? (rejectionReason || 'Uploaded ID document is illegible.') : null
      });
      setPreviewUser(null);
      setRejectionReason('');
      loadData();
    } catch (err) {
      console.error('Error reviewing verification:', err);
    }
  };

  const handleVerifyNgo = async (ngoId, verified) => {
    try {
      await axios.put(`/api/admin/ngo/${ngoId}/verify`, { verified });
      loadData();
    } catch (err) {
      console.error('Error verifying NGO:', err);
    }
  };

  const handleResetDemo = async () => {
    if (!window.confirm('Reset database to demo defaults?')) return;
    try {
      await axios.post('/api/admin/reset-demo');
      alert('Demo database reset successfully.');
      loadData();
    } catch (err) {
      console.error('Reset error:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-lavender-100 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-charcoal">
              {t('adminDashboard.statsTitle')}
            </h1>
            <p className="text-xs text-mutedgrey mt-0.5">
              Platform administration, NGO compliance & ID verification authority
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetDemo}
          className="px-5 py-2.5 rounded-full bg-lavender-50 hover:bg-lavender-100 text-lavender-800 text-xs font-bold border border-lavender-200 transition-all flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t('adminDashboard.resetDemoData')}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: t('adminDashboard.usersCount'), count: stats?.totalUsers || 0, color: 'text-lavender-600' },
          { label: t('adminDashboard.ngosCount'), count: stats?.totalNgos || 0, color: 'text-purple-600' },
          { label: t('adminDashboard.petsCount'), count: stats?.totalPets || 0, color: 'text-blue-600' },
          { label: t('adminDashboard.adoptionsCount'), count: stats?.totalAdoptions || 0, color: 'text-emerald-600' },
          { label: t('adminDashboard.pendingVerifications'), count: stats?.pendingVerifications || 0, color: 'text-amber-600' }
        ].map((m, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 border border-lavender-100 shadow-sm text-center">
            <span className={`text-3xl font-extrabold ${m.color} font-sans block`}>
              {m.count}
            </span>
            <span className="text-[11px] font-bold text-mutedgrey uppercase tracking-wider mt-1 block">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-lavender-200 pb-3">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'verifications' ? 'bg-lavender-500 text-white shadow-md' : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
          }`}
        >
          ID Verifications ({users.filter(u => u.verificationStatus === 'pending').length})
        </button>
        <button
          onClick={() => setActiveTab('ngos')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'ngos' ? 'bg-lavender-500 text-white shadow-md' : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
          }`}
        >
          {t('adminDashboard.ngoVerifications')}
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'users' ? 'bg-lavender-500 text-white shadow-md' : 'bg-lavender-50 text-charcoal hover:bg-lavender-100'
          }`}
        >
          {t('adminDashboard.userManagement')} ({users.length})
        </button>
      </div>

      {/* Tab 1: Adopter ID Verifications Queue */}
      {activeTab === 'verifications' && (
        <div className="bg-white rounded-3xl border border-lavender-100 shadow-sm overflow-hidden p-6 space-y-4">
          <h3 className="text-base font-extrabold text-charcoal flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Adopter Identity Review Queue
          </h3>

          <div className="divide-y divide-lavender-100">
            {users.filter(u => u.role === 'adopter' && u.verificationStatus === 'pending').map((u) => (
              <div key={u._id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-charcoal text-sm">{u.name}</h4>
                  <p className="text-xs text-mutedgrey">{u.email} • {u.phone} • {u.address}</p>
                  <p className="text-xs text-lavender-700 font-bold mt-1">
                    Document: {u.verificationDocuments?.govtIdType || 'Aadhaar'} ({u.verificationDocuments?.idNumber || 'On file'})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewUser(u)}
                    className="px-4 py-1.5 rounded-full bg-lavender-50 hover:bg-lavender-100 text-lavender-700 text-xs font-bold flex items-center gap-1 border border-lavender-200"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t('adminDashboard.reviewIdDoc')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReviewVerification(u._id, 'verified')}
                    className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm"
                  >
                    {t('adminDashboard.approveId')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReviewVerification(u._id, 'rejected')}
                    className="px-4 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold"
                  >
                    {t('adminDashboard.rejectId')}
                  </button>
                </div>
              </div>
            ))}

            {users.filter(u => u.role === 'adopter' && u.verificationStatus === 'pending').length === 0 && (
              <div className="py-12 text-center text-mutedgrey text-xs">
                All submitted adopter identity documents have been reviewed!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: NGO Shelters Management */}
      {activeTab === 'ngos' && (
        <div className="bg-white rounded-3xl border border-lavender-100 shadow-sm overflow-hidden p-6 space-y-4">
          <div className="divide-y divide-lavender-100">
            {users.filter(u => u.role === 'ngo').map((n) => (
              <div key={n._id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-charcoal text-sm">
                      {n.ngoDetails?.organizationName || n.name}
                    </h4>
                    {n.ngoDetails?.verified ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        Verified Partner
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                        Pending Verification
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-mutedgrey mt-0.5">
                    Registration: {n.ngoDetails?.registrationNumber || 'Pending'} • Email: {n.email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {n.ngoDetails?.verified ? (
                    <button
                      type="button"
                      onClick={() => handleVerifyNgo(n._id, false)}
                      className="px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-bold"
                    >
                      {t('adminDashboard.unverifyNgoBtn')}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleVerifyNgo(n._id, true)}
                      className="px-5 py-1.5 rounded-full bg-lavender-500 hover:bg-lavender-600 text-white text-xs font-bold shadow-sm"
                    >
                      {t('adminDashboard.verifyNgoBtn')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: All Users Table */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-lavender-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-lavender-50 text-charcoal font-bold border-b border-lavender-200">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Verification Status</th>
                <th className="p-4">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lavender-100">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-lavender-50/40">
                  <td className="p-4 font-bold text-charcoal">{u.name}</td>
                  <td className="p-4 uppercase font-bold text-lavender-700 text-[11px]">{u.role}</td>
                  <td className="p-4 capitalize">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      u.verificationStatus === 'verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-charcoal'
                    }`}>
                      {u.verificationStatus || 'unverified'}
                    </span>
                  </td>
                  <td className="p-4 text-mutedgrey">{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Document Review Modal */}
      {previewUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-lavender-100 animate-in fade-in">
            <h3 className="text-base font-extrabold text-charcoal">
              Identity Proof for {previewUser.name}
            </h3>
            
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-lavender-200">
              <img
                src={previewUser.verificationDocuments?.govtIdUrl || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'}
                alt="Document preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-xs space-y-1">
              <p><span className="font-bold">Doc Type:</span> {previewUser.verificationDocuments?.govtIdType}</p>
              <p><span className="font-bold">ID Number:</span> {previewUser.verificationDocuments?.idNumber}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Rejection Reason (if rejecting)
              </label>
              <input
                type="text"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Document image is blurry or expired"
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setPreviewUser(null)}
                className="px-4 py-2 text-xs font-bold text-mutedgrey"
              >
                Close
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleReviewVerification(previewUser._id, 'rejected')}
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => handleReviewVerification(previewUser._id, 'verified')}
                  className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm"
                >
                  Approve ID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
