// src/components/ResetPassword.tsx
import React, { useState } from 'react';
import { resetPassword } from '../../api/auth';

const ResetPassword: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await resetPassword(userId, { newPassword });
            setSuccess('Password reset successfully.');
        } catch (err) {
            setError('Error resetting password');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <div>
                    <label>User ID</label>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                </div>
                <div>
                    <label>New Password</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;